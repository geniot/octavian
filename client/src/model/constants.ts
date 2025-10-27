import {Point} from "./point";
import {Note} from "./note";
import {NoteType} from "./enums/notetype";
import {Route} from "@angular/router";
import {Chord} from "./enums/chord";
import {HandType} from "./enums/handtype";
import {
  LEFT_HAND_MIRROR_120_2_BS_ROWS_LAYOUT,
  LEFT_HAND_MIRROR_120_3_BS_ROWS_A_LAYOUT,
  LEFT_HAND_MIRROR_120_3_BS_ROWS_B_LAYOUT,
  LEFT_HAND_MIRROR_120_3_BS_ROWS_BELGIUM_LAYOUT,
  LEFT_HAND_MIRROR_120_3_BS_ROWS_BX_A_LAYOUT,
  LEFT_HAND_MIRROR_120_3_BS_ROWS_BX_B_LAYOUT,
  LEFT_HAND_TEACHER_120_2_BS_ROWS_LAYOUT,
  LEFT_HAND_TEACHER_120_3_BS_ROWS_A_LAYOUT,
  LEFT_HAND_TEACHER_120_3_BS_ROWS_B_LAYOUT,
  LEFT_HAND_TEACHER_120_3_BS_ROWS_BELGIUM_LAYOUT,
  LEFT_HAND_TEACHER_120_3_BS_ROWS_BX_A_LAYOUT,
  LEFT_HAND_TEACHER_120_3_BS_ROWS_BX_B_LAYOUT,
  PIANO_ACCORDION_LAYOUT,
  RIGHT_HAND_MIRROR_92_B_GRIFF_BAJAN_LAYOUT,
  RIGHT_HAND_MIRROR_92_C_GRIFF_2_LAYOUT,
  RIGHT_HAND_MIRROR_92_C_GRIFF_EUROPE_LAYOUT,
  RIGHT_HAND_MIRROR_92_C_GRIFF_FINN_LAYOUT,
  RIGHT_HAND_MIRROR_92_D_GRIFF_1_LAYOUT,
  RIGHT_HAND_MIRROR_92_D_GRIFF_2_LAYOUT,
  RIGHT_HAND_TEACHER_92_B_GRIFF_BAJAN_LAYOUT,
  RIGHT_HAND_TEACHER_92_C_GRIFF_2_LAYOUT,
  RIGHT_HAND_TEACHER_92_C_GRIFF_EUROPE_LAYOUT,
  RIGHT_HAND_TEACHER_92_C_GRIFF_FINN_LAYOUT,
  RIGHT_HAND_TEACHER_92_D_GRIFF_1_LAYOUT,
  RIGHT_HAND_TEACHER_92_D_GRIFF_2_LAYOUT
} from "./layouts";
import {ViewMode} from "./enums/viewmode";
import {RightHandLayout} from "./enums/righthandlayout";
import {LeftHandLayout} from "./enums/lefthandlayout";
import {Instrument} from "./enums/instrument";
import {InfoService} from "../services/infoservice";
import {Finger} from "./finger";
import {PlayerComponent} from "../app/player/player.component";
import Konva from "konva";
import {BarColor} from "./barcolor";
import {ClientAction} from "./enums/clientaction";
import {Role} from "./enums/role";
import {StatsRecord} from "./statsrecord";
import {TuneService} from "../services/tuneservice";
import {TuneModel} from "./mds/tunemodel";
import {Settings} from "./settings";
import {PlayerMode} from "./enums/playermode";
import {Tune} from "./tune";

export const SELECTION_HANDLE_FILL_COLOR: string = '#ffffff';
export const SELECTION_HANDLE_WIDTH: number = 20;
export const SELECTION_HANDLE_HEIGHT: number = 40;
export const SELECTION_MIN: number = 100;
export const SELECTION_INIT: number = 300;

export const HAND_SCREEN_FILL_COLOR: string = '#f9f9f9';
export const SELECTION_AREA_FILL: string = '#3b302b40';
export const ACCORDION_KEYBOARD_PADDING: number = 50;
export const PIANO_ACCORDION_WIDTH_RATIO: number = 400 / 90;
export const PIANO_HEIGHT_RATIO: number = 580 / 70;
export const PIANO_BLACK_KEYS_WIDTH_RATIO: number = 55 / 90;

export const FINGER_PLACEHOLDER: string = 'X';

export const EMAIL_REGEX: RegExp = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const ICONS_MAP: Map<string, string> = new Map([]);

export const ALLOWED_FINGERS: string = "12345" + FINGER_PLACEHOLDER;
export const NUMBERS: string = "1234567890";
export const LETTERS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const RIGHT_HAND_NOTE_NAMES_MAP: Map<string, string> =
  new Map([
    ["AB", "A♯\n B♭"],
    ["DE", "D♯\n E♭"],
    ["FG", "F♯\n G♭"],
    ["GA", "G♯\n A♭"],
    ["CD", "C♯\n D♭"],
  ]);

export const NOTE_NAMES_MAP: Map<string, string> =
  new Map([
    ["21", "A0"],
    ["22", "AB0"],
    ["23", "B0"],
    ["24", "C1"],
    ["25", "CD1"],
    ["26", "D1"],
    ["27", "DE1"],
    ["28", "E1"],
    ["29", "F1"],
    ["30", "FG1"],
    ["31", "G1"],
    ["32", "GA1"],
    ["33", "A1"],
    ["34", "AB1"],
    ["35", "B1"],
    ["36", "C2"],
    ["37", "CD2"],
    ["38", "D2"],
    ["39", "DE2"],
    ["40", "E2"],
    ["41", "F2"],
    ["42", "FG2"],
    ["43", "G2"],
    ["44", "GA2"],
    ["45", "A2"],
    ["46", "AB2"],
    ["47", "B2"],
    ["48", "C3"],
    ["49", "CD3"],
    ["50", "D3"],
    ["51", "DE3"],
    ["52", "E3"],
    ["53", "F3"],
    ["54", "FG3"],
    ["55", "G3"],
    ["56", "GA3"],
    ["57", "A3"],
    ["58", "AB3"],
    ["59", "B3"],
    ["60", "C4"],
    ["61", "CD4"],
    ["62", "D4"],
    ["63", "DE4"],
    ["64", "E4"],
    ["65", "F4"],
    ["66", "FG4"],
    ["67", "G4"],
    ["68", "GA4"],
    ["69", "A4"],
    ["70", "AB4"],
    ["71", "B4"],
    ["72", "C5"],
    ["73", "CD5"],
    ["74", "D5"],
    ["75", "DE5"],
    ["76", "E5"],
    ["77", "F5"],
    ["78", "FG5"],
    ["79", "G5"],
    ["80", "GA5"],
    ["81", "A5"],
    ["82", "AB5"],
    ["83", "B5"],
    ["84", "C6"],
    ["85", "CD6"],
    ["86", "D6"],
    ["87", "DE6"],
    ["88", "E6"],
    ["89", "F6"],
    ["90", "FG6"],
    ["91", "G6"],
    ["92", "GA6"],
    ["93", "A6"],
    ["94", "AB6"],
    ["95", "B6"],
    ["96", "C7"],
    ["97", "CD7"],
    ["98", "D7"],
    ["99", "DE7"],
    ["100", "E7"],
    ["101", "F7"],
    ["102", "FG7"],
    ["103", "G7"],
    ["104", "GA7"],
    ["105", "A7"],
    ["106", "AB7"],
    ["107", "B7"],
    ["108", "C8"]
  ]);

/**
 * Used by midi handler. When user plays a chord on her instrument, we need to identify it.
 */
export const CHORDS_MAP: Map<string, string> =
  new Map([

    ["48,52,55", Chord.C],
    ["48,51,55", Chord.Cm],
    ["48,52,55,58", Chord.C7],
    ["40,48,55,58", Chord.C7],
    ["48,51,54,57", Chord.Cd],

    ["49,53,56", Chord.CD],
    ["49,52,56", Chord.CDm],
    ["49,53,59,56", Chord.CD7],
    ["41,49,56,59", Chord.CD7],
    ["49,52,55,58", Chord.CDd],

    ["50,54,57", Chord.D],
    ["50,53,57", Chord.Dm],
    ["38,48,54,57", Chord.D7],
    ["42,48,50,57", Chord.D7],
    ["50,53,59,56", Chord.Dd],

    ["51,55,58", Chord.DE],
    ["51,54,58", Chord.DEm],
    ["39,49,55,58", Chord.DE7],
    ["43,49,51,58", Chord.DE7],
    ["39,48,54,57", Chord.DEd],

    ["52,56,59", Chord.E],
    ["52,55,59", Chord.Em],
    ["40,50,56,59", Chord.E7],
    ["44,50,52,59", Chord.E7],
    ["40,49,55,58", Chord.Ed],

    ["41,48,57", Chord.F],
    ["41,48,56", Chord.Fm],
    ["41,48,51,57", Chord.F7],
    ["45,48,51,53", Chord.F7],
    ["41,50,56,59", Chord.Fd],

    ["42,49,58", Chord.FG],
    ["42,49,57", Chord.FGm],
    ["42,49,52,58", Chord.FG7],
    ["46,49,52,54", Chord.FG7],
    ["42,48,51,57", Chord.FGd],

    ["43,50,59", Chord.G],
    ["43,50,58", Chord.Gm],
    ["43,50,53,59", Chord.G7],
    ["47,50,53,55", Chord.G7],
    ["43,49,52,58", Chord.Gd],

    ["44,48,51", Chord.GA],
    ["44,51,59", Chord.GAm],
    ["44,48,51,54", Chord.GA7],
    ["48,51,54,56", Chord.GA7],
    ["44,50,53,59", Chord.GAd],

    ["45,49,52", Chord.A],
    ["45,48,52", Chord.Am],
    ["45,49,52,55", Chord.A7],
    ["49,52,55,57", Chord.A7],
    ["45,48,51,54", Chord.Ad],

    ["46,50,53", Chord.AB],
    ["46,49,53", Chord.ABm],
    ["46,50,53,56", Chord.AB7],
    ["50,53,56,58", Chord.AB7],
    ["46,49,52,55", Chord.ABd],

    ["47,51,54", Chord.B],
    ["47,50,54", Chord.Bm],
    ["47,51,54,57", Chord.B7],
    ["51,54,57,59", Chord.B7],
    ["47,50,53,56", Chord.Bd],

  ]);

/**
 * Finds the next pointer starting from fromPointer based on search criteria.
 * Returns -1 if nothing found or fromPointer is outside of the points array size.
 *
 * @param points
 * @param fromPointer inclusive
 * @param isOn look for ON notes
 * @param isOff look for OFF notes
 * @param leftHand look for LEFT_HAND typed notes
 * @param rightHand look for RIGHT_HAND typed notes
 * @param isNext
 */
export const getNextPointer = (points: Point[],
                               fromPointer: number,
                               isOn: boolean,
                               isOff: boolean,
                               leftHand: boolean,
                               rightHand: boolean,
                               isNext: boolean
): number => {
  if (fromPointer >= points.length || fromPointer < 0) {
    return -1;
  }
  for (let i = fromPointer; isNext ? (i < points.length) : i >= 0; isNext ? i++ : i--) {
    let notes: Note[] = [];
    if (isOn && points[i].notesOn != null) {
      notes = notes.concat(points[i].notesOn);
    }
    if (isOff && points[i].notesOff != null) {
      notes = notes.concat(points[i].notesOff);
    }
    if (notes.length > 0) {
      if (leftHand && rightHand) {
        return i;
      } else if (leftHand) {
        for (let k = 0; k < notes.length; k++) {
          if (notes[k].noteType == NoteType.LEFT_HAND_CHORD || notes[k].noteType == NoteType.LEFT_HAND_BASS) {
            return i;
          }
        }
      } else if (rightHand) {
        for (let k = 0; k < notes.length; k++) {
          if (notes[k].noteType == NoteType.RIGHT_HAND_NOTE) {
            return i;
          }
        }
      }
    }
  }
  return -1;
}

export const contains = (arr: Route[], route: string): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].path == route) {
      return true;
    }
  }
  return false;
}

export const isTuneLoaded = (model: TuneModel): boolean => {
  return model.tune != null && model.tune.points != null;
}

export const setPointerCursor = (group: Konva.Group, playerComponent: PlayerComponent): void => {
  group.on('mouseenter', function () {
    playerComponent.stage.container().style.cursor = 'pointer';
  });
  group.on('mouseleave', function () {
    playerComponent.stage.container().style.cursor = 'default';
  });
}

export const clearArray = (array: Array<any>): void => {
  while (array.length) {
    array.pop();
  }
}

export const minNoteDuration = (notes: Note[]): number => {
  let minDuration: number = Number.MAX_VALUE;
  for (let i = 0; i < notes.length; i++) {
    minDuration = Math.min(minDuration, notes[i].duration);
  }
  return minDuration;//note durations are in milliseconds
}

export const soundPoint = (thisPoint: Point, shouldSound: boolean, infoService: InfoService, tuneService: TuneService): void => {
  let instrument: Instrument = infoService.settings.instrument;
//order does matter, first we publish notes off, only then notes on
  if (thisPoint.notesOff != null) {
    for (let i = 0; i < thisPoint.notesOff.length; i++) {
      let note: Note = thisPoint.notesOff[i];
      if (note.noteType == NoteType.RIGHT_HAND_NOTE && infoService.settings.rightHand) {
        if (instrument == Instrument.PIANO) {
          infoService.pianoNoteOff.next(note);
        } else {
          infoService.rightNoteOff.next(note);
        }
      } else if (note.noteType == NoteType.LEFT_HAND_BASS && infoService.settings.leftHand) {
        if (instrument == Instrument.PIANO) {
          infoService.pianoNoteOff.next(note);
        } else {
          infoService.leftNoteOff.next(note);
        }
      } else if (note.noteType == NoteType.LEFT_HAND_CHORD && infoService.settings.leftHand) {
        infoService.leftChordOff.next(note);
      }
    }
  }
  if (thisPoint.notesOn != null) {
    for (let i = 0; i < thisPoint.notesOn.length; i++) {
      let note: Note = thisPoint.notesOn[i];
      let noteDuration: number = ((note.duration) / 1000) * (100 / infoService.settings.playbackRate);

      if (note.noteType == NoteType.RIGHT_HAND_NOTE && infoService.settings.rightHand) {
        if (instrument == Instrument.PIANO) {
          infoService.pianoNoteOn.next(note);
        } else {
          infoService.rightNoteOn.next(note);
        }
        if (shouldSound) {
          let gain: number = infoService.settings.volumeRight / 100;
          tuneService.getCurrentPlayer().start(adjustNoteName(note.noteName), tuneService.getAudioContext().currentTime, {
            duration: noteDuration,
            gain: gain
          });
        }
      } else if (note.noteType == NoteType.LEFT_HAND_BASS && infoService.settings.leftHand) {
        if (instrument == Instrument.PIANO) {
          infoService.pianoNoteOn.next(note);
        } else {
          infoService.leftNoteOn.next(note);
        }
        if (shouldSound) {
          let gain: number = infoService.settings.volumeLeft / 100;
          tuneService.getCurrentPlayer().start(adjustNoteName(note.noteName), tuneService.getAudioContext().currentTime, {
            duration: noteDuration,
            gain: gain
          });
        }
      } else if (note.noteType == NoteType.LEFT_HAND_CHORD && infoService.settings.leftHand) {
        infoService.leftChordOn.next(note);
        if (shouldSound) {
          let gain: number = infoService.settings.volumeLeft / 100;
          let chordNotes: Array<string> = note.noteName.split(" ");
          for (let k = 0; k < chordNotes.length; k++) {
            tuneService.getCurrentPlayer().start(adjustNoteName(chordNotes[k]), tuneService.getAudioContext().currentTime, {
              duration: noteDuration,
              gain: gain
            });
          }
        }
      }
    }
  }
}

export const getBarPoints = (points: Point[], barNumber: number): Array<number> => {
  let barPointsArray: Array<number> = new Array<number>();
  for (let i = 0; i < points.length; i++) {
    if (points[i].bar == barNumber) {
      barPointsArray.push(i);
    }
  }
  return barPointsArray;
}

export const isRight = (handType: HandType, viewMode: ViewMode): boolean => {
  return (handType == HandType.RIGHT_HAND && viewMode == ViewMode.MIRROR_MODE) ||
    (handType == HandType.LEFT_HAND && viewMode == ViewMode.TEACHER_MODE);
}

export const getNoteFinger = (note: Note,
                              infoService: InfoService,
                              handType: HandType,
                              rightHandLayout: RightHandLayout,
                              leftHandLayout: LeftHandLayout
): Finger | null => {
  if (note.fingers == null) {
    return null;
  } else {
    if (handType == HandType.RIGHT_HAND && note.fingers.has(rightHandLayout)) {
      return note.fingers.get(rightHandLayout)!;
    }
    if (handType == HandType.LEFT_HAND && note.fingers.has(leftHandLayout)) {
      return note.fingers.get(leftHandLayout)!;
    }
    if (handType == HandType.ANY_HAND && note.fingers.has(RightHandLayout.PIANO_RIGHT_HAND)) {
      return note.fingers.get(RightHandLayout.PIANO_RIGHT_HAND)!;
    }
    if (handType == HandType.ANY_HAND && note.fingers.has(LeftHandLayout.PIANO_LEFT_HAND)) {
      return note.fingers.get(LeftHandLayout.PIANO_LEFT_HAND)!;
    }
    return null;
  }
}

export const unsetNoteFinger = (note: Note,
                                handType: HandType,
                                instrument: Instrument,
                                rightHandLayout: RightHandLayout,
                                leftHandLayout: LeftHandLayout
): void => {
  let layoutName: string | null = getLayoutName(note, handType, instrument, rightHandLayout, leftHandLayout);
  if (layoutName != null && note.fingers != null) {
    note.fingers.delete(layoutName);
  }
}

export const setNoteFinger = (note: Note,
                              fingerStr: string | null,
                              button: Number,
                              handType: HandType,
                              instrument: Instrument,
                              rightHandLayout: RightHandLayout,
                              leftHandLayout: LeftHandLayout
): void => {
  let layoutName: string | null = getLayoutName(note, handType, instrument, rightHandLayout, leftHandLayout);
  if (layoutName != null) {
    let finger = note.fingers == null ? null : note.fingers.get(layoutName);
    if (finger == null) {
      finger = new Finger();
    }
    if (fingerStr != null) {
      finger.finger = fingerStr;
    }
    if (button != null) {
      finger.button = button;
    }
    if (note.fingers == null) {
      note.fingers = new Map<string, Finger>();
    }
    note.fingers.set(layoutName, finger);
  } else {
    console.log("Couldn't find layout for hand: " + handType);
  }
}

export const getLayoutName = (note: Note,
                              handType: HandType,
                              instrument: Instrument,
                              rightHandLayout: RightHandLayout,
                              leftHandLayout: LeftHandLayout): string | null => {
  switch (instrument) {
    case Instrument.PIANO: {
      switch (handType) {
        case HandType.RIGHT_HAND:
        default:
          return RightHandLayout.PIANO_RIGHT_HAND;
        case HandType.LEFT_HAND:
          return LeftHandLayout.PIANO_LEFT_HAND;
      }
    }
    case Instrument.PIANO_ACCORDION: {
      switch (handType) {
        case HandType.RIGHT_HAND:
        default:
          return RightHandLayout.PIANO_RIGHT_HAND;
        case HandType.LEFT_HAND:
          return leftHandLayout;
      }
    }
    case Instrument.BUTTON_ACCORDION:
    default: {
      switch (handType) {
        case HandType.RIGHT_HAND:
        default:
          return rightHandLayout;
        case HandType.LEFT_HAND:
          return leftHandLayout;
      }
    }
  }
}

export const defaultize = (settings: Settings): void => {
  if (settings.rightHandLayout == null || RIGHT_HAND_LAYOUT_OPTIONS_MAP.get(settings.rightHandLayout) == null) {
    settings.rightHandLayout = RightHandLayout.B_GRIFF_BAJAN;
  }
  if (settings.leftHandLayout == null || LEFT_HAND_LAYOUT_OPTIONS_MAP.get(settings.leftHandLayout) == null) {
    settings.leftHandLayout = LeftHandLayout._2_BS_ROWS;
  }
  if (settings.viewMode == null || SETTINGS_VIEW_MODE_MAP.get(settings.viewMode) == null) {
    settings.viewMode = ViewMode.MIRROR_MODE;
  }
  if (settings.mode == null) {
    settings.mode = PlayerMode.PLAY;
  }
  if (settings.prevMode == null) {
    settings.prevMode = PlayerMode.PLAY;
  }
  if (settings.volumeRight < 10 || settings.volumeRight > 100) {
    settings.volumeRight = 100;
  }
  if (settings.volumeLeft < 10 || settings.volumeLeft > 100) {
    settings.volumeLeft = 100;
  }
  if (settings.playbackRate < 10 || settings.playbackRate > 100) {
    settings.playbackRate = 100;
  }
  if (!settings.leftHand && !settings.rightHand) {
    settings.leftHand = true;
    settings.rightHand = true;
  }
}
export const tunify = (m: TuneModel): void => {
  if (m.tune != null && m.tune.points != null) {
    for (let i = 0; i < m.tune.points.length; i++) {
      let point: Point = m.tune.points[i];
      if (point.notesOn != null) {
        tunifyNotes(point.notesOn);
      }
      if (point.notesOff != null) {
        tunifyNotes(point.notesOff);
      }
    }
  }
}

export const tunifyNotes = (notes: Note[]): void => {
  for (let i = 0; i < notes.length; i++) {
    notes[i].isTune = true;
  }
}

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
}

export const adjustNoteName = (noteName: string): string => {
  if (noteName.length == 3) {
    return noteName.charAt(0) + '#' + noteName.charAt(2);
  } else {
    return noteName;
  }
}

export const getAccordionKeyNameByValue = (someValue: any): string => {
  return getLongKeyNameByValue(someValue, '\n', '');
}

export const getPianoKeyNameByValue = (someValue: any): string => {
  return getLongKeyNameByValue(someValue, ' ', '');
}

export const getLongKeyNameByValue = (someValue: any, replaceFrom: string, replaceTo: string): string => {
  let name: string = String(someValue);
  name = NOTE_NAMES_MAP.get(name)!;
  if (name.length == 3) {
    name = RIGHT_HAND_NOTE_NAMES_MAP.get(name.substr(0, 2))!;
    name = name.replace(replaceFrom, replaceTo);
  }
  return name;
}

export const getKeyNameByValue = (someValue: any, keyCounter: number, handType: HandType): string => {
  let name: string = String(someValue);
  if (typeof (someValue) === 'number') {
    name = NOTE_NAMES_MAP.get(name)!;
    name = name.substr(0, name.length - 1);
    if (name.length == 2) {
      if (handType == HandType.LEFT_HAND) {
        if (keyCounter < 60) {
          name = name.substr(0, 1) + '♯';
        } else {
          name = name.substr(1, 1) + '♭';
        }
      } else if (handType == HandType.RIGHT_HAND) {
        name = RIGHT_HAND_NOTE_NAMES_MAP.get(name)!;
      }
    }
  } else {//chord
    if (name.length == 1) {
      name = name + 'j';//major
    } else if (name.length == 2) {
      if (isUpperCaseLetter(name.charAt(1))) {
        name = name + 'j';//major flat/sharp
      }
    }
  }
  if (handType == HandType.LEFT_HAND && name.length > 2) {
    name = name.substr(2, 1);
  }
  return name;
}

export const isUpperCaseLetter = (char: string): boolean => {
  return (/[A-Z]/.test(char));
}

export const binarySearch = (nums: Array<Point>, key: number): number => {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid].offsetX === key) {
      return mid;
    }
    if (key > nums[mid].offsetX) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -(low + 1);
}

export const isNoteHandType = (handType: HandType, noteType: NoteType): boolean => {
  if (handType == HandType.RIGHT_HAND) {
    if (noteType == NoteType.RIGHT_HAND_NOTE || noteType == NoteType.PIANO_NOTE) {
      return true;
    }
  } else if (handType == HandType.LEFT_HAND) {
    if (noteType == NoteType.LEFT_HAND_BASS || noteType == NoteType.LEFT_HAND_CHORD || noteType == NoteType.PIANO_NOTE) {
      return true;
    }
  }
  return false;
}

export const getPianoHandByNoteType = (noteType: NoteType): HandType => {
  if (noteType == NoteType.LEFT_HAND_CHORD || noteType == NoteType.LEFT_HAND_BASS) {
    return HandType.LEFT_HAND;
  } else {
    return HandType.RIGHT_HAND;
  }
}

export const arrayFromMap = (map: Map<string, string>): Array<{ key: string, value: string }> => {
  let array: Array<{ key: string, value: string }> = [];
  for (let key of map.keys()) {
    array.push({key: key, value: map.get(key)!});
  }
  return array;
}

export const handArrayFromMap = (map: Map<string, string>, hand: HandType)
  : Array<{ key: string, value: string, hand: HandType }> => {
  let array: Array<{ key: string, value: string, hand: HandType }> = [];
  for (let key of map.keys()) {
    array.push({key: key, value: map.get(key)!, hand: hand});
  }
  return array;
}

export const isEmail = (input: string): boolean => {
  return input != null && EMAIL_REGEX.test(input);
}

export const isPassword = (input: string): boolean => {
  return input != null && input.length > 0;
}

export const DEFAULT_ROUTER_URL: string = ClientAction.PIANO;

export const RIGHT_HAND_LAYOUT_OPTIONS_MAP: Map<string, string> =
  new Map([
    [RightHandLayout.C_GRIFF_EUROPE, "C-griff Europe"],
    [RightHandLayout.C_GRIFF_2, "C-griff 2"],
    [RightHandLayout.B_GRIFF_BAJAN, "B-griff Bajan"],
    [RightHandLayout.C_GRIFF_FINN, "C-griff Finn"],
    [RightHandLayout.D_GRIFF_1, "D-griff 1"],
    [RightHandLayout.D_GRIFF_2, "D-griff 2"],
  ]);

export const PIANO_LAYOUT_OPTIONS_MAP: Map<string, string> =
  new Map([
    [RightHandLayout.PIANO_RIGHT_HAND as string, "Piano Right Hand"],
    [LeftHandLayout.PIANO_LEFT_HAND as string, "Piano Left Hand"],
  ]);

export const RIGHT_HAND_MIRROR_LAYOUTS_MAP: Map<string, any> =
  new Map([
    [RightHandLayout.C_GRIFF_EUROPE, RIGHT_HAND_MIRROR_92_C_GRIFF_EUROPE_LAYOUT],
    [RightHandLayout.C_GRIFF_2, RIGHT_HAND_MIRROR_92_C_GRIFF_2_LAYOUT],
    [RightHandLayout.B_GRIFF_BAJAN, RIGHT_HAND_MIRROR_92_B_GRIFF_BAJAN_LAYOUT],
    [RightHandLayout.C_GRIFF_FINN, RIGHT_HAND_MIRROR_92_C_GRIFF_FINN_LAYOUT],
    [RightHandLayout.D_GRIFF_1, RIGHT_HAND_MIRROR_92_D_GRIFF_1_LAYOUT],
    [RightHandLayout.D_GRIFF_2, RIGHT_HAND_MIRROR_92_D_GRIFF_2_LAYOUT],
  ]);

export const RIGHT_HAND_TEACHER_LAYOUTS_MAP: Map<string, any> =
  new Map([
    [RightHandLayout.C_GRIFF_EUROPE, RIGHT_HAND_TEACHER_92_C_GRIFF_EUROPE_LAYOUT],
    [RightHandLayout.C_GRIFF_2, RIGHT_HAND_TEACHER_92_C_GRIFF_2_LAYOUT],
    [RightHandLayout.B_GRIFF_BAJAN, RIGHT_HAND_TEACHER_92_B_GRIFF_BAJAN_LAYOUT],
    [RightHandLayout.C_GRIFF_FINN, RIGHT_HAND_TEACHER_92_C_GRIFF_FINN_LAYOUT],
    [RightHandLayout.D_GRIFF_1, RIGHT_HAND_TEACHER_92_D_GRIFF_1_LAYOUT],
    [RightHandLayout.D_GRIFF_2, RIGHT_HAND_TEACHER_92_D_GRIFF_2_LAYOUT],
  ]);

export const LEFT_HAND_LAYOUT_OPTIONS_MAP: Map<string, string> =
  new Map([
    [LeftHandLayout._2_BS_ROWS, "2 Bs Rows"],
    [LeftHandLayout._3_BS_ROWS_A_7TH, "3 Bs Rows A-7th"],
    [LeftHandLayout._3_BS_ROWS_A_5_DIM, "3 Bs Rows A-5 dim"],
    [LeftHandLayout._3_BS_ROWS_B_7TH, "3 Bs Rows B-7th"],
    [LeftHandLayout._3_BS_ROWS_B_5_DIM, "3 Bs Rows B-5 dim"],
    [LeftHandLayout._3_BS_ROWS_BX_7TH_A, "3 Bs Rows Bx-7th (a)"],
    [LeftHandLayout._3_BS_ROWS_BX_7TH_B, "3 Bs Rows Bx-7th (b)"],
    [LeftHandLayout._3_BS_ROWS_BELGIUM, "3 Bs Rows Belgium"],
  ]);

export const LEFT_HAND_MIRROR_LAYOUTS_MAP: Map<string, any> =
  new Map([
    [LeftHandLayout._2_BS_ROWS, LEFT_HAND_MIRROR_120_2_BS_ROWS_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_A_7TH, LEFT_HAND_MIRROR_120_3_BS_ROWS_A_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_A_5_DIM, LEFT_HAND_MIRROR_120_3_BS_ROWS_A_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_B_7TH, LEFT_HAND_MIRROR_120_3_BS_ROWS_B_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_B_5_DIM, LEFT_HAND_MIRROR_120_3_BS_ROWS_B_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_BX_7TH_A, LEFT_HAND_MIRROR_120_3_BS_ROWS_BX_A_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_BX_7TH_B, LEFT_HAND_MIRROR_120_3_BS_ROWS_BX_B_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_BELGIUM, LEFT_HAND_MIRROR_120_3_BS_ROWS_BELGIUM_LAYOUT],
  ]);

export const LEFT_HAND_TEACHER_LAYOUTS_MAP: Map<string, any> =
  new Map([
    [LeftHandLayout._2_BS_ROWS, LEFT_HAND_TEACHER_120_2_BS_ROWS_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_A_7TH, LEFT_HAND_TEACHER_120_3_BS_ROWS_A_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_A_5_DIM, LEFT_HAND_TEACHER_120_3_BS_ROWS_A_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_B_7TH, LEFT_HAND_TEACHER_120_3_BS_ROWS_B_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_B_5_DIM, LEFT_HAND_TEACHER_120_3_BS_ROWS_B_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_BX_7TH_A, LEFT_HAND_TEACHER_120_3_BS_ROWS_BX_A_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_BX_7TH_B, LEFT_HAND_TEACHER_120_3_BS_ROWS_BX_B_LAYOUT],
    [LeftHandLayout._3_BS_ROWS_BELGIUM, LEFT_HAND_TEACHER_120_3_BS_ROWS_BELGIUM_LAYOUT],
  ]);

export const SETTINGS_VIEW_MODE_MAP: Map<string, string> =
  new Map([
    [ViewMode.MIRROR_MODE, "mirror mode"],
    [ViewMode.TEACHER_MODE, "teacher mode"]
  ]);

export const INSTRUMENTS_ROUTES_MAP: Map<string, string> =
  new Map([
    [Instrument.BUTTON_ACCORDION, "/" + ClientAction.ACCORDION_BUTTON_TYPE],
    [Instrument.PIANO_ACCORDION, "/" + ClientAction.ACCORDION_PIANO_TYPE],
    [Instrument.PIANO, "/" + ClientAction.PIANO],
  ]);

export const INSTRUMENTS_NAMES_MAP: Map<string, string> =
  new Map([
    [Instrument.BUTTON_ACCORDION, "button accordion"],
    [Instrument.PIANO_ACCORDION, "piano accordion"],
    [Instrument.PIANO, "piano"],
  ]);

export const BAR_COLORS_MAP: Map<string, BarColor> =
  new Map([
    [BarColor.RED.valueOf(), BarColor.RED],
    [BarColor.GREEN.valueOf(), BarColor.GREEN],
    [BarColor.YELLOW.valueOf(), BarColor.YELLOW],
  ]);

export const ROLES_MAP: Map<string, Role> =
  new Map([
    [Role.ADMIN.valueOf(), Role.ADMIN],
    [Role.CONFIRMED.valueOf(), Role.CONFIRMED],
    [Role.REGISTERED.valueOf(), Role.REGISTERED],
    [Role.SUBSCRIBER.valueOf(), Role.SUBSCRIBER],
  ]);

export const selectLayout = (handType: HandType,
                             viewMode: ViewMode,
                             rightHandLayout: RightHandLayout,
                             leftHandLayout: LeftHandLayout,
                             instrument: Instrument
): any => {
  if (handType == HandType.RIGHT_HAND && viewMode == ViewMode.MIRROR_MODE) {
    if (instrument == Instrument.PIANO_ACCORDION) {
      return PIANO_ACCORDION_LAYOUT;
    } else {
      return RIGHT_HAND_MIRROR_LAYOUTS_MAP.get(rightHandLayout);
    }
  }
  if (handType == HandType.RIGHT_HAND && viewMode == ViewMode.TEACHER_MODE) {
    return LEFT_HAND_TEACHER_LAYOUTS_MAP.get(leftHandLayout);
  }
  if (handType == HandType.LEFT_HAND && viewMode == ViewMode.MIRROR_MODE) {
    return LEFT_HAND_MIRROR_LAYOUTS_MAP.get(leftHandLayout);
  }
  if (handType == HandType.LEFT_HAND && viewMode == ViewMode.TEACHER_MODE) {
    if (instrument == Instrument.PIANO_ACCORDION) {
      return PIANO_ACCORDION_LAYOUT;
    } else {
      return RIGHT_HAND_TEACHER_LAYOUTS_MAP.get(rightHandLayout);
    }
  }
}

export const getScore = (statsRecord: StatsRecord): number => {
  let ratio: number = 100;
  let total: number = statsRecord.rh.length * ratio + statsRecord.lh.length * ratio;
  let handScore: number = getHandScore(statsRecord.rh, ratio);
  handScore += getHandScore(statsRecord.lh, ratio);
  return Math.round((handScore * 100) / total);
}

export const getHandScore = (performance: string, ratio: number): number => {
  let handScore: number = 0;
  for (let i = 0; i < performance.length; i++) {
    if (performance[i] == '1') {
      handScore += ratio / 1.5;
    }
    if (performance[i] == '2') {
      handScore -= ratio / 2;
    }
    if (performance[i] == '0') {
      handScore += ratio;
    }
  }
  return handScore > 0 ? handScore : 0;
}

export const compareTunesFunc = (obj1: [string, Tune], obj2: [string, Tune]): number => {
  let o1: string = obj1[0];
  let o2: string = obj2[0];
  if (o1 == o2) {
    return 0;
  }
  return obj1[1].positionNum - obj2[1].positionNum;
}
