import {Note} from "../note";
import Konva from "konva";
import {InfoService} from "../../services/infoservice";
import {BAR_COLORS_MAP, isNoteHandType} from "../constants";
import {BarColor} from "../barcolor";
import {Point} from "../point";
import {HandType} from "../enums/handtype";
import {DestroyableComponent} from "../destroyablecomponent";
import {NoteType} from "../enums/notetype";
import {TuneService} from "../../services/tuneservice";
import {Tune} from "../tune";

export class Bar extends DestroyableComponent {
  pointsIndexes!: Array<number>;
  barNumber!: number;

  rightHandBarRect!: Konva.Rect;
  leftHandBarRect!: Konva.Rect;

  debugText!: Konva.Text;

  constructor(public infoService: InfoService,
              public tuneService: TuneService,
              barNumber: number,
              points: Array<number>) {
    super();
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    this.barNumber = barNumber;
    this.pointsIndexes = points;

    let barOffsets: number[] = tune.barOffsets;
    let thisOffset: number = barOffsets[barNumber - 1];
    let nextOffset: number = barOffsets[barNumber];
    if (barNumber >= barOffsets.length) {
      nextOffset = tune.sheetWidth;
    }
    this.rightHandBarRect = new Konva.Rect({
      x: thisOffset,
      y: 0,
      width: nextOffset - thisOffset,
      height: tune.sheetHeight / 2,
      fill: BarColor.GREEN,
      opacity: 0
    });
    this.leftHandBarRect = new Konva.Rect({
      x: thisOffset,
      y: tune.sheetHeight / 2,
      width: nextOffset - thisOffset,
      height: tune.sheetHeight / 2,
      fill: BarColor.GREEN,
      opacity: 0
    });
    this.debugText = new Konva.Text(
      {
        x: thisOffset,
        y: 0,
        width: nextOffset - thisOffset,
      }
    );

    this.add(this.rightHandBarRect);
    this.add(this.leftHandBarRect);
    this.add(this.debugText);
  }

  notesEqual(note1: Note, note2: Note): boolean {
    return note1.noteType == note2.noteType && note1.noteValue == note2.noteValue && note1.chordName == note2.chordName;
  }


  check(): void {

    if (this.infoService.settings.rightHand) {
      if (this.hasFalsePresses(HandType.RIGHT_HAND)) {
        this.fillColor(HandType.RIGHT_HAND, BarColor.RED);
      } else {
        if (this.isYellow(HandType.RIGHT_HAND)) {
          this.fillColor(HandType.RIGHT_HAND, BarColor.YELLOW);
        } else {
          this.fillColor(HandType.RIGHT_HAND, BarColor.GREEN);
        }
      }
    }

    if (this.infoService.settings.leftHand) {
      if (this.hasFalsePresses(HandType.LEFT_HAND)) {
        this.fillColor(HandType.LEFT_HAND, BarColor.RED);
      } else {
        if (this.isYellow(HandType.LEFT_HAND)) {
          this.fillColor(HandType.LEFT_HAND, BarColor.YELLOW);
        } else {
          this.fillColor(HandType.LEFT_HAND, BarColor.GREEN);
        }
      }
    }

  }

  hasFalsePresses(handType: HandType): boolean {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    for (let i = 0; i < this.pointsIndexes.length; i++) {
      let point: Point = tune.points[this.pointsIndexes[i]];
      if (handType == HandType.RIGHT_HAND && point.rightHandFalsePressesCount > 0) {
        return true;
      }
      if (handType == HandType.LEFT_HAND && point.leftHandFalsePressesCount > 0) {
        return true;
      }
    }
    return false;
  }

  isYellow(handType: HandType): boolean {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    for (let pointIndex of this.pointsIndexes) {
      let point: Point = tune.points[pointIndex];
      if (point.notesOn != null) {
        for (let note of point.notesOn) {
          if (isNoteHandType(handType, note.noteType)) {
            let recordedDuration: number = Math.abs(note.releasedAt! - note.pressedAt!);
            let delta: number = Math.abs(recordedDuration - note.duration);
            if (delta > 500) {
              // console.log("bar : " + this.barNumber + "; delay: " + (recordedDuration - note.duration) + " note: " + note.noteValue + "; noteType: " + note.noteType);
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  fillColor(handType: HandType, barColor: BarColor) {
    let rect: Konva.Rect = this.rightHandBarRect;
    if (handType == HandType.LEFT_HAND) {
      rect = this.leftHandBarRect;
    }
    rect.fill(barColor);
    let colorTween = new Konva.Tween({
      node: rect,
      duration: 1,
      easing: Konva.Easings.Linear,
      opacity: 0.1
    });
    colorTween.play();
  }


  clear() {
    this.leftHandBarRect.opacity(0);
    this.rightHandBarRect.opacity(0);
  }

  copy(from: Bar): void {
    // console.log("Copy from: " + from.barNumber + " to " + this.barNumber);
    if (this.infoService.settings.rightHand) {
      this.fillColor(HandType.RIGHT_HAND, BAR_COLORS_MAP.get(<string>from.rightHandBarRect.fill())!);
    }
    if (this.infoService.settings.leftHand) {
      this.fillColor(HandType.LEFT_HAND, BAR_COLORS_MAP.get(<string>from.leftHandBarRect.fill())!);
    }
  }

  /**
   * Returns true if at least one note has pressedAt defined.
   */
  isPlayed() {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    for (let pointIndex of this.pointsIndexes) {
      let point: Point = tune.points[pointIndex];
      if (point.notesOn != null) {
        for (let note of point.notesOn) {

          if (this.infoService.settings.rightHand &&
            isNoteHandType(HandType.RIGHT_HAND, note.noteType) &&
            note.pressedAt != null
          ) {
            return true;
          }

          if (this.infoService.settings.leftHand &&
            isNoteHandType(HandType.LEFT_HAND, note.noteType) &&
            note.pressedAt != null
          ) {
            return true;
          }

        }
      }
    }
    return false;
  }

  isAllPlayed() {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    for (let pointIndex of this.pointsIndexes) {
      let point: Point = tune.points[pointIndex];
      if (point.notesOn != null) {
        for (let note of point.notesOn) {

          if (this.infoService.settings.rightHand &&
            isNoteHandType(HandType.RIGHT_HAND, note.noteType) &&
            note.releasedAt == null
          ) {
            return false;
          }

          if (this.infoService.settings.leftHand &&
            isNoteHandType(HandType.LEFT_HAND, note.noteType) &&
            note.releasedAt == null
          ) {
            return false;
          }

        }
      }
    }
    return true;
  }

  clearPlayedHistory() {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    for (let pointIndex of this.pointsIndexes) {
      let point: Point = tune.points[pointIndex];
      if (point.notesOn != null) {
        for (let i = 0; i < point.notesOn.length; i++) {
          point.notesOn[i].pressedAt = null;
          point.notesOn[i].releasedAt = null;
        }
      }
      point.rightHandFalsePressesCount = 0;
      point.leftHandFalsePressesCount = 0;
    }
  }

  debug(): void {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    let txt: string = '';
    let leftErrors: number = 0;
    let rightErrors: number = 0;
    for (let pointIndex of this.pointsIndexes) {
      let point: Point = tune.points[pointIndex];
      leftErrors += point.leftHandFalsePressesCount;
      rightErrors += point.rightHandFalsePressesCount;
      if (point.notesOn != null) {
        for (let i = 0; i < point.notesOn.length; i++) {
          txt += point.notesOn[i].noteType == NoteType.LEFT_HAND_CHORD ? point.notesOn[i].chordName : point.notesOn[i].noteValue;
          txt += ":";
          txt += this.shortenType(point.notesOn[i].noteType);
          txt += ":";
          txt += point.notesOn[i].pressedAt;
          txt += ":";
          txt += point.notesOn[i].releasedAt;
          txt += '\n';
        }
      }
    }
    txt += "ER:" + rightErrors;
    txt += ":EL:" + leftErrors;
    this.debugText.text(txt);
  }

  private shortenType(noteType: NoteType) {
    if (noteType == NoteType.RIGHT_HAND_NOTE) {
      return "RH";
    }
    if (noteType == NoteType.LEFT_HAND_BASS) {
      return "LH";
    }
    if (noteType == NoteType.LEFT_HAND_CHORD) {
      return "CH";
    }
    return "??";
  }
}
