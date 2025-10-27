import {Injectable, Injector} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../environments/environment";
import {CatalogueModel} from "../model/mds/cataloguemodel";
import {plainToClass} from "class-transformer";
import {InfoService} from "./infoservice";
import {messages} from "../environments/messages";
import {UserService} from "./userservice";
import {XHeader} from "../model/enums/xheader";
import {Instrument} from "../model/enums/instrument";
import {Tune} from "../model/tune";
import {compareTunesFunc} from "../model/constants";


@Injectable({providedIn: 'root'})
export class CatalogueService {
  readonly baseApiUrl = environment.BASE_API_URL;
  isLoading: boolean = true;//true by default to turn off all rendering while i18n is in place
  catalogueModel: BehaviorSubject<CatalogueModel> = new BehaviorSubject<CatalogueModel>(new CatalogueModel());

  constructor(public http: HttpClient,
              public router: Router,
              private injector: Injector,
              private activatedRoute: ActivatedRoute) {
  }

  loadCatalogue(): void {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const userService: UserService = this.injector.get<UserService>(UserService);
    const instrument: Instrument = infoService.settings.instrument;
    this.catalogueModel.value.requestedTunes = new Map();
    infoService.loadingProgressMessage.next(messages.message_loading_catalogue);
    this.isLoading = true;
    this.http.get<CatalogueModel>(this.baseApiUrl + '/catalogue/' + instrument + '/' + infoService.settings.level,
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)}
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

          if (error.status == HttpStatusCode.Unauthorized) {
            let loginModel = userService.loginModel.getValue();
            loginModel.jwt = null;
            userService.loginModel.next(loginModel);
          }
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
