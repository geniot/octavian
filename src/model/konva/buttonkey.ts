import Konva from "konva";
import {Key} from "./key";
import {Note} from "../note";
import {InfoService} from "../../services/infoservice";
import {HandType} from "../enums/handtype";
import {Finger} from "../finger";
import {FINGER_PLACEHOLDER, getNoteFinger} from "../constants";
import {ButtonKeyboardComponent} from "../../app/buttonkeyboard/button-keyboard.component";
import {PlayerMode} from "../enums/playermode";

export class ButtonKey extends Key {
  overlayCircle!: Konva.Circle;

  constructor(public buttonKeyBoard: ButtonKeyboardComponent,
              public override config: any,
              public override handType: HandType,
              public override infoService: InfoService) {

    super(config, infoService, handType);
    this.x(config.x);
    this.y(config.y);

    this.keyShape = new Konva.Circle(config);
    this.keyShape.x(0);
    this.keyShape.y(0);
    this.add(this.keyShape);

    this.inputContourShape = new Konva.Circle(config);
    this.inputContourShape.x(0);
    this.inputContourShape.y(0);
    this.initContourShape();
    this.add(this.inputContourShape);


    this.finger = new Konva.Text();
    this.finger.x(0);
    this.finger.y(0);
    this.finger.fontSize(12);
    this.finger.fontFamily('Calibri');

    if (this.infoService.settings.showNoteNamesOnKeys || this.infoService.settings.showKeyNumbersOnKeys) {
      this.showNoteName();
    }

    this.add(this.finger);

    if (infoService.settings.mode == PlayerMode.FINGERING) {
      this.overlayCircle = new Konva.Circle(config);
      this.overlayCircle.x(0);
      this.overlayCircle.y(0);
      this.overlayCircle.opacity(0);
      this.add(this.overlayCircle);
      let _this = this;
      this.overlayCircle.on('mousedown', function () {
        if (_this.isTunePressed) {
          _this.infoService.fingerInputKey.next(_this);
        }
      });

      this.overlayCircle.on('mouseenter', function () {
        if (_this.isTunePressed) {
          buttonKeyBoard.stage.container().style.cursor = 'pointer';
        }
      });

      this.overlayCircle.on('mouseleave', function () {
        buttonKeyBoard.stage.container().style.cursor = 'default';
      });
    }
  }

  pressTune(note: Note) {
    this.isTunePressed = true;
    this.showNoteName();

    let finger: Finger = getNoteFinger(note, this.infoService, this.handType, this.infoService.settings.rightHandLayout, this.infoService.settings.leftHandLayout)!;
    if (finger != null && finger.finger != null && finger.finger != FINGER_PLACEHOLDER) {
      if (this.infoService.settings.mode == PlayerMode.FINGERING) {
        if (this.isActive) {
          this.setFinger(finger.finger);
        }
      } else {
        this.setFinger(finger.finger);
      }
    }

    this.fillShapeColor();
  }

  setFinger(value: string): void {
    // this.finger.fill('black');
    if (value != FINGER_PLACEHOLDER) {
      this.finger.text(value);
      this.finger.x(-this.finger.width() / 2);
      this.finger.y(-this.finger.height() / 2);
      this.finger.visible(true);
    }
  }

  releaseTune() {
    this.isTunePressed = false;

    if (this.infoService.settings.showNoteNamesOnKeys || this.infoService.settings.showKeyNumbersOnKeys) {
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

  showNoteName(): void {
    this.keyCounter = this.config.keyCounter;
    this.finger.fill(this.config.fill == 'black' ? 'white' : 'black');
    let keyName: string = this.infoService.settings.showKeyNumbersOnKeys ? String(this.config.keyCounter) : String(this.config.keyName);
    this.finger.text(keyName);
    // this.finger.fontSize(keyName.length > 2 ? 8 : 12);

    this.finger.x(-this.finger.width() / 2);
    this.finger.y(-this.finger.height() / 2);
    this.finger.visible(true);
  }

  update(keyConfig: any): any {
    this.keyShape.x(keyConfig.x);
    this.keyShape.y(keyConfig.y);
    this.opacity(keyConfig.opacity);
    (this.keyShape as Konva.Circle).radius(keyConfig.radius);
  }
}
