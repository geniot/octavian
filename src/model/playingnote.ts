import {Note} from "./note";

export class PlayingNote {
  constructor(pressedAt: number) {
    this.pressedAt = pressedAt;
  }

  pressedAt!: number | null;
  releasedAt!: number | null;

  note!: Note | null;
}
