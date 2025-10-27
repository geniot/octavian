import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ButtonKeyboardComponent} from "../buttonkeyboard/button-keyboard.component";
import {InfoService} from "../../services/infoservice";
import {PIANO_LAYOUT} from "../../model/layouts";
import {ACCORDION_KEYBOARD_PADDING, PIANO_BLACK_KEYS_WIDTH_RATIO, PIANO_HEIGHT_RATIO} from "../../model/constants";

@Component({
  selector: 'app-piano-keyboard',
  template: '<div #containerDiv id="{{containerId}}" (onResize)="onResized($event)" style="padding:0;border: 0 solid red;height:100%;width:100%;overflow: hidden;"></div>',
  styleUrls: ['./piano-keyboard.component.css']
})
export class PianoKeyboardComponent extends ButtonKeyboardComponent implements OnInit, AfterViewInit {
  keyboardWidth!: number;
  keyboardHeight!: number;

  constructor(public override infoService: InfoService) {
    super(infoService);

  }

  ngOnInit() {
    if (this.fingeringComponent != null) {
      this.fingeringComponent.pianoButtonKeyboardComponent = this;
    }
  }

  override ngAfterViewInit(): void {
    this.layout = PIANO_LAYOUT;
    this.addHandlers();
    this.reload();
    this.infoService.playerInitTrigger.next(true);
  }

  override reload(): void {
    this.reloadLayers();
    this.removeAll();
    this.noteToPianoKeyMap.clear();
    this.updatePianoKeys();
  }

  override updatePianoKeys(): void {
    this.keyboardWidth = this.containerDiv.nativeElement.getBoundingClientRect().width - ACCORDION_KEYBOARD_PADDING;
    this.keyboardHeight = this.keyboardWidth / PIANO_HEIGHT_RATIO;

    if (this.keyboardHeight > this.stage.height() - ACCORDION_KEYBOARD_PADDING / 10) {
      this.keyboardHeight = this.stage.height() - ACCORDION_KEYBOARD_PADDING / 10;
      this.keyboardWidth = this.keyboardHeight * PIANO_HEIGHT_RATIO;
    }

    let offsetX = Math.abs(this.keyboardWidth - window.innerWidth) / 2;
    let offsetY = (this.stage.height() - this.keyboardHeight) / 2;

    let whiteKeyWidth: number = (window.innerWidth - offsetX * 2) / 52;

    for (let key of this.layout.keys) {

      let newX: number = offsetX + key.x * (whiteKeyWidth / 2);
      let newY: number = offsetY;
      let newHeight: number = this.keyboardHeight * (key.c == 0 ? 1 : PIANO_BLACK_KEYS_WIDTH_RATIO);
      let newWidth: number = whiteKeyWidth / (key.c == 0 ? 1 : 2);

      this.addPianoKey(key.v, newX, newY, newHeight, newWidth, key.c, this.layout.instrument);
    }
  }

  public override onResized(event: any) {
    this.stage.width(this.containerDiv.nativeElement.getBoundingClientRect().width);
    this.stage.height(this.containerDiv.nativeElement.getBoundingClientRect().height);
    this.reload();
  }

}
