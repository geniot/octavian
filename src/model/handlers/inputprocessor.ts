import {Note} from "../note";
import {CHORDS_MAP, getNextPointer, NOTE_NAMES_MAP} from "../constants";
import {BehaviorSubject} from "rxjs";
import {InfoService} from "../../services/infoservice";
import {NoteType} from "../enums/notetype";
import {Instrument} from "../enums/instrument";
import {Point} from "../point";
import {PlayingChord} from "../playingchord";
import {PlayingNote} from "../playingnote";
import {PlayerMode} from "../enums/playermode";
import {TuneService} from "../../services/tuneservice";

export class InputProcessor {


  //accordion
  playingRightHandNotes: Map<number, PlayingNote> = new Map();
  playingLeftHandNotes: Map<number, PlayingNote> = new Map();

  playingChordNotes: Set<number> = new Set();
  playingLeftHandChord!: PlayingChord | null;//only one at the same time?

  //piano
  playingPianoNotes: Map<number, PlayingNote> = new Map();


  playingPianoSounds: Map<string, any> = new Map();

  constructor(public infoService: InfoService,
              public tuneService: TuneService) {
  }

  handleChordKeyPress(
    isOn: boolean,
    note: Note,
    set: Set<number>
  ): void {
    if (isOn) {
      set.add(note.noteValue);

      if (set.size >= 3) {
        let chordName: string = this.getChordNameFromPlayingNotes();
        if (chordName != null) {
          this.playingLeftHandChord = new PlayingChord(Date.now());
          this.playingLeftHandChord.chordName = chordName;

          note.chordName = chordName;
          this.infoService.leftChordOn.next(note);

          if (this.infoService.settings.mode == PlayerMode.WAIT) {
            this.checkNext(note);
          }
        }
      }
    } else {
      set.delete(note.noteValue);
      if (set.size == 0) {
        let playingChord: PlayingChord = this.playingLeftHandChord!;

        if (playingChord != null) {
          note.chordName = playingChord.chordName!;
          if (playingChord.note != null) {
            playingChord.releasedAt = Date.now();
            playingChord.note.pressedAt = playingChord.pressedAt;
            playingChord.note.releasedAt = playingChord.releasedAt;
            playingChord.reset();
          }
        }
        this.playingLeftHandChord = null;
        this.infoService.leftChordOff.next(note);
      }
    }
  }

  handleKeyPress(
    isOn: boolean,
    note: Note,
    onSubject: BehaviorSubject<Note>,
    offSubject: BehaviorSubject<Note>,
    notesSet: Map<number, PlayingNote>
  ): void {
    if (isOn) {
      notesSet.set(note.noteValue, new PlayingNote(Date.now()));
      onSubject.next(note);

      if (this.infoService.settings.mode == PlayerMode.WAIT) {
        this.checkNext(note);
      }

    } else {
      let playingNote: PlayingNote = notesSet.get(note.noteValue)!;
      if (playingNote != null) {
        playingNote.releasedAt = Date.now();
        if (playingNote.note != null) {
          playingNote.note.pressedAt = playingNote.pressedAt;
          playingNote.note.releasedAt = playingNote.releasedAt;
          playingNote.note = null;
        }
      }
      notesSet.delete(note.noteValue);
      offSubject.next(note);
    }
  }

  /**
   * Trying to find waitPointer (expected) notes in the currently pressed notes. Return if not found.
   * Proceed with waitPointer update and playLoop if all notes are being played (pressed).
   */
  checkNext(pressedNote: Note): void {
    let instrument: Instrument = this.infoService.settings.instrument;
    let points: Point[] = this.tuneService.tuneModel.value.tune.points;
    let pointer: number = this.infoService.playerComponent.waitPointer;
    let thisPoint: Point = points[pointer];

    if (thisPoint != null && thisPoint.notesOn != null) {

      this.updateFalsePresses(thisPoint, pressedNote);

      for (let i = 0; i < thisPoint.notesOn.length; i++) {
        let note: Note = thisPoint.notesOn[i];

        //piano
        if (instrument == Instrument.PIANO) {
          if (
            (this.infoService.settings.rightHand && note.noteType == NoteType.RIGHT_HAND_NOTE) ||
            (this.infoService.settings.leftHand && note.noteType == NoteType.LEFT_HAND_BASS)
          ) {
            let playingNote: PlayingNote = this.playingPianoNotes.get(note.noteValue)!;
            if (playingNote == null || playingNote.note != null) {
              return;
            }
          }
        } else {

          //right-hand
          if (this.infoService.settings.rightHand && note.noteType == NoteType.RIGHT_HAND_NOTE) {
            let playingNote: PlayingNote = this.playingRightHandNotes.get(note.noteValue)!;
            if (playingNote == null || playingNote.note != null) {
              return;
            } else {
              continue;
            }
          }

          //left-hand
          if (this.infoService.settings.leftHand && note.noteType == NoteType.LEFT_HAND_BASS) {
            let playingNote: PlayingNote = this.getLeftHandPlayingBassNote(note.noteValue);
            if (playingNote == null || playingNote.note != null) {
              return;
            } else {
              continue;
            }
          }
          //left-hand-chord
          if (this.infoService.settings.leftHand && note.noteType == NoteType.LEFT_HAND_CHORD) {
            if (this.playingLeftHandChord == null) {
              return;
            } else {
              if (this.playingLeftHandChord.note != null || this.playingLeftHandChord.chordName != note.chordName) {
                return;
              }
            }
          }
        }
      }

      this.mergeExpectedWithPlaying(instrument, thisPoint);

      this.infoService.playerComponent.waitPointer = getNextPointer(
        points,
        this.infoService.playerComponent.waitPointer + 1,
        true,
        false,
        this.infoService.settings.leftHand,
        this.infoService.settings.rightHand,
        true
      );

      if (this.infoService.playerComponent.loopHandler.replayTween == null || !this.infoService.playerComponent.loopHandler.replayTween.isPlaying) {
        this.infoService.playerComponent.loopHandler.playLoop(true);
      } else {
        this.infoService.unsetTuneKeysTrigger.next(true);
      }
    }

  }

  playPianoNote(note: Note): void {
    if (this.infoService.settings.playPianoSound
    ) {
      let noteName: string = NOTE_NAMES_MAP.get(String(note.noteValue))!;
      if (noteName.length == 3) {
        noteName = noteName[0] + "#" + noteName[2];
      }
      let gain: number = note.noteValue < 60 ? this.infoService.settings.volumeLeft / 100 : this.infoService.settings.volumeRight / 100;
      let sound: any = this.tuneService.pianoPlayer.start(
        noteName,
        this.tuneService.getAudioContext().currentTime,
        {gain: gain}
      );
      this.playingPianoSounds.set(String(note.noteValue), sound);
    }
  }

  stopPianoNote(note: Note): void {
    if (this.infoService.settings.playPianoSound) {
      let playingSound: any = this.playingPianoSounds.get(String(note.noteValue));
      if (playingSound != null) {
        playingSound.stop();
      } else {
        console.log("Couldn't find playing note for: " + note.noteValue);
      }
    }
  }

  getChordNameFromPlayingNotes(): string {
    let chord: string = Array.from(this.playingChordNotes.values()).sort().join(",");
    if (!CHORDS_MAP.has(chord)) {
      let arr: Array<number> = Array.from(this.playingChordNotes.values()).sort();
      for (let i = 0; i < arr.length; i++) {
        arr[i] -= 12;
      }
      chord = arr.join(",");
    }
    return CHORDS_MAP.get(chord)!;
  }

  private getLeftHandPlayingBassNote(noteValue: number) {
    let playingNote: PlayingNote = this.playingLeftHandNotes.get(noteValue)!;
    playingNote = playingNote == null ? this.playingLeftHandNotes.get(noteValue + 12)! : playingNote;
    playingNote = playingNote == null ? this.playingLeftHandNotes.get(noteValue - 12)! : playingNote;
    playingNote = playingNote == null ? this.playingLeftHandNotes.get(noteValue - 24)! : playingNote;
    return playingNote;
  }

  private mergeExpectedWithPlaying(instrument: Instrument, thisPoint: Point): void {
    //all required notes are pressed
    for (let i = 0; i < thisPoint.notesOn.length; i++) {
      let note: Note = thisPoint.notesOn[i];
      //piano
      if (instrument == Instrument.PIANO) {
        let playingNote: PlayingNote = this.playingPianoNotes.get(note.noteValue)!;
        if (playingNote != null) {
          playingNote.note = note;
          continue;
        } else {
          console.log("Couldn't find the note in the playingPianoNotes: " + note.noteValue);
        }
      }
      //accordion right-hand
      if (this.infoService.settings.rightHand && note.noteType == NoteType.RIGHT_HAND_NOTE
      ) {
        let playingNote: PlayingNote = this.playingRightHandNotes.get(note.noteValue)!;
        if (playingNote != null) {
          playingNote.note = note;
          continue;
        } else {
          console.log("Couldn't find the note in the playingRightHandNotes: " + note.noteValue);
        }
      }

      if (this.infoService.settings.leftHand && note.noteType == NoteType.LEFT_HAND_BASS
      ) {
        let playingNote: PlayingNote = this.getLeftHandPlayingBassNote(note.noteValue)!;
        if (playingNote != null) {
          playingNote.note = note;
          continue;
        } else {
          console.log("Couldn't find the note in the playingLeftHandNotes: " + note.noteValue);
        }
      }

      if (this.infoService.settings.leftHand && note.noteType == NoteType.LEFT_HAND_CHORD
      ) {
        if (this.playingLeftHandChord?.chordName == note.chordName) {
          this.playingLeftHandChord.note = note;
        } else {
          console.log("Couldn't find the note in the playingLeftHandChord: " + note.chordName);
        }
      }
    }
  }

  updateFalsePresses(thisPoint: Point, pressedNote: Note): void {
    if (pressedNote.noteType == NoteType.PIANO_NOTE) {
      if (!thisPoint.getNoteValues().has(pressedNote.noteValue)) {
        pressedNote.noteValue >= 60 ? ++thisPoint.rightHandFalsePressesCount : ++thisPoint.leftHandFalsePressesCount;
      }
    } else {
      if (pressedNote.noteType == NoteType.RIGHT_HAND_NOTE) {
        if (!thisPoint.getNoteValues().has(pressedNote.noteValue)) {
          ++thisPoint.rightHandFalsePressesCount;
        }
      }
      if (pressedNote.noteType == NoteType.LEFT_HAND_BASS) {
        if (!thisPoint.getNoteValues().has(pressedNote.noteValue) &&
          !thisPoint.getNoteValues().has(pressedNote.noteValue + 12) &&
          !thisPoint.getNoteValues().has(pressedNote.noteValue - 12) &&
          !thisPoint.getNoteValues().has(pressedNote.noteValue + 24)
        ) {
          ++thisPoint.leftHandFalsePressesCount;
        }
      }
      if (pressedNote.noteType == NoteType.LEFT_HAND_CHORD) {
        if (!thisPoint.getChordNames().has(pressedNote.chordName)) {
          ++thisPoint.leftHandFalsePressesCount;
        }
      }
    }
  }
}
