import {ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {InfoService} from "../../services/infoservice";
import {SplitLayoutHandler} from "../../model/splitlayouthandler";
import {DOCUMENT} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {getPianoHandByNoteType, setNoteFinger, soundPoint, unsetNoteFinger} from "../../model/constants";
import {LeftButtonKeyboardComponent} from "../buttonkeyboard/left-button-keyboard.component";
import {RightButtonKeyboardComponent} from "../buttonkeyboard/right-button-keyboard.component";
import {PianoKeyboardComponent} from "../pianokeyboard/piano-keyboard.component";
import {Key} from "../../model/konva/key";
import {HandType} from "../../model/enums/handtype";
import {Point} from "../../model/point";
import {Instrument} from "../../model/enums/instrument";
import {PlayerMode} from "../../model/enums/playermode";
import {CatalogueService} from "../../services/catalogueservice";
import {TuneService} from "../../services/tuneservice";
import {UserService} from "../../services/userservice";
import {StatsService} from "../../services/statsservice";
import {ConfirmationService} from "primeng/api";
import {UnlockService} from "../../services/unlockservice";
import {skip} from "rxjs/operators";
import {Role} from "../../model/enums/role";

@Component({
  selector: 'app-fingering',
  templateUrl: './fingering.component.html',
  styleUrls: ['./fingering.component.css']
})
export class FingeringComponent extends SplitLayoutHandler implements OnInit, OnDestroy {

  rightButtonKeyboardComponent!: RightButtonKeyboardComponent;
  leftButtonKeyboardComponent!: LeftButtonKeyboardComponent;
  pianoButtonKeyboardComponent!: PianoKeyboardComponent;

  constructor(@Inject(DOCUMENT) public override document: any,
              public override infoService: InfoService,
              public override tuneService: TuneService,
              public override catalogueService: CatalogueService,
              public override userService: UserService,
              public override statsService: StatsService,
              public override unlockService: UnlockService,
              public override sanitizer: DomSanitizer,
              public override cdr: ChangeDetectorRef,
              public override router: Router,
              public override confirmationService: ConfirmationService
  ) {

    super(document, infoService, tuneService, catalogueService, userService, statsService, unlockService, sanitizer, cdr, router, confirmationService);

    this.infoService.fingeringComponent = this;
    this.tuneService.tuneLoadedTrigger.next(false);
    this.infoService.isFingeringSaved = true;
    this.infoService.settings.routerUrl = this.router.url;

    this.infoService.settings.prevMode = this.infoService.settings.mode;
    this.infoService.settings.prevLeftHand = this.infoService.settings.leftHand;
    this.infoService.settings.prevRightHand = this.infoService.settings.rightHand;

    this.infoService.settings.mode = PlayerMode.FINGERING;
    this.infoService.settings.leftHand = true;
    this.infoService.settings.rightHand = true;

    this.tuneService.loadScore();//launches a chain of load actions
  }

  override ngOnInit() {
    super.ngOnInit();

    let _this = this;
    this.subscriptions.push(
      this.tuneService.fingeringSavedTrigger.asObservable().pipe(skip(1)).subscribe(
        fingeringSavedTrigger => {
          if (fingeringSavedTrigger.valueOf()) {
            _this.refreshButtons();
            _this.infoService.isFingeringSaved = true;
          }
        })
    );

    this.subscriptions.push(this.infoService.fingerInputKey.asObservable().subscribe(
      fingerInputKey => {
        this.setFingeringInputKey(fingerInputKey!);
      }));

    this.subscriptions.push(this.infoService.unsetKeysTrigger.asObservable().subscribe(
      unsetAllKeysTrigger => {
        let inputKeyObject: { handType: HandType, inputKey: Key } | null = this.getInputKey();
        if (inputKeyObject != null) {
          inputKeyObject.inputKey.isInput = false;
          inputKeyObject.inputKey.fillShapeColor();
        }
      }));
  }

  override ngOnDestroy() {
    this.infoService.settings.mode = this.infoService.settings.prevMode;
    this.infoService.settings.leftHand = this.infoService.settings.prevLeftHand;
    this.infoService.settings.rightHand = this.infoService.settings.prevRightHand;

    this.infoService.pausedTrigger.next(true);
    super.ngOnDestroy();
  }

  setFingeringInputKey(fingerInputKey: Key | null): void {
    let inputKeyObject: { handType: HandType, inputKey: Key } | null = this.getInputKey();
    if (inputKeyObject != null) {
      inputKeyObject.inputKey.isInput = false;
      inputKeyObject.inputKey.fillShapeColor();
    }

    if (fingerInputKey != null) {
      if (!fingerInputKey.isActive) {
        unsetNoteFinger(
          fingerInputKey.note!,
          fingerInputKey.handType,
          this.infoService.settings.instrument,
          this.infoService.settings.rightHandLayout,
          this.infoService.settings.leftHandLayout
        );
        setNoteFinger(
          fingerInputKey.note!,
          null,
          fingerInputKey.keyCounter,
          fingerInputKey.handType,
          this.infoService.settings.instrument,
          this.infoService.settings.rightHandLayout,
          this.infoService.settings.leftHandLayout);

        this.infoService.isFingeringSaved = false;
      }

      this.refreshButtons();
    }

    if (fingerInputKey != null) {
      fingerInputKey.isInput = true;
      fingerInputKey.fillShapeColor();
    }
  }

  private refreshButtons(): void {
    let points: Point[] = this.tuneService.tuneModel.value.tune.points;
    let thisPoint: Point = points[this.infoService.playerComponent.waitPointer];
    soundPoint(thisPoint, false, this.infoService, this.tuneService);
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  @HostListener('document:keydown.ArrowDown', ['$event'])
  handleArrowUpDownKeyboardEvent(event: KeyboardEvent) {
    if (!this.infoService.dialogsHandler.isAnyDialogOpen()) {
      let sortedMap: Map<number, Key> = new Map<number, Key>();
      switch (this.infoService.settings.instrument) {
        case Instrument.PIANO:
          sortedMap = this.collectActivePianoKeys(this.pianoButtonKeyboardComponent.noteToPianoKeyMap, sortedMap);
          break;
        case Instrument.BUTTON_ACCORDION:
          sortedMap = this.collectActiveKeys(this.rightButtonKeyboardComponent.noteToButtonKeysMap, sortedMap);
          sortedMap = this.collectActiveKeys(this.leftButtonKeyboardComponent.noteToButtonKeysMap, sortedMap);
          break;
        case Instrument.PIANO_ACCORDION:
          sortedMap = this.collectActivePianoKeys(this.rightButtonKeyboardComponent.noteToPianoKeyMap, sortedMap);
          sortedMap = this.collectActiveKeys(this.leftButtonKeyboardComponent.noteToButtonKeysMap, sortedMap);
          break;
      }
      let arr: Array<Key> = Array.from(sortedMap.values());
      if (arr.length > 1) {
        for (let i = 0; i < arr.length; i++) {
          let key: Key = arr[i];
          if (key.isInput) {
            let nextIndex: number = event.key == 'ArrowUp' ? i - 1 : i + 1;
            if (nextIndex < 0) {
              nextIndex = arr.length - 1;
            }
            if (nextIndex > arr.length - 1) {
              nextIndex = 0;
            }
            let nextKey: Key = arr[nextIndex];
            key.isInput = false;
            nextKey.isInput = true;
            key.fillShapeColor();
            nextKey.fillShapeColor();
            break;
          }
        }
      }
    }
  }

  @HostListener('document:keydown.1', ['$event'])
  @HostListener('document:keydown.2', ['$event'])
  @HostListener('document:keydown.3', ['$event'])
  @HostListener('document:keydown.4', ['$event'])
  @HostListener('document:keydown.5', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.infoService.dialogsHandler.isAnyDialogOpen()) {
      let inputKeyObject: { handType: HandType, inputKey: Key } | null = this.getInputKey();
      if (inputKeyObject != null) {
        setNoteFinger(
          inputKeyObject.inputKey.note!,
          event.key,
          inputKeyObject.inputKey.keyCounter,
          inputKeyObject.handType,
          this.infoService.settings.instrument,
          this.infoService.settings.rightHandLayout,
          this.infoService.settings.leftHandLayout);
        inputKeyObject.inputKey.setFinger(event.key);
        this.infoService.isFingeringSaved = false;
      }
    }
  }

  public initInput(): void {
    switch (this.infoService.settings.instrument) {
      case Instrument.PIANO: {
        this.initPianoInputKeyboard(this.pianoButtonKeyboardComponent.noteToPianoKeyMap);
        break;
      }
      case Instrument.BUTTON_ACCORDION: {
        let initResult: boolean = this.initInputKeyboard(this.rightButtonKeyboardComponent.noteToButtonKeysMap);
        if (!initResult) {
          this.initInputKeyboard(this.leftButtonKeyboardComponent.noteToButtonKeysMap);
        }
        break;
      }
      case Instrument.PIANO_ACCORDION: {
        let initResult: boolean = this.initPianoInputKeyboard(this.rightButtonKeyboardComponent.noteToPianoKeyMap);
        if (!initResult) {
          this.initInputKeyboard(this.leftButtonKeyboardComponent.noteToButtonKeysMap);
        }
        break;
      }
    }
  }

  private initInputKeyboard(keysMap: Map<string, Map<number, Key>>): boolean {
    let sortedMap: Map<number, Key> = new Map<number, Key>();
    sortedMap = this.collectActiveKeys(keysMap, sortedMap);
    for (let key of sortedMap.values()) {
      key.isInput = true;
      key.fillShapeColor();
      return true;
    }
    return false;
  }

  private initPianoInputKeyboard(keysMap: Map<string, Key>): boolean {
    for (let key of keysMap.values()) {
      if (key.isActive) {
        key.isInput = true;
        key.fillShapeColor();
        return true;
      }
    }
    return false;
  }

  private collectActiveKeys(keysMap: Map<string, Map<number, Key>>, collectionMap: Map<number, Key>): Map<number, Key> {
    for (let mapKey of keysMap.keys()) {
      let map: Map<number, Key> = keysMap.get(String(mapKey))!;
      if (map != null) {
        for (let key of map.values()) {
          if (key.isActive) {
            let mapKey: number = key.note?.noteValue == null ? key.keyCounter : key.note?.noteValue!;
            collectionMap.set(mapKey, key);
          }
        }
      }
    }
    return new Map([...collectionMap.entries()].sort());
  }

  private collectActivePianoKeys(keysMap: Map<string, Key>, collectionMap: Map<number, Key>): Map<number, Key> {
    for (let mapValue of keysMap.values()) {
      if (mapValue.isActive) {
        let mapKey: number = mapValue.note?.noteValue == null ? mapValue.keyCounter : mapValue.note?.noteValue!;
        collectionMap.set(mapKey, mapValue);
      }
    }
    return new Map([...collectionMap.entries()].sort());
  }

  private getInputKeyInt(keysMap: Map<string, Map<number, Key>>): Key | null {
    for (let mapKey of keysMap.keys()) {
      let map: Map<number, Key> = keysMap.get(String(mapKey))!;
      if (map != null) {
        for (let key of map.values()) {
          if (key.isInput) {
            return key;
          }
        }
      }
    }
    return null;
  }

  private getPianoInputKeyInt(keysMap: Map<string, Key>): Key | null {
    for (let mapKey of keysMap.values()) {
      if (mapKey.isInput) {
        return mapKey;
      }
    }
    return null;
  }

  private getInputKey(): { handType: HandType, inputKey: Key } | null {
    let instrument: Instrument = this.infoService.settings.instrument;
    switch (instrument) {
      case Instrument.PIANO: {
        if (this.pianoButtonKeyboardComponent == null) {
          return null;
        }
        let inputKey: Key | null = this.getPianoInputKeyInt(this.pianoButtonKeyboardComponent.noteToPianoKeyMap);
        if (inputKey == null) {
          return null;
        } else {
          return {handType: getPianoHandByNoteType(inputKey.note?.noteType!), inputKey: inputKey};
        }
      }
      case Instrument.BUTTON_ACCORDION:
      case Instrument.PIANO_ACCORDION:
      default: {
        if (this.rightButtonKeyboardComponent == null || this.leftButtonKeyboardComponent == null) {
          return null;
        }
        let handType: HandType = HandType.RIGHT_HAND;

        let inputKey: Key | null = instrument == Instrument.BUTTON_ACCORDION ?
          this.getInputKeyInt(this.rightButtonKeyboardComponent.noteToButtonKeysMap) :
          this.getPianoInputKeyInt(this.rightButtonKeyboardComponent.noteToPianoKeyMap);

        if (inputKey == null) {
          inputKey = this.getInputKeyInt(this.leftButtonKeyboardComponent.noteToButtonKeysMap);
          handType = HandType.LEFT_HAND;
        }
        if (inputKey == null) {
          return null;
        } else {
          return {handType: handType, inputKey: inputKey};
        }
      }
    }
  }

  getUserSrc(suffix: string) {
    return 'assets/user_' + (this.userService.isUserLoggedIn() ? 'on' : 'off') + suffix + '.png';
  }


  protected readonly Role = Role;
}
