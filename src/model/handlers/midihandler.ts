import {InfoService} from "../../services/infoservice";
import {Note} from "../note";
import {NoteType} from "../enums/notetype";
import {Instrument} from "../enums/instrument";
import {InputProcessor} from "./inputprocessor";
import {TuneService} from "../../services/tuneservice";

export class MidiHandler {
  inputProcessor: InputProcessor;

  constructor(public infoService: InfoService, public tuneService: TuneService) {
    this.inputProcessor = new InputProcessor(infoService, tuneService);
    let _this = this;
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
        .then(function (access) {
          access.onstatechange = function (e) {
            infoService.connectedTrigger.next(Boolean(e.port.state == "connected"));
          };
        });
      navigator.requestMIDIAccess().then(function (midiAccess: any) {
        // console.log(midiAccess);
        for (let input of midiAccess.inputs.values()) {
          // console.log(input);
          infoService.connectedTrigger.next(Boolean(true));
          input.onmidimessage = function (message: any) {
            if (!tuneService.tuneLoadedTrigger.value) {
              return;
            }
            let command: number = message.data[0];
            let noteValue: number = message.data[1];
            let velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
            if (noteValue == undefined) {
              return;
            }
            // console.log('command:' + command + ';noteValue:' + noteValue + ';velocity:' + velocity);

            let note: Note = new Note(noteValue);
            note.isTune = false;
            let instrument: Instrument = _this.infoService.settings.instrument;

            switch (command) {

              // RIGHT HAND
              case 144:
              case 147: {
                let isOn: boolean = velocity > 0;
                if (instrument == Instrument.PIANO) {
                  note.noteType = NoteType.PIANO_NOTE;
                  _this.inputProcessor.handleKeyPress(isOn, note, _this.infoService.pianoNoteOn, _this.infoService.pianoNoteOff, _this.inputProcessor.playingPianoNotes);
                  _this.inputProcessor.playPianoNote(note);

                } else {
                  note.noteType = NoteType.RIGHT_HAND_NOTE;
                  _this.inputProcessor.handleKeyPress(isOn, note, _this.infoService.rightNoteOn, _this.infoService.rightNoteOff, _this.inputProcessor.playingRightHandNotes);
                }
                break;
              }

              case 128:
              case 131: {
                let isOn: boolean = false;
                if (instrument == Instrument.PIANO) {
                  note.noteType = NoteType.PIANO_NOTE;
                  _this.inputProcessor.handleKeyPress(isOn, note, _this.infoService.pianoNoteOn, _this.infoService.pianoNoteOff, _this.inputProcessor.playingPianoNotes);
                  _this.inputProcessor.stopPianoNote(note);
                } else {
                  note.noteType = NoteType.RIGHT_HAND_NOTE;
                  _this.inputProcessor.handleKeyPress(isOn, note, _this.infoService.rightNoteOn, _this.infoService.rightNoteOff, _this.inputProcessor.playingRightHandNotes);
                }
                break;
              }

              // LEFT HAND BASS
              case 145:
              case 148: {
                note.noteType = NoteType.LEFT_HAND_BASS;
                let isOn: boolean = velocity > 0;
                _this.inputProcessor.handleKeyPress(isOn, note, _this.infoService.leftNoteOn, _this.infoService.leftNoteOff, _this.inputProcessor.playingLeftHandNotes);
                break;
              }

              case 129:
              case 132: {
                note.noteType = NoteType.LEFT_HAND_BASS;
                _this.inputProcessor.handleKeyPress(false, note, _this.infoService.leftNoteOn, _this.infoService.leftNoteOff, _this.inputProcessor.playingLeftHandNotes);
                break;
              }

              // LEFT HAND CHORD
              case 146:
              case 149: {
                note.noteType = NoteType.LEFT_HAND_CHORD;
                let isOn: boolean = velocity > 0;
                _this.inputProcessor.handleChordKeyPress(isOn, note, _this.inputProcessor.playingChordNotes);
                break;
              }

              case 130:
              case 133: {
                note.noteType = NoteType.LEFT_HAND_CHORD;
                _this.inputProcessor.handleChordKeyPress(false, note, _this.inputProcessor.playingChordNotes);
                break;
              }
            }
          };
        }
      }, function () {
        console.log('Error: Could not access MIDI devices.');
      });
    } else {
      console.log('navigator.requestMIDIAccess undefined');
    }
  }


}
