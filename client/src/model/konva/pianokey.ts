import Konva from "konva";
import {Key} from "./key";
import {Note} from "../note";
import {InfoService} from "../../services/infoservice";
import {Instrument} from "../enums/instrument";
import {Finger} from "../finger";
import {FINGER_PLACEHOLDER, getNoteFinger} from "../constants";
import {HandType} from "../enums/handtype";
import {RightHandLayout} from "../enums/righthandlayout";
import {LeftHandLayout} from "../enums/lefthandlayout";
import {ViewMode} from "../enums/viewmode";
import {ButtonKeyboardComponent} from "../../app/buttonkeyboard/button-keyboard.component";
import {PlayerMode} from "../enums/playermode";

export class PianoKey extends Key {

  overlayRect!: Konva.Rect;

  constructor(public pianoKeyBoard: ButtonKeyboardComponent,
              public override config: any,
              public override infoService: InfoService) {

    super(config, infoService, HandType.ANY_HAND);

    this.keyShape = new Konva.Rect(config);
    this.add(this.keyShape);

    this.inputContourShape = new Konva.Rect(config);
    switch (this.infoService.settings.instrument) {
      case Instrument.PIANO:
        this.inputContourShape.y(config.y + config.height + 6);
        this.inputContourShape.height(6);
        break;
      case Instrument.PIANO_ACCORDION:
        this.inputContourShape.x(config.x + config.width + 6);
        this.inputContourShape.width(6);
        break;
    }
    this.initContourShape();
    this.add(this.inputContourShape);

    this.finger = new Konva.Text();
    this.finger.fontSize(12);
    this.finger.fontFamily('Calibri');

    this.showNoteName();

    this.add(this.finger);

    if (infoService.settings.mode == PlayerMode.FINGERING) {
      this.overlayRect = new Konva.Rect(config);
      this.overlayRect.opacity(0);
      this.add(this.overlayRect);
      let _this = this;
      this.overlayRect.on('mousedown', function () {
        if (_this.isTunePressed) {
          _this.infoService.fingerInputKey.next(_this);
        }
      });

      this.overlayRect.on('mouseenter', function () {
        if (_this.isTunePressed) {
          pianoKeyBoard.stage.container().style.cursor = 'pointer';
        }
      });

      this.overlayRect.on('mouseleave', function () {
        pianoKeyBoard.stage.container().style.cursor = 'default';
      });
    }
  }

  showNoteName(): void {
    this.keyCounter = this.config.keyCounter;
    this.finger.fill(this.config.fill == 'black' ? 'white' : 'black');
    let keyName: string = String(this.config.keyName);
    this.finger.text(keyName);
    this.centerXY();
    this.finger.visible(this.infoService.settings.showNoteNamesOnKeys);
  }

  private centerXY(): void {
    if (this.config.instrument == Instrument.PIANO_ACCORDION) {
      let padding: number = (this.keyShape.height() - this.finger.height()) / 2;
      if (this.infoService.settings.viewMode == ViewMode.MIRROR_MODE) {
        this.finger.x(this.keyShape.x() + this.keyShape.width() - this.finger.width() - padding);
      } else {
        this.finger.x(this.keyShape.x() + this.keyShape.height() / 3);
      }
      this.finger.y(this.keyShape.y() + this.keyShape.height() / 2 - this.finger.height() / 2);
    } else {//piano
      let padding: number = (this.keyShape.width() - this.finger.width()) / 2;
      this.finger.x(this.keyShape.x() + padding);
      this.finger.y(this.keyShape.y() + this.keyShape.height() - this.finger.height());
      if (this.config.c == 0) {
        this.finger.y(this.keyShape.y() + this.keyShape.height() - this.finger.height() * 2);
      }
    }
  }

  update(config: { x: number, y: number, width: number, height: number }) {
    this.keyShape.x(config.x);
    this.keyShape.y(config.y);
    this.keyShape.width(config.width);
    this.keyShape.height(config.height);
    this.showNoteName();
  }

  pressTune(note: Note) {
    this.isTunePressed = true;
    this.noteType = note.noteType;
    let finger: Finger = getNoteFinger(note, this.infoService, HandType.ANY_HAND, RightHandLayout.PIANO_RIGHT_HAND, LeftHandLayout.PIANO_LEFT_HAND)!;
    if (finger != null) {
      this.setFinger(finger.finger);
    }
    this.fillShapeColor();
  }

  setFinger(value: string): void {
    if (value != FINGER_PLACEHOLDER) {
      this.finger.text(value);
      this.centerXY();
      this.finger.visible(true);
    }
  }

  releaseTune() {
    this.isTunePressed = false;
    if (this.infoService.settings.showNoteNamesOnKeys) {
      this.showNoteName();
    } else {
      this.finger.visible(false);
    }
    if (this.infoService.settings.mode == PlayerMode.FINGERING) {
      this.isActive = false;
      this.isInput = false;
    }
    this.fillShapeColor();
  }
}
