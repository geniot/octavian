import {Injectable, Injector} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CatalogueModel} from "../model/mds/cataloguemodel";
import {plainToClass} from "class-transformer";
import {InfoService} from "./infoservice";
import {messages} from "../environments/messages";
import {Instrument} from "../model/enums/instrument";
import {Tune} from "../model/tune";
import {compareTunesFunc} from "../model/constants";
import {AnyService} from "./anyservice";


@Injectable({providedIn: 'root'})
export class CatalogueService extends AnyService {
  catalogueModel: BehaviorSubject<CatalogueModel> = new BehaviorSubject<CatalogueModel>(new CatalogueModel());

  constructor(public http: HttpClient,
              private injector: Injector) {
    super();
  }

  loadCatalogue(): void {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const instrument: Instrument = infoService.settings.instrument;
    this.catalogueModel.value.requestedTunes = new Map();
    infoService.loadingProgressMessage.next(messages.message_loading_catalogue);
    this.isLoading = true;
    this.http.get<CatalogueModel>(this.baseApiUrl + '/catalogue/' + instrument + '/' + infoService.settings.level
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(CatalogueModel, model);
          model.requestedTunes = new Map([...model.requestedTunes.entries()].sort(compareTunesFunc));
          this.catalogueModel.next(model);
        },
        error => {
          this.isLoading = false;
          this.catalogueModel.value.message = error.message;
          this.catalogueModel.value.hasError = true;
          this.catalogueModel.next(this.catalogueModel.value);
        });
  }

  getPrevTune(tune: Tune): Tune | null {
    for (let [key, value] of this.catalogueModel.value.requestedTunes) {
      if (value.levelNum == tune.levelNum
        && value.positionNum == tune.positionNum - 1) {
        return value;
      }
    }
    return null;
  }

  setCreditsToTune(credits: number, tuneId: number) {
    this.catalogueModel.value.requestedTunes.get(tuneId.toString())!.credits = credits;
  }
}
