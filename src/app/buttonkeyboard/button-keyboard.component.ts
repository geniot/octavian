import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {InfoService} from "../../services/infoservice";
import {
  ACCORDION_KEYBOARD_PADDING,
  getAccordionKeyNameByValue,
  getKeyNameByValue,
  getNoteFinger,
  getPianoKeyNameByValue,
  isRight,
  PIANO_ACCORDION_WIDTH_RATIO,
  PIANO_BLACK_KEYS_WIDTH_RATIO,
  SELECTION_AREA_FILL,
  selectLayout
} from "../../model/constants";
import {Note} from "../../model/note";
import {ButtonKey} from "../../model/konva/buttonkey";
import Konva from "konva";
import {LayoutButtonGroup} from "../../model/konva/layoutbuttongroup";
import {HandType} from "../../model/enums/handtype";
import {Instrument} from "../../model/enums/instrument";
import {ViewMode} from "../../model/enums/viewmode";
import {PianoKey} from "../../model/konva/pianokey";
import {Key} from "../../model/konva/key";
import {Finger} from "../../model/finger";
import {DestroyableComponent} from "../../model/destroyablecomponent";
import {FingeringComponent} from "../fingering/fingering.component";
import {PlayerMode} from "../../model/enums/playermode";

@Component({
  selector: 'app-button-keyboard',
  templateUrl: './button-keyboard.component.html',
  styleUrls: ['./button-keyboard.component.css']
})
export class ButtonKeyboardComponent extends DestroyableComponent implements AfterViewInit {


  @Input() containerId!: string;
  @Input() handType!: HandType;
  @Input() fingeringComponent!: FingeringComponent;

  @ViewChild('containerDiv') containerDiv!: ElementRef;

  stage!: Konva.Stage;
  keysLayer!: Konva.Layer;
  backgroundLayer!: Konva.Layer;
  layoutButtonGroup!: LayoutButtonGroup;
  bassesHighlighter!: Konva.Shape;
  noteToButtonKeysMap: Map<string, Map<number, ButtonKey>> = new Map();
  noteToPianoKeyMap: Map<string, Key> = new Map();
  layout: any;
  //used for guessing next left hand key when it's not set (proximity-based)
  lastLeftHandButtonKey!: ButtonKey;

  debugRect!: Konva.Rect;

  constructor(public infoService: InfoService) {
    super();
  }

  ngAfterViewInit(): void {
    this.reload();
    this.addHandlers();
    this.infoService.playerInitTrigger.next(true);
  }

  addHandlers(): void {
    let _this = this;
    this.subscriptions.push(this.infoService.rightNoteOn.asObservable().subscribe(
      note => {
        if (note.noteValue > -1 && this.infoService.settings.instrument == Instrument.PIANO || isRight(this.handType, this.infoService.settings.viewMode)) {
          _this.onRightKey(note, true);
        }
      }));
    this.subscriptions.push(this.infoService.rightNoteOff.asObservable().subscribe(
      note => {
        if (note.noteValue > -1 && this.infoService.settings.instrument == Instrument.PIANO || isRight(this.handType, this.infoService.settings.viewMode)) {
          _this.onRightKey(note, false);
        }
      }));

    this.subscriptions.push(this.infoService.leftNoteOn.asObservable().subscribe(
      note => {
        if (note.noteValue > -1 && this.infoService.settings.instrument == Instrument.PIANO || !isRight(this.handType, this.infoService.settings.viewMode)) {
          _this.onLeftKey(note, true);
        }
      }));
    this.subscriptions.push(this.infoService.leftNoteOff.asObservable().subscribe(
      note => {
        if (note.noteValue > -1 && this.infoService.settings.instrument == Instrument.PIANO || !isRight(this.handType, this.infoService.settings.viewMode)) {
          _this.onLeftKey(note, false);
        }
      }));
    this.subscriptions.push(this.infoService.leftChordOn.asObservable().subscribe(
      note => {
        if (note.chordName != null && !isRight(this.handType, this.infoService.settings.viewMode)) {
          _this.onChord(note, true);
        }
      }));
    this.subscriptions.push(this.infoService.leftChordOff.asObservable().subscribe(
      note => {
        if (note.chordName != null && !isRight(this.handType, this.infoService.settings.viewMode)) {
          _this.onChord(note, false);
        }
      }));
    this.subscriptions.push(this.infoService.pianoNoteOn.asObservable().subscribe(
      note => {
        if (note.noteValue > -1) {
          _this.onPianoKey(note, true);
        }
      }));
    this.subscriptions.push(this.infoService.pianoNoteOff.asObservable().subscribe(
      note => {
        if (note.noteValue > -1) {
          _this.onPianoKey(note, false);
        }
      }));


    this.subscriptions.push(this.infoService.pausedTrigger.asObservable().subscribe(
      pausedTrigger => {
        this.unsetAll(true, true);
      }));

    this.subscriptions.push(this.infoService.unsetKeysTrigger.asObservable().subscribe(
      unsetAllKeysTrigger => {
        this.unsetAll(true, true);
      }));

    this.subscriptions.push(this.infoService.unsetTuneKeysTrigger.asObservable().subscribe(
      unsetAllKeysTrigger => {
        this.unsetAll(false, true);
      }));

    let reloadHandler = (trigger: Boolean) => {
      if (trigger.valueOf()) {
        this.reload();
      }
    }

    this.subscriptions.push(this.infoService.settingsChangedTrigger.asObservable().subscribe(reloadHandler));
    this.subscriptions.push(this.infoService.leftHandLayoutChangedTrigger.asObservable().subscribe(reloadHandler));
    this.subscriptions.push(this.infoService.rightHandLayoutChangedTrigger.asObservable().subscribe(reloadHandler));
    this.subscriptions.push(this.infoService.handChangedTrigger.asObservable().subscribe(reloadHandler));
  }

  reload(): void {

    this.layout = selectLayout(
      this.handType,
      this.infoService.settings.viewMode,
      this.infoService.settings.rightHandLayout,
      this.infoService.settings.leftHandLayout,
      this.infoService.settings.instrument
    );

    this.reloadLayers();

    this.removeAll();
    this.noteToButtonKeysMap.clear();
    this.noteToPianoKeyMap.clear();

    if (this.layoutButtonGroup != null) {
      this.layoutButtonGroup.remove();
    }

    if (this.bassesHighlighter != null) {
      this.bassesHighlighter.remove();
    }

    let isKeyboardRight: boolean = isRight(this.handType, this.infoService.settings.viewMode);
    if (this.infoService.settings.instrument == Instrument.BUTTON_ACCORDION || !isKeyboardRight) {
      this.updateButtonKeys();
      this.layoutButtonGroup = new LayoutButtonGroup(
        this,
        this.infoService,
        isKeyboardRight ? HandType.RIGHT_HAND : HandType.LEFT_HAND,
        this.infoService.settings.viewMode
      );

      this.keysLayer.add(this.layoutButtonGroup);
    } else {
      this.updatePianoKeys();
    }
  }

  reloadLayers(): void {
    if (this.stage == null) {
      this.stage = new Konva.Stage({
        container: this.containerId,
        width: this.containerDiv.nativeElement.getBoundingClientRect().width,
        height: this.containerDiv.nativeElement.getBoundingClientRect().height
      });
    }
    if (this.backgroundLayer == null) {
      this.backgroundLayer = new Konva.Layer();
      this.stage.add(this.backgroundLayer);
    }
    if (this.keysLayer == null) {
      this.keysLayer = new Konva.Layer();
      this.stage.add(this.keysLayer);
    }
  }

  unsetAll(isUser: boolean, isTune: boolean): void {
    for (let mapKey of this.noteToButtonKeysMap.keys()) {
      let map: Map<number, ButtonKey> = this.noteToButtonKeysMap.get(String(mapKey))!;
      if (map != null) {
        for (let key of map.values()) {
          if (isUser) {
            key.releaseUser();
          }
          if (isTune) {
            key.releaseTune();
          }
          key.isInput = false;
          key.fillShapeColor();
        }
      }
    }
    for (let mapKey of this.noteToPianoKeyMap.keys()) {
      let key: Key = this.noteToPianoKeyMap.get(String(mapKey))!;
      if (key != null) {
        if (isUser) {
          key.releaseUser();
        }
        if (isTune) {
          key.releaseTune();
        }
        key.isInput = false;
        key.fillShapeColor();
      }
    }
  }

  removeAll(): void {
    for (let mapKey of this.noteToButtonKeysMap.keys()) {
      let map: Map<number, ButtonKey> = this.noteToButtonKeysMap.get(String(mapKey))!;
      if (map != null) {
        for (let key of map.values()) {
          key.remove();
        }
      }
    }
    for (let mapKey of this.noteToPianoKeyMap.keys()) {
      let pianoKey: Key = this.noteToPianoKeyMap.get(String(mapKey))!;
      if (pianoKey != null) {
        pianoKey.remove();
      }
    }
  }

  onRightKey(note: Note, isOn: boolean): void {
    let instrument: Instrument = this.infoService.settings.instrument;
    let finger: Finger = getNoteFinger(note, this.infoService, HandType.RIGHT_HAND, this.infoService.settings.rightHandLayout, this.infoService.settings.leftHandLayout)!;

    if (instrument == Instrument.BUTTON_ACCORDION) {
      let map: Map<number, ButtonKey> = this.getButtonKeysMap(note);
      if (map != null) {
        if (note.isTune) {
          if (this.infoService.settings.mode == PlayerMode.FINGERING) {//fingering
            this.processFingering(map, finger, note, isOn, false);
          } else {//player
            if (isOn) {
              if (finger != null) {
                let key: Key = map.get(Number(finger.button))!;
                if (key != null) {
                  key.process(note, isOn);
                } else {
                  let buttonKey: Key | null = this.findInMap(map, 0, 54);
                  buttonKey!.process(note, isOn);
                }
              } else {
                let buttonKey: Key | null = this.findInMap(map, 0, 54);
                buttonKey!.process(note, isOn);
              }
            } else {
              this.processAll(map, note, isOn);
            }
          }
        } else {//user
          this.processAll(map, note, isOn);
        }
      }
    } else if (instrument == Instrument.PIANO_ACCORDION) {
      let pianoKey: Key = this.noteToPianoKeyMap.get(String(note.noteValue))!;
      if (pianoKey != null) {
        pianoKey.isActive = true;
        pianoKey.process(note, isOn);
      }
    }
  }

  onLeftKey(note: Note, isOn: boolean): void {
    let finger: Finger = getNoteFinger(note, this.infoService, HandType.LEFT_HAND, this.infoService.settings.rightHandLayout, this.infoService.settings.leftHandLayout)!;
    let map: Map<number, ButtonKey> = this.getButtonKeysMap(note);
    if (map != null) {
      if (note.isTune) {
        if (this.infoService.settings.mode == PlayerMode.FINGERING) {//fingering
          this.processFingering(map, finger, note, isOn, true);
        } else {//player
          if (isOn) {
            if (finger != null) {
              let key: Key = map.get(Number(finger.button))!;
              if (key != null) {
                key.process(note, isOn);
              } else {
                this.processAll(map, note, isOn);
              }
            } else {
              let key: Key = this.guessLeftHandKey(map, note);
              key.process(note, isOn);
            }
          } else {
            this.processAll(map, note, isOn);
          }
        }
      } else {//user
        this.processAll(map, note, isOn);
      }
    }
  }

  onChord(note: Note, isOn: boolean): void {
    let finger: Finger = getNoteFinger(
      note,
      this.infoService,
      HandType.LEFT_HAND,
      this.infoService.settings.rightHandLayout,
      this.infoService.settings.leftHandLayout)!;

    let map: Map<number, ButtonKey> = this.getButtonKeysMap(note);
    if (map != null) {
      if (note.isTune) {
        if (this.infoService.settings.mode == PlayerMode.FINGERING) {//fingering
          this.processFingering(map, finger, note, isOn, true);
        } else {//player
          if (isOn) {
            if (finger != null) {
              let key: Key = map.get(Number(finger.button))!;
              if (key != null) {
                key.process(note, isOn);
              } else {
                this.processAll(map, note, isOn);
              }
            } else {
              let key: Key = this.guessLeftHandKey(map, note);
              key.process(note, isOn);
            }
          } else {
            this.processAll(map, note, isOn);
          }
        }
      } else {//user
        this.processAll(map, note, isOn);
      }
    }
  }

  processFingering(map: Map<number, ButtonKey>, finger: Finger, note: Note, isOn: boolean, useGuessing: boolean): void {
    let activeKey: Key = this.detectActive(map, finger, note, useGuessing);
    for (let mapKey of map.keys()) {
      let key: Key = map.get(mapKey)!;
      key.isActive = key == activeKey;
      key.process(note, isOn);
    }
  }

  private detectActive(map: Map<number, ButtonKey>, finger: Finger, note: Note, useGuessing: boolean): Key {
    for (let mapKey of map.keys()) {
      let key: Key = map.get(mapKey)!;
      if (finger != null && finger.button != null) {
        if (finger.button == key.keyCounter) {
          return key;
        }
      } else if (useGuessing) {
        let guessedKey: Key = this.guessLeftHandKey(map, note);
        if (guessedKey.keyCounter == key.keyCounter) {
          return guessedKey;
        }
      }
    }
    for (let mapKey of map.keys()) {
      let key: Key = map.get(mapKey)!;
      if (mapKey >= 0 && mapKey <= 54) {
        return key;
      }
    }
    return map.get(Array.from(map.keys())[0])!;
  }

  private guessLeftHandKey(map: Map<number, ButtonKey>, note: Note): ButtonKey {
    let keys: Array<number> = Array.from(map.keys());
    if (this.lastLeftHandButtonKey == null) {
      switch (keys.length) {
        case 1: {
          this.lastLeftHandButtonKey = map.get(keys[0])!;
          break;
        }
        case 2:
        case 3: {
          this.lastLeftHandButtonKey = map.get(keys[1])!;
          break;
        }
        case 4: {
          this.lastLeftHandButtonKey = map.get(keys[2])!;
          break;
        }
        default: {
          this.lastLeftHandButtonKey = map.get(keys[Math.floor(keys.length / 2)])!;
          break;
        }
      }
    } else {
      let minDiff = Number.MAX_VALUE;
      let closestKey: ButtonKey = map.get(keys[0])!;
      for (let key of keys) {
        let buttonKey: ButtonKey = map.get(key)!;
        let diff = Math.abs(buttonKey.x() - this.lastLeftHandButtonKey.x()) +
          Math.abs(buttonKey.y() - this.lastLeftHandButtonKey.y()) / 2;//horizontal distance is more important than vertical
        if (diff < minDiff) {
          minDiff = diff;
          closestKey = buttonKey;
        }
      }
      this.lastLeftHandButtonKey = closestKey;
    }
    return this.lastLeftHandButtonKey;
  }

  processAll(map: Map<number, ButtonKey>,
             note: Note,
             isOn: boolean): void {
    for (let mapKey of map.keys()) {
      let key: Key = map.get(mapKey)!;
      key.process(note, isOn);
    }
  }

  findInMap(map: Map<number, ButtonKey>,
            buttonIndexFromInclusive: number,
            buttonIndexToInclusive: number): ButtonKey | null {
    for (let mapKey of map.keys()) {
      if (mapKey >= buttonIndexFromInclusive && mapKey <= buttonIndexToInclusive) {
        return map.get(mapKey)!;
      }
    }
    return null;
  }

  onPianoKey(note: Note, isOn: boolean): void {
    let pianoKey: Key = this.noteToPianoKeyMap.get(String(note.noteValue))!;
    if (pianoKey != null) {
      pianoKey.isActive = true;
      pianoKey.process(note, isOn);
    }
  }

  updatePianoKeys(): void {
    let width: number = this.containerDiv.nativeElement.getBoundingClientRect().width;
    let height: number = this.containerDiv.nativeElement.getBoundingClientRect().height;

    let keyboardWidth = width - ACCORDION_KEYBOARD_PADDING;
    let keyboardHeight = height - ACCORDION_KEYBOARD_PADDING;

    if (keyboardWidth * PIANO_ACCORDION_WIDTH_RATIO > keyboardHeight) {
      keyboardWidth = keyboardHeight / PIANO_ACCORDION_WIDTH_RATIO;
    } else {
      keyboardHeight = keyboardWidth * PIANO_ACCORDION_WIDTH_RATIO;
    }

    let offsetX = (width - keyboardWidth) / 2;
    let offsetY = Math.abs(keyboardHeight - height) / 2;

    let whiteKeyHeight: number = (height - offsetY * 2) / 24;
    let whiteKeyWidth: number = keyboardWidth;

    for (let key of this.layout.keys) {

      let newX: number = offsetX;
      let newY: number = offsetY + key.y * (whiteKeyHeight / 2);
      let newHeight: number = whiteKeyHeight / (key.c == 0 ? 1 : 2);
      let newWidth: number = whiteKeyWidth * (key.c == 0 ? 1 : PIANO_BLACK_KEYS_WIDTH_RATIO);
      if (this.infoService.settings.viewMode == ViewMode.TEACHER_MODE && key.c == 1) {
        newX += whiteKeyWidth - newWidth;
      }

      this.addPianoKey(key.v, newX, newY, newHeight, newWidth, key.c, this.layout.instrument);
    }
  }

  addPianoKey(keyValue: number, newX: number, newY: number, newHeight: number, newWidth: number, color: number, instrument: Instrument): void {
    let pianoKey: Key = this.noteToPianoKeyMap.get(String(keyValue))!;
    let keyName: string = instrument == Instrument.PIANO_ACCORDION ? getAccordionKeyNameByValue(keyValue) : getPianoKeyNameByValue(keyValue);
    if (pianoKey == null) {
      let config: any = {
        x: newX,
        y: newY,
        height: newHeight,
        width: newWidth,
        fill: color == 0 ? 'white' : 'black',
        stroke: 'black',
        keyName: keyName,
        instrument: instrument,
        c: color
      };
      pianoKey = new PianoKey(this, config, this.infoService);
    } else {
      (pianoKey as PianoKey).update({x: newX, y: newY, height: newHeight, width: newWidth});
    }
    pianoKey.remove();
    this.keysLayer.add(pianoKey);
    this.noteToPianoKeyMap.set(String(keyValue), pianoKey);
  }

  updateButtonKeys(): void {
    let width: number = this.containerDiv.nativeElement.getBoundingClientRect().width;
    let height: number = this.containerDiv.nativeElement.getBoundingClientRect().height;

    let keyboardWidth: number = (height - ACCORDION_KEYBOARD_PADDING) / (this.layout.rows / this.layout.columns);
    keyboardWidth = keyboardWidth > width - ACCORDION_KEYBOARD_PADDING ? width - ACCORDION_KEYBOARD_PADDING : keyboardWidth;
    let cellWidthHeight: number = (keyboardWidth / this.layout.columns) * this.layout.cellFactor;
    let keyboardHeight: number = cellWidthHeight * this.layout.rows + this.layout.columns * cellWidthHeight / this.layout.verticalSkewFactor;
    keyboardHeight = keyboardHeight > height ? height : keyboardHeight;

    let radius: number = (cellWidthHeight / 2 - cellWidthHeight / 10) * this.layout.radiusFactor;
    radius = radius < 0 ? 0 : radius;
    let offsetX: number = (cellWidthHeight / 2 + (width - keyboardWidth) / 2) * this.layout.offsetXFactor;
    let offsetY: number = Math.abs(height - keyboardHeight) / 2 + (cellWidthHeight / 4) * this.layout.offsetYFactor;
    // console.log(keyboardHeight + ":" + height + ":" + Math.abs(height - keyboardHeight) / 2);

    let actualHandType: HandType = isRight(this.handType, this.infoService.settings.viewMode) ? HandType.RIGHT_HAND : HandType.LEFT_HAND;

    let opacity: number;
    if (actualHandType == HandType.RIGHT_HAND) {
      opacity = this.infoService.settings.rightHand ? 1 : 0.5;
    } else {
      opacity = this.infoService.settings.leftHand ? 1 : 0.5;
    }

    let handType: HandType = !isRight(this.handType, this.infoService.settings.viewMode) ? HandType.LEFT_HAND : HandType.RIGHT_HAND;

    this.updateBassesHighlighter(offsetX, offsetY, cellWidthHeight);

    for (let keyCounter = 0; keyCounter < this.layout.keys.length; keyCounter++) {
      let keyDefinition = this.layout.keys[keyCounter];
      let verticalColumnOffset: number = keyDefinition.x * cellWidthHeight / this.layout.verticalSkewFactor;
      let keyName: string = getKeyNameByValue(keyDefinition.v, keyCounter, handType);

      let yOffset = offsetY + keyDefinition.y * cellWidthHeight + verticalColumnOffset;
      if (handType == HandType.RIGHT_HAND && this.infoService.settings.flipKeyboardsVertically) {
        yOffset = keyboardHeight - yOffset;
      }

      let keyConfig: any = {
        x: offsetX + keyDefinition.x * cellWidthHeight,
        y: yOffset,
        radius: radius,
        fill: keyDefinition.c == 0 ? 'white' : 'black',
        stroke: 'black',
        strokeWidth: 1,
        opacity: opacity,
        keyCounter: keyCounter,
        keyName: keyName
      };

      if (keyDefinition.m) {
        keyConfig.stroke = keyDefinition.c == 0 ? 'SlateGrey' : 'LightSlateGrey';
        keyConfig.strokeWidth = 6;
      }

      let map: Map<number, ButtonKey> = this.noteToButtonKeysMap.get(String(keyDefinition.v))!;
      if (map == null) {
        map = new Map<number, ButtonKey>();
      }
      let key: ButtonKey = map.get(keyCounter)!;
      if (key == null) {
        key = new ButtonKey(this, keyConfig, actualHandType, this.infoService);
        this.keysLayer.add(key);
      } else {
        key.update(keyConfig);
      }
      map.set(keyCounter, key);
      this.noteToButtonKeysMap.set(String(keyDefinition.v), map);
    }
  }

  updateBassesHighlighter(offsetX: number, offsetY: number, cellWidthHeight: number): void {
    if (this.bassesHighlighter != null) {
      this.bassesHighlighter.destroy();
    }
    if (this.layout.bassesHighlighterPoints != null) {
      let points = this.layout.bassesHighlighterPoints;

      let x1 = offsetX + cellWidthHeight * points[0] - cellWidthHeight / 2;
      let y1 = offsetY - cellWidthHeight * 0.6 + (points[0] * cellWidthHeight / this.layout.verticalSkewFactor) + cellWidthHeight * points[1];

      let x2 = offsetX + cellWidthHeight * points[2] - cellWidthHeight / 2;
      let y2 = offsetY - cellWidthHeight * 0.6 + (points[2] * cellWidthHeight / this.layout.verticalSkewFactor) + cellWidthHeight * points[3];

      let x3 = offsetX + cellWidthHeight * points[4] - cellWidthHeight / 2;
      let y3 = offsetY - cellWidthHeight * 0.4 + (points[2] * cellWidthHeight / this.layout.verticalSkewFactor) + cellWidthHeight * points[5];

      let x4 = offsetX + cellWidthHeight * points[6] - cellWidthHeight / 2;
      let y4 = offsetY - cellWidthHeight * 0.4 + (points[0] * cellWidthHeight / this.layout.verticalSkewFactor) + cellWidthHeight * points[7];

      this.bassesHighlighter = new Konva.Shape({
        fill: SELECTION_AREA_FILL,
        sceneFunc(context, shape) {
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.lineTo(x3, y3);
          context.lineTo(x4, y4);
          context.closePath();
          context.fillStrokeShape(shape);
        }
      });

      this.backgroundLayer.add(this.bassesHighlighter);
    }
  }

  public onResized(event: any) {
    this.stage.width(this.containerDiv.nativeElement.getBoundingClientRect().width);
    this.stage.height(this.containerDiv.nativeElement.getBoundingClientRect().height);
    this.reload();
    // this.updateDebug();
  }

  updateDebug(): void {
    if (this.debugRect == null) {
      this.debugRect = new Konva.Rect();
      this.backgroundLayer.add(this.debugRect);
    }
    let padding = 3;
    this.debugRect.stroke('blue');
    this.debugRect.x(padding);
    this.debugRect.y(padding);
    this.debugRect.width(this.containerDiv.nativeElement.getBoundingClientRect().width - padding * 2);
    this.debugRect.height(this.containerDiv.nativeElement.getBoundingClientRect().height - padding * 2);
  }

  getButtonKeysMap(note: Note): Map<number, ButtonKey> {
    let map: Map<number, ButtonKey> = this.noteToButtonKeysMap.get(String(note!.chordName == null ? note!.noteValue : note!.chordName))!;
    if (map == undefined) {
      map = this.noteToButtonKeysMap.get(String(note!.chordName == null ? note!.noteValue + 12 : note!.chordName))!;
    }
    if (map == undefined) {
      map = this.noteToButtonKeysMap.get(String(note!.chordName == null ? note!.noteValue + 24 : note!.chordName))!;
    }
    return map;
  }
}
