import {Injectable, Injector} from "@angular/core";
import {environment} from "../environments/environment";
import {Instrument} from "../model/enums/instrument";
import {messages} from "../environments/messages";
import {instrument, Player} from "soundfont-player";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {InfoService} from "./infoservice";
import {TuneModel} from "../model/mds/tunemodel";
import {BehaviorSubject} from "rxjs";
import {ClientAction} from "../model/enums/clientaction";
import {INSTRUMENTS_ROUTES_MAP, tunify} from "../model/constants";
import {plainToClass} from "class-transformer";
import {UserService} from "./userservice";
import {XHeader} from "../model/enums/xheader";
import {Tune} from "../model/tune";
import {CatalogueService} from "./catalogueservice";
import {ScoreMetaModel} from "../model/mds/scoremetamodel";

@Injectable({providedIn: 'root'})
export class TuneService {
  readonly baseApiUrl = environment.BASE_API_URL;
  isLoading: boolean = false;
  tuneModel: BehaviorSubject<TuneModel> = new BehaviorSubject<TuneModel>(new TuneModel());
  scoreMetaModel: BehaviorSubject<ScoreMetaModel> = new BehaviorSubject<ScoreMetaModel>(new ScoreMetaModel());
  fingeringSavedTrigger: BehaviorSubject<boolean> = new BehaviorSubject(true);
  tuneLoadedTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectionRemovedTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  audioContext!: AudioContext;
  accordionPlayer!: Player;
  pianoPlayer!: Player;
  imageObjs = new Map<number, HTMLImageElement>();
  museFile!: FileList | null;
  coverFile!: FileList | null;
  audio: HTMLAudioElement = new Audio();
  playingTuneId!: number;

  constructor(public http: HttpClient,
              public router: Router,
              private injector: Injector,
              private activatedRoute: ActivatedRoute) {
  }

  loadTune(): void {
    this.tuneLoadedTrigger.next(false);
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const userService: UserService = this.injector.get<UserService>(UserService);
    let routerSplits: string[] = infoService.settings.routerUrl.split('/');
    let requestedTuneId: string = routerSplits[routerSplits.length - 1];
    this.http.get<TuneModel>(
      this.baseApiUrl + '/tune/' + requestedTuneId,
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)}
    )
      .subscribe(model => {
        this.tuneLoadedTrigger.next(true);
        model = plainToClass(TuneModel, model);
        tunify(model);
        this.tuneModel.next(model);
      });
  }

  deleteTune() {
    this.isLoading = true;
    const catalogueService: CatalogueService = this.injector.get<CatalogueService>(CatalogueService);
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const userService: UserService = this.injector.get<UserService>(UserService);
    this.http.delete<TuneModel>(
      this.baseApiUrl + '/tune/' + this.tuneModel.value.tune.id,
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)}
    )
      .subscribe(model => {
        this.isLoading = false;
        infoService.dialogsHandler.isShowDeleteDialog = false;
        catalogueService.loadCatalogue();
      });
  }

  saveTune(tune: Tune): void {
    this.isLoading = true;
    const userService: UserService = this.injector.get<UserService>(UserService);
    const catalogueService: CatalogueService = this.injector.get<CatalogueService>(CatalogueService);
    const formData: FormData = new FormData();
    if (this.museFile != null) {
      formData.append("muse", this.museFile[0], this.museFile[0].name);
    }
    if (this.coverFile != null) {
      formData.append("cover", this.coverFile[0], this.coverFile[0].name);
    }
    formData.append("tune", JSON.stringify(tune));
    this.http.post<TuneModel>(
      this.baseApiUrl + '/tune',
      formData,
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)}
    )
      .subscribe(model => {
        this.isLoading = false;
        model = plainToClass(TuneModel, model);
        if (!model.hasError) {
          catalogueService.loadCatalogue()
        }
        this.tuneModel.next(model);
      });
  }

  saveFingering(): void {
    this.isLoading = true;
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
    const userService: UserService = this.injector.get<UserService>(UserService);
    this.http.post<TuneModel>(
      this.baseApiUrl + '/tune/fingering/' + tuneService.tuneModel.value.tune.id,
      JSON.stringify(this.tuneModel.value, this.replacer, 2),
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)}
    )
      .subscribe(model => {
        this.isLoading = false;
        infoService.dialogsHandler.isShowFingeringDialog = false;
        this.fingeringSavedTrigger.next(true);
      });
  }

  replacer(key: any, value: any) {
    if (value instanceof Map) {
      const reducer = (obj: any, mapKey: any) => {
        obj[mapKey] = value.get(mapKey);
        return obj;
      };
      return [...value.keys()].sort().reduce(reducer, {});
    } else if (value instanceof Set) {
      return [...value].sort();
    }
    return value;
  }

  onFingering() {
    let id = this.tuneModel.value.tune.id;
    this.router.navigate(['/' + ClientAction.FINGERING, id], {state: {data: id}});
  }

  loadInstrument(onLoadedHandler: Function): void {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    let _this = this;
    if (infoService.settings.instrument == Instrument.BUTTON_ACCORDION
      || infoService.settings.instrument == Instrument.PIANO_ACCORDION) {
      if (this.accordionPlayer == null) {
        infoService.loadingProgressMessage.next(messages.message_loading_accordion_font);
        instrument(this.getAudioContext(), 'accordion', {
          nameToUrl: function (name: string, sf: string, format: string) {
            return 'assets/instruments/accordion-musyng-mp3.js';
          }
        }).then(function (accordion: Player) {
          _this.accordionPlayer = accordion;
          onLoadedHandler();
        });
      } else {
        onLoadedHandler();
      }
    } else {
      if (this.pianoPlayer == null) {
        infoService.loadingProgressMessage.next(messages.message_loading_piano_font);
        instrument(this.getAudioContext(), 'acoustic_grand_piano', {
          nameToUrl: function (name: string, sf: string, format: string) {
            return 'assets/instruments/acoustic_grand_piano-musyng-mp3.js';
          }
        }).then(function (piano: Player) {
          _this.pianoPlayer = piano;
          onLoadedHandler();
        });
      } else {
        onLoadedHandler();
      }
    }
  }

  /**
   * First loading meta, then parts
   */
  loadScore(): void {
    let _this = this;
    let scoreMetaModel = new ScoreMetaModel();

    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const userService: UserService = this.injector.get<UserService>(UserService);

    let routerSplits: string[] = infoService.settings.routerUrl.split('/');
    let requestedTuneId: string = routerSplits[routerSplits.length - 1];

    infoService.loadingProgressMessage.next(messages.message_loading_score);

    this.isLoading = true;
    this.http.get<ScoreMetaModel>(
      this.baseApiUrl + '/tune/score/meta/' + requestedTuneId,
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)}
    ).subscribe(model => {
        _this.isLoading = false;
        scoreMetaModel = plainToClass(ScoreMetaModel, model);
        _this.scoreMetaModel.next(scoreMetaModel);
        if (!scoreMetaModel.hasError) {
          _this.imageObjs.clear();
          for (let i = 0; i < scoreMetaModel.parts; i++) {
            _this.loadImagePart(i);
          }
        }
      },
      error => {
        this.router.navigate([INSTRUMENTS_ROUTES_MAP.get(infoService.settings.instrument)]);
      }
    );
  }

  loadImagePart(part: number): void {
    let _this = this;
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const userService: UserService = this.injector.get<UserService>(UserService);
    let routerSplits: string[] = infoService.settings.routerUrl.split('/');
    let requestedTuneId: string = routerSplits[routerSplits.length - 1];

    let imageObj = new Image();
    imageObj.onload = function () {
      _this.imageObjs.set(part, imageObj);
      if (_this.imageObjs.size == _this.scoreMetaModel.value.parts) {
        infoService.loadingProgressMessage.next(messages.message_loading_tune);
        _this.loadTune();
      }
    };
    imageObj.onerror = function () {
      _this.router.navigate([INSTRUMENTS_ROUTES_MAP.get(infoService.settings.instrument)]);
    };
    infoService.loadingProgressMessage.next(messages.message_loading_score);
    imageObj.src = environment.BASE_API_URL + "/tune/score/" + requestedTuneId +
      '?jwt=' + (userService.loginModel.value.jwt || '') +
      '&part=' + part +
      '&rnd=' + Date.now();
  }

  getAudioContext(): AudioContext {
    if (this.audioContext == null) {
      AudioContext = window.AudioContext || window.webkitAudioContext || false;
      this.audioContext = new AudioContext || new window.webkitAudioContext;
    }
    return this.audioContext;
  }

  getCurrentPlayer(): Player {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    if (infoService.settings.instrument == Instrument.PIANO) {
      return this.pianoPlayer;
    } else {
      return this.accordionPlayer;
    }
  }

  onAudioClick(tuneId: number) {
    if (tuneId != this.playingTuneId || this.audio.paused) {
      this.audio.pause();
      this.audio.volume = 0.05;
      this.audio.src = environment.BASE_API_URL + "/tune/audio/" + tuneId + "?rnd=" + Date.now();
      this.audio.load();
      this.playingTuneId = tuneId;
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
