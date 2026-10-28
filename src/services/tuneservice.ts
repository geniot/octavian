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
import {AnyService} from "./anyservice";

@Injectable({providedIn: 'root'})
export class TuneService extends AnyService {
  tuneModel: BehaviorSubject<TuneModel> = new BehaviorSubject<TuneModel>(new TuneModel());
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
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const path = getParamValueQueryString("path") || "piano/greensleeves";
    const tag = path.substring(path.lastIndexOf('/') + 1);
    if (path.startsWith("piano")) {
      infoService.settings.instrument = Instrument.PIANO;
    } else if (path.startsWith("accordion-piano")) {
      infoService.settings.instrument = Instrument.PIANO_ACCORDION;
    } else {
      infoService.settings.instrument = Instrument.BUTTON_ACCORDION;
    }
    infoService.loadingProgressMessage.next(messages.message_loading_score);
    this.isLoading = true;

    this.tuneLoadedTrigger.next(false);
    this.http.get<TuneModel>(environment.BASE_API_URL + path + '/' + tag + '.json' + '?rnd=' + Date.now())
      .subscribe(model => {
        model = plainToClass(TuneModel, model);
        tunify(model);
        let _this = this;
        let onImagesLoadedHandler = function () {
          _this.tuneLoadedTrigger.next(true);
          _this.tuneModel.next(model);
          infoService.loadingProgressMessage.next(messages.message_loading_tune);
        }
        let total = Math.ceil(model.pngWidth / 30000);
        _this.imageObjs.clear();
        for (let i = 0; i < total; i++) {
          _this.loadImagePart(i, path, tag, total, onImagesLoadedHandler);
        }
      });
  }

  loadImagePart(part: number, path: string, tag: string, total: number, onLoadedHandler: Function): void {
    let _this = this;
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    let imageObj = new Image();
    imageObj.onload = function () {
      _this.imageObjs.set(part, imageObj);
      if (_this.imageObjs.size == total) {
        onLoadedHandler();
      }
    };
    imageObj.onerror = function () {
      console.log('Error loading image');
    };
    infoService.loadingProgressMessage.next(messages.message_loading_score);
    imageObj.src = environment.BASE_API_URL + path + '/' + tag + '_' + part + '.png' + '?rnd=' + Date.now();
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
