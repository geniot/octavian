import {Note} from "../note";
import {DestroyableComponent} from "../destroyablecomponent";
import Konva from "konva";
import {InfoService} from "../../services/infoservice";
import {HandType} from "../enums/handtype";
import {PlayerMode} from "../enums/playermode";
import {NoteType} from "../enums/notetype";

export abstract class Key extends DestroyableComponent {
  keyShape!: Konva.Shape;
  inputContourShape!: Konva.Shape;
  isTunePressed: boolean = false;
  noteType: NoteType = NoteType.PIANO_NOTE;
  isUserPressed: boolean = false;
  isActive: boolean = false;
  isInput: boolean = false;
  origColor!: string;
  keyCounter!: number;
  finger!: Konva.Text;
  note!: Note | null;
  handType: HandType = HandType.ANY_HAND;

  protected constructor(public config: any, public infoService: InfoService, public ht: HandType) {
    super();
    this.origColor = config.fill;
    this.handType = ht;
  }

  abstract pressTune(note: Note): void;

  abstract releaseTune(): void;

  abstract setFinger(value: string): void;

  initContourShape(): void {
    this.inputContourShape.strokeWidth(6);
    this.inputContourShape.stroke('black');
    this.inputContourShape.fillEnabled(false);
    this.inputContourShape.visible(false);
  }

  pressUser(): void {
    this.isUserPressed = true;
    this.fillShapeColor();
  }

  releaseUser(): void {
    this.isUserPressed = false;
    this.fillShapeColor();
  }

  // releaseAll(): void {
  //   this.isTunePressed = false;
  //   this.isUserPressed = false;
  //   this.fillColor();
  // }

  process(note: Note, isOn: boolean): void {
    if (isOn) {
      if (note.isTune) {
        this.note = note;
        this.pressTune(note);
      } else {
        this.pressUser();
      }
    } else {
      if (note.isTune) {
        this.note = null;
        this.releaseTune();
      } else {
        this.releaseUser();
      }
    }
  }

  fillShapeColor(): void {
    if (this.isUserPressed) {
      this.keyShape.fill('green');
      this.finger.fill('white');
      return;
    }
    if (this.isTunePressed) {
      if (this.isInput) {
        this.inputContourShape.visible(true);
      } else {
        this.inputContourShape.visible(false);
      }
      if (this.infoService.settings.mode == PlayerMode.FINGERING) {
        this.keyShape.fill(this.isActive ? 'yellow' : 'pink');
      } else {
        this.keyShape.fill(this.noteType == NoteType.RIGHT_HAND_NOTE ? 'gold' : 'yellow');
      }
      this.finger.fill('black');
      return;
    }
    this.keyShape.fill(this.origColor);
    this.finger.fill(this.config.fill == 'black' ? 'white' : 'black');

  }
}
