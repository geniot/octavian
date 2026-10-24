import {Component} from "@angular/core";
import {AnyDialog} from "./anydialog";
import {
  ALLOWED_FINGERS,
  FINGER_PLACEHOLDER,
  handArrayFromMap,
  isNoteHandType,
  LEFT_HAND_LAYOUT_OPTIONS_MAP,
  PIANO_LAYOUT_OPTIONS_MAP,
  RIGHT_HAND_LAYOUT_OPTIONS_MAP
} from "../../model/constants";
import {Instrument} from "../../model/enums/instrument";
import {RightHandLayout} from "../../model/enums/righthandlayout";
import {LeftHandLayout} from "../../model/enums/lefthandlayout";
import {HandType} from "../../model/enums/handtype";
import {Measure} from "../../model/measure";
import {Point} from "../../model/point";
import {Tune} from "../../model/tune";
import {LayoutOption} from "../../model/layoutoption";
import {Finger} from "../../model/finger";

@Component({
  selector: 'fingering-dialog',
  templateUrl: './fingering.dialog.html'
})
export class FingeringDialog extends AnyDialog {

  fromValue = "";
  toValue = "";
  insertValue = "";

  selectedLayout!: string;
  layoutOptions!: LayoutOption[];

  fingerings: Map<string, Measure[]> = new Map<string, Measure[]>();

  ngOnInit(): void {
    //for debugging
    // this.infoService.dialogsHandler.isShowFingeringDialog = true;
  }

  override onShow() {
    super.onShow();

    switch (this.infoService.settings.instrument) {
      case Instrument.PIANO: {
        this.layoutOptions = [
          {key: RightHandLayout.PIANO_RIGHT_HAND, value: "Piano Right Hand", hand: HandType.RIGHT_HAND},
          {key: LeftHandLayout.PIANO_LEFT_HAND, value: "Piano Left Hand", hand: HandType.LEFT_HAND}
        ];
        this.selectedLayout = this.getLayoutOptionByLayout(RightHandLayout.PIANO_RIGHT_HAND).value;
        break;
      }
      case Instrument.PIANO_ACCORDION: {
        this.layoutOptions = [{
          key: RightHandLayout.PIANO_RIGHT_HAND,
          value: PIANO_LAYOUT_OPTIONS_MAP.get(RightHandLayout.PIANO_RIGHT_HAND)!,
          hand: HandType.RIGHT_HAND
        }];
        this.layoutOptions = this.layoutOptions.concat(handArrayFromMap(LEFT_HAND_LAYOUT_OPTIONS_MAP, HandType.LEFT_HAND));
        this.selectedLayout = this.getLayoutOptionByLayout(RightHandLayout.PIANO_RIGHT_HAND).value;
        break;
      }
      case Instrument.BUTTON_ACCORDION:
      default: {
        this.layoutOptions = handArrayFromMap(RIGHT_HAND_LAYOUT_OPTIONS_MAP, HandType.RIGHT_HAND)
          .concat(handArrayFromMap(LEFT_HAND_LAYOUT_OPTIONS_MAP, HandType.LEFT_HAND));
        this.selectedLayout = this.getLayoutOptionByLayout(this.infoService.settings.rightHandLayout).value;
        break;
      }
    }

    //retrieving fingers from the tune, collecting them into measures (lines of text actually)
    for (let layout of this.layoutOptions) {
      let measures = [];
      let tune: Tune = this.tuneService.tuneModel.value.tune;
      for (let i = 0; i < tune.barOffsets.length; i++) {
        let measure = new Measure();
        measure.index = i + 1;
        let measurePoints: Point[] = this.getMeasurePoints(tune.points, i + 1);
        measure.fingers = this.getMeasureFingers(measurePoints, layout);
        measures.push(measure);
      }
      this.fingerings.set(layout.value, measures);
    }
  }

  onSave() {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    //iterating layouts
    for (let key of this.fingerings.keys()) {
      let layout = this.getLayoutByLabel(key);
      let measures: Measure[] = this.fingerings.get(key)!;
      //iterating measures
      for (let m = 0; m < measures.length; m++) {
        let measurePoints: Point[] = this.getMeasurePoints(tune.points, m + 1);
        if (/\d/.test(measures[m].fingers)) {//we only set fingers if there are numbers
          this.setFingersToPoints(layout, measures[m], measurePoints);
        }
      }
    }
    this.tuneService.saveFingering();
  }

  getLayoutOptionByLayout(layout: RightHandLayout): LayoutOption {
    for (let i = 0; i < this.layoutOptions.length; i++) {
      if (this.layoutOptions[i].key == layout) {
        return this.layoutOptions[i];
      }
    }
    return this.layoutOptions[0];
  }

  getLayoutByLabel(label: string): LayoutOption {
    for (let i = 0; i < this.layoutOptions.length; i++) {
      if (this.layoutOptions[i].value == label) {
        return this.layoutOptions[i];
      }
    }
    return this.layoutOptions[0];
  }

  override onHide() {
    super.onHide();
    this.layoutOptions = [];
    this.fingerings.clear();

  }

  onPaste() {
    let measures: Measure[] = this.fingerings.get(this.selectedLayout)!;
    let from = parseInt(this.fromValue) - 1;
    let to = parseInt(this.toValue) - 1;
    let insert = parseInt(this.insertValue) - 1;
    if (from < to) {
      let offset = 0;
      for (let i = from; i <= to; i++) {
        measures[insert + offset].fingers = measures[i].fingers;
        ++offset;
      }
    }
  }


  protected readonly window = window;

  private getMeasurePoints(allPoints: Point[], bar: number): Point[] {
    let points: Point[] = [];
    for (let i = 0; i < allPoints.length; i++) {
      let point = allPoints[i];
      if (point.notesOn != null && point.bar == bar) {
        points.push(allPoints[i]);
      }
    }
    return points;
  }

  private getMeasureFingers(measurePoints: Point[], layout: LayoutOption): string {
    let fingers = "";
    for (let i = 0; i < measurePoints.length; i++) {
      let point = measurePoints[i];
      for (let n = 0; n < point.notesOn.length; n++) {
        let note = point.notesOn[n];
        if (isNoteHandType(layout.hand, note.noteType)) {
          if (note.fingers != null && note.fingers.has(layout.key)) {
            let finger: Finger = note.fingers.get(layout.key)! as Finger;
            fingers += this.finger2string(finger);
          } else {
            fingers += FINGER_PLACEHOLDER;
          }
        }
      }
      fingers += ' ';
    }
    return fingers.replace(/\s+/g, " ").trim();
  }

  private finger2string(finger: Finger): string {
    return (finger.finger == undefined ? FINGER_PLACEHOLDER : finger.finger)
      + (finger.button == undefined ? '' : ('[' + finger.button + ']'));
  }

  private setFingersToPoints(layoutOption: LayoutOption, measure: Measure, measurePoints: Point[]) {
    let measureFingers = this.readMeasureFingers(measure.fingers);
    let index = 0;
    for (let i = 0; i < measurePoints.length; i++) {
      let point = measurePoints[i];
      for (let n = 0; n < point.notesOn.length; n++) {
        let note = point.notesOn[n];
        if (isNoteHandType(layoutOption.hand, note.noteType)) {
          note.fingers = note.fingers == null ? new Map<string, Finger> : note.fingers;
          note.fingers.set(layoutOption.key, measureFingers[index++]);
        }
      }
    }
  }

  private readMeasureFingers(measureText: string): Finger[] {
    let fingers: Finger[] = [];
    let tokens: string[] = this.tokenizeMeasureText(measureText);
    for (let i: number = 0; i < tokens.length; i++) {
      if (!this.isButton(tokens[i])) {
        let finger = new Finger();
        finger.finger = tokens[i];
        if (i < tokens.length - 1 && this.isButton((tokens[i + 1]))) {
          finger.button = parseInt(tokens[i + 1].replace("[", "").replace("]", ""));
        }
        fingers.push(finger);
      }
    }
    return fingers;
  }

  private isButton(token: string): boolean {
    return token.startsWith("[");
  }

  private tokenizeMeasureText(measureText: string): string[] {
    let tokens: string[] = [];
    let splits: string[] = measureText.split(/[\[\]]/);
    let isButton = false;
    for (let i = 0; i < splits.length; i++) {
      let split = splits[i];
      if (split.trim().length == 0) {
        continue;
      }
      if (!isButton) {
        for (let j = 0; j < split.length; j++) {
          if (ALLOWED_FINGERS.indexOf(split[j]) >= 0) {
            tokens.push(split[j]);
          }
        }
      } else {
        tokens.push('[' + split + ']');
      }
      isButton = !isButton;
    }
    return tokens;
  }
}
