import {Note} from "./note";
import {Type} from 'class-transformer';
import {NoteType} from "./enums/notetype";

export class Point {
  timestamp: number = 0;
  offsetX: number = -1;
  bar!: number;

  @Type(() => Note)
  notesOn!: Note[];
  @Type(() => Note)
  notesOff!: Note[];

  rightHandFalsePressesCount: number = 0;
  leftHandFalsePressesCount: number = 0;

  private noteValues!: Set<number>;
  private chordNames!: Set<string>;

  /**
   * Lazy i18n
   */
  getNoteValues(): Set<number> {
    if (this.noteValues == null) {
      this.noteValues = new Set<number>();
      if (this.notesOn != null) {
        for (let note of this.notesOn) {
          this.noteValues.add(note.noteValue);
        }
      }
    }
    return this.noteValues;
  }

  getChordNames(): Set<string> {
    if (this.chordNames == null) {
      this.chordNames = new Set<string>();
      if (this.notesOn != null) {
        for (let note of this.notesOn) {
          if (note.noteType == NoteType.LEFT_HAND_CHORD) {
            this.chordNames.add(note.chordName);
          }
        }
      }
    }
    return this.chordNames;
  }
}
