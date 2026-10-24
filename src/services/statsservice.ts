import {Injectable, Injector} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../environments/environment";
import {StatsModel} from "../model/mds/statsmodel";
import {UserService} from "./userservice";
import {XHeader} from "../model/enums/xheader";
import {plainToClass} from "class-transformer";
import {TuneService} from "./tuneservice";
import {InfoService} from "./infoservice";


@Injectable({providedIn: 'root'})
export class StatsService {
  readonly baseApiUrl = environment.BASE_API_URL;
  statsModel: BehaviorSubject<StatsModel> = new BehaviorSubject<StatsModel>(new StatsModel());
  isLoading: boolean = false;

  constructor(public http: HttpClient,
              public router: Router,
              private injector: Injector,
              private activatedRoute: ActivatedRoute) {
  }

  submitStats() {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const userService: UserService = this.injector.get<UserService>(UserService);
    const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
    let statsModel: StatsModel = new StatsModel();
    statsModel.submittedStats = infoService.playerComponent.sheetGroup.noteChecker.getStatsRecord();
    this.isLoading = true;
    this.http.post<StatsModel>(
      this.baseApiUrl + '/stats/' + tuneService.tuneModel.value.tune.id,
      JSON.stringify(statsModel),
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)}
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(StatsModel, model);
          this.statsModel.next(model);
        }
      );
  }

  loadStats(): void {
    const userService: UserService = this.injector.get<UserService>(UserService);
    const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
    this.isLoading = true;
    this.http.get<StatsModel>(this.baseApiUrl + '/stats/' + tuneService.tuneModel.value.tune.id,
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)})
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(StatsModel, model);
          this.statsModel.next(model);
        },
        error => {
          this.isLoading = false;
          this.statsModel.value.message = error.message;
          this.statsModel.value.hasError = true;
          this.statsModel.next(this.statsModel.value);

          if (error.status == HttpStatusCode.Unauthorized) {
            let loginModel = userService.loginModel.getValue();
            loginModel.jwt = null;
            userService.loginModel.next(loginModel);
          }
        });
  }

  clearStats() {
    const userService: UserService = this.injector.get<UserService>(UserService);
    const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
    this.isLoading = true;
    this.http.delete<StatsModel>(this.baseApiUrl + '/stats/' + tuneService.tuneModel.value.tune.id,
      {headers: new HttpHeaders().append(XHeader.X_JWT, userService.loginModel.value.jwt!)})
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(StatsModel, model);
          this.statsModel.next(model);
        });
  }
}
