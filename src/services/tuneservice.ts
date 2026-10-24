import {Injectable, Injector} from "@angular/core";
import {environment} from "../environments/environment";
import {Instrument} from "../model/enums/instrument";
import {messages} from "../environments/messages";
import {instrument, Player} from "soundfont-player";
import {HttpClient} from "@angular/common/http";
import {InfoService} from "./infoservice";
import {TuneModel} from "../model/mds/tunemodel";
import {BehaviorSubject} from "rxjs";
import {getParamValueQueryString, tunify} from "../model/constants";
import {plainToClass} from "class-transformer";
import {ScoreMetaModel} from "../model/mds/scoremetamodel";
import {AnyService} from "./anyservice";

@Injectable({providedIn: 'root'})
export class TuneService extends AnyService {
  tuneModel: BehaviorSubject<TuneModel> = new BehaviorSubject<TuneModel>(new TuneModel());
  scoreMetaModel: BehaviorSubject<ScoreMetaModel> = new BehaviorSubject<ScoreMetaModel>(new ScoreMetaModel());
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
              private injector: Injector) {
    super();
  }

  loadTune(instrument: string, tune: string): void {
    this.tuneLoadedTrigger.next(false);
    this.http.get<TuneModel>(environment.BASE_API_URL + instrument + '/' + tune + '/' + tune + '.json' + '?rnd=' + Date.now())
      .subscribe(model => {
        this.tuneLoadedTrigger.next(true);
        model = plainToClass(TuneModel, model);
        tunify(model);
        this.tuneModel.next(model);
      });
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
    const instrument = getParamValueQueryString("instrument") || "piano";
    const tune = getParamValueQueryString("tune") || "greensleeves";

    infoService.loadingProgressMessage.next(messages.message_loading_score);

    this.isLoading = true;
    this.http.get<ScoreMetaModel>(
      this.baseApiUrl + instrument + '/' + tune + "/meta.json"
    ).subscribe(model => {
        _this.isLoading = false;
        scoreMetaModel = plainToClass(ScoreMetaModel, model);
        _this.scoreMetaModel.next(scoreMetaModel);
        if (!scoreMetaModel.hasError) {
          _this.imageObjs.clear();
          for (let i = 0; i < scoreMetaModel.parts; i++) {
            _this.loadImagePart(i, instrument, tune);
          }
        }
      },
      error => {
        console.log(error);
        // this.router.navigate([INSTRUMENTS_ROUTES_MAP.get(infoService.settings.instrument)]);
      }
    );
  }

  loadImagePart(part: number, instrument: string, tune: string): void {
    let _this = this;
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    let imageObj = new Image();
    imageObj.onload = function () {
      _this.imageObjs.set(part, imageObj);
      if (_this.imageObjs.size == _this.scoreMetaModel.value.parts) {
        infoService.loadingProgressMessage.next(messages.message_loading_tune);
        _this.loadTune(instrument, tune);
      }
    };
    imageObj.onerror = function () {
      console.log('Error loading image');
      // _this.router.navigate([INSTRUMENTS_ROUTES_MAP.get(infoService.settings.instrument)]);
    };
    infoService.loadingProgressMessage.next(messages.message_loading_score);
    imageObj.src = environment.BASE_API_URL + instrument + '/' + tune + '/' + tune + '_' + part + '.png' + '?rnd=' + Date.now();
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
