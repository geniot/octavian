import {Injectable, Injector} from "@angular/core";

import {BehaviorSubject} from "rxjs";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {defaultize, ICONS_MAP, INSTRUMENTS_ROUTES_MAP} from "../model/constants";
import {Note} from "../model/note";
import {MidiHandler} from "../model/handlers/midihandler";
import {PlayerComponent} from "../app/player/player.component";
import {Router} from "@angular/router";
import {FullScreenHandler} from "../model/handlers/fullscreenhandler";
import {ChangeEvent} from "../model/changeevent";
import {plainToClass} from 'class-transformer';
import {Key} from "../model/konva/key";
import {FingeringComponent} from "../app/fingering/fingering.component";
import {DialogsHandler} from "../model/handlers/dialogshandler";
import {PlayerMode} from "../model/enums/playermode";
import {Settings} from "../model/settings";
import {TuneService} from "./tuneservice";
import {UserService} from "./userservice";
import {Icon} from "../model/enums/icon";

@Injectable({providedIn: 'root'})
export class InfoService {

  readonly baseApiUrl = environment.BASE_API_URL;
  readonly settingsLocalStorageName = 'octavian-settings';

  settings: Settings = new Settings();

  rightNoteOn: BehaviorSubject<Note> = new BehaviorSubject(new Note(-1));
  rightNoteOff: BehaviorSubject<Note> = new BehaviorSubject(new Note(-1));
  leftNoteOn: BehaviorSubject<Note> = new BehaviorSubject(new Note(-1));
  leftNoteOff: BehaviorSubject<Note> = new BehaviorSubject(new Note(-1));
  leftChordOn: BehaviorSubject<Note> = new BehaviorSubject(new Note(-1));
  leftChordOff: BehaviorSubject<Note> = new BehaviorSubject(new Note(-1));

  pianoNoteOn: BehaviorSubject<Note> = new BehaviorSubject(new Note(-1));
  pianoNoteOff: BehaviorSubject<Note> = new BehaviorSubject(new Note(-1));

  fingerInputKey: BehaviorSubject<Key | null> = new BehaviorSubject<Key | null>(null);
  controlPressed: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  pausedTrigger: BehaviorSubject<boolean> = new BehaviorSubject(true);
  connectedTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  waitModeTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  unsetKeysTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  unsetTuneKeysTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  handChangedTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);

  rightHandLayoutChangedTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  leftHandLayoutChangedTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  settingsChangedTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  playerInitTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  trashTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);

  loadingProgressMessage: BehaviorSubject<string> = new BehaviorSubject("");

  progressValue: BehaviorSubject<number> = new BehaviorSubject(0);
  sliderValue: BehaviorSubject<ChangeEvent> = new BehaviorSubject(new ChangeEvent(-1, null));
  sliderMax!: number;
  sliderMin!: number;


  midiHandler!: MidiHandler;
  fullScreenHandler: FullScreenHandler = new FullScreenHandler(this);
  dialogsHandler: DialogsHandler = new DialogsHandler(this);

  playerComponent!: PlayerComponent;
  fingeringComponent!: FingeringComponent;

  // isSending: boolean = false;
  isNewDialogState: boolean = true;
  isFingeringSaved: boolean = true;


  constructor(public http: HttpClient,
              public router: Router,
              private injector: Injector) {

    const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
    this.midiHandler = new MidiHandler(this, tuneService);

    if (localStorage.getItem(this.settingsLocalStorageName)) {
      try {
        let s: string = JSON.parse(<string>localStorage.getItem(this.settingsLocalStorageName));
        this.settings = plainToClass(Settings, s);
      } catch (e) {
        console.log("Couldn't parse local settings.");
      }
    }
    defaultize(this.settings);
  }

  saveSettings(): void {
    localStorage.setItem(this.settingsLocalStorageName, JSON.stringify(this.settings));
  }

  onHomeClick(): void {
    this.router.navigate([INSTRUMENTS_ROUTES_MAP.get(this.settings.instrument)]);
  }

  fastBackward(): void {
    this.progressValue.next(0);
    this.sliderValue.next(new ChangeEvent(this.sliderMin, this));
    this.onSlideEnd();
  }

  fastForward(): void {
    this.progressValue.next(0);
    this.sliderValue.next(new ChangeEvent(this.sliderMax, this));
    this.onSlideEnd();
  }

  gotoMeasure(measureIndex: number): void {
    if (measureIndex == 0) {
      this.fastBackward();
    } else {
      const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
      let measureOffset = tuneService.tuneModel.value.tune.barOffsets[measureIndex];
      this.gotoOffset(measureOffset);
    }
  }

  gotoOffset(offset: number): void {
    const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
    offset += tuneService.tuneModel.value.tune.playHeadWidth / 2;
    let measurePercent = offset * 100 / tuneService.tuneModel.value.tune.sheetWidth;
    this.progressValue.next(measurePercent);
    this.sliderValue.next(new ChangeEvent(offset, this));
    this.onSlideEnd();
  }

  onSlideEnd(): void {
    this.playerComponent!.updatePointer();
    this.unsetKeysTrigger.next(true);
    if (this.settings.mode == PlayerMode.WAIT) {
      this.playerComponent!.loopHandler.playLoop(false);
    }
  }

  onProfileClick() {
    const userService: UserService = this.injector.get<UserService>(UserService);
    if (userService.isUserLoggedIn()) {
      this.dialogsHandler.isShowUserProfileDialog = true;
    } else {
      this.dialogsHandler.isShowSignInDialog = true;
    }
  }

  onDragEnd(): void {
    this.progressValue.next(0);
    this.playerComponent!.updatePointer();
    this.unsetKeysTrigger.next(true);
    if (this.settings.mode == PlayerMode.WAIT || this.settings.mode == PlayerMode.FINGERING) {
      this.playerComponent!.loopHandler.playLoop(false);
    }
  }

  onLogoClick() {
    const userService: UserService = this.injector.get<UserService>(UserService);
    this.saveSettings();
    userService.saveModel();
    window.onbeforeunload = null;
    window.open("https://octavian.app", "_blank");
  }

  isIconsLoaded(): boolean {
    return ICONS_MAP.size == Object.keys(Icon).length;
  }
}
