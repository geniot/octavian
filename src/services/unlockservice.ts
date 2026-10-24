import {Injectable, Injector} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../environments/environment";
import {UnlockModel} from "../model/mds/unlockmodel";
import {InfoService} from "./infoservice";
import {UserService} from "./userservice";
import {Instrument} from "../model/enums/instrument";
import {XHeader} from "../model/enums/xheader";
import {plainToClass} from "class-transformer";
import {CatalogueService} from "./catalogueservice";


@Injectable({providedIn: 'root'})
export class UnlockService {
  readonly baseApiUrl = environment.BASE_API_URL;
  isLoading: boolean = false;
  unlockModel: BehaviorSubject<UnlockModel> = new BehaviorSubject<UnlockModel>(new UnlockModel());

  constructor(public http: HttpClient,
              public router: Router,
              private injector: Injector,
              private activatedRoute: ActivatedRoute) {
  }

  getContent() {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const userService: UserService = this.injector.get<UserService>(UserService);
    const instrument: Instrument = infoService.settings.instrument;
    this.isLoading = true;
    this.http.get<UnlockModel>(this.baseApiUrl + '/content/' + instrument,
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)}
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(UnlockModel, model);
          //1000 is used here as the maximum number of tunes on one level
          model.unlockRecords = model.unlockRecords.sort((n1, n2) => (n1.levelNum * 1000 + n1.posNum) - (n2.levelNum * 1000 + n2.posNum));
          this.unlockModel.next(model);
        },
        error => this.errorHandler(error));
  }

  unlock() {
    const userService: UserService = this.injector.get<UserService>(UserService);
    const catalogueService: CatalogueService = this.injector.get<CatalogueService>(CatalogueService);
    this.isLoading = true;
    this.http.post<UnlockModel>(
      this.baseApiUrl + '/content',
      JSON.stringify(this.unlockModel.value),
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)}
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(UnlockModel, model);
          for (let i = 0; i < model.unlockRecords.length; i++) {
            catalogueService.setCreditsToTune(model.unlockRecords[i].credits, model.unlockRecords[i].tuneId);
          }
          this.unlockModel.next(model);
        },
        error => this.errorHandler(error)
      );
  }

  errorHandler(error: any) {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const userService: UserService = this.injector.get<UserService>(UserService);
    this.isLoading = false;
    this.unlockModel.value.message = error.message;
    this.unlockModel.value.hasError = true;
    this.unlockModel.next(this.unlockModel.value);

    if (error.status == HttpStatusCode.Unauthorized) {
      let loginModel = userService.loginModel.getValue();
      loginModel.jwt = null;
      userService.loginModel.next(loginModel);
      infoService.dialogsHandler.isShowSignInDialog = true;
    }
  }
}
