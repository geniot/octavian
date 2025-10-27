import {NoteType} from "./enums/notetype";
import {Finger} from "./finger";
import {Type} from "class-transformer";

export class Note {
  duration!: number;
  noteType!: NoteType;
  noteValue!: number;
  noteName!: string;
  chordName!: string;
  isTune!: boolean;
  @Type(() => Map<string, Finger>)
  fingers!: Map<string, Finger>;

  pressedAt: number | null = null;
  releasedAt: number | null = null;

  constructor(value: number | string) {
    if (typeof value === "number") {
      this.noteValue = value;
    } else {
      this.chordName = value;
    }
  }

}
