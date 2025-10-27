import {PlayingNote} from "./playingnote";

export class PlayingChord extends PlayingNote {
  chordName!: string | null;

  reset() {
    this.releasedAt = null;
    this.pressedAt = null;
    this.note = null;
    this.chordName = null;
  }
}
