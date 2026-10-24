import {Injectable, Injector} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {StatsModel} from "../model/mds/statsmodel";
import {plainToClass} from "class-transformer";
import {TuneService} from "./tuneservice";
import {InfoService} from "./infoservice";


@Injectable({providedIn: 'root'})
export class StatsService {
  readonly baseApiUrl = environment.BASE_API_URL;
  statsModel: BehaviorSubject<StatsModel> = new BehaviorSubject<StatsModel>(new StatsModel());
  isLoading: boolean = false;

  constructor(public http: HttpClient,
              private injector: Injector) {
  }

  submitStats() {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
    let statsModel: StatsModel = new StatsModel();
    statsModel.submittedStats = infoService.playerComponent.sheetGroup.noteChecker.getStatsRecord();
    this.isLoading = true;
    this.http.post<StatsModel>(
      this.baseApiUrl + '/stats/' + tuneService.tuneModel.value.tune.id,
      JSON.stringify(statsModel)
    )
      .subscribe(model => {
          this.isLoading = false;
          model = plainToClass(StatsModel, model);
          this.statsModel.next(model);
        }
      );
  }

  loadStats(): void {
    const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
    this.isLoading = true;
    this.http.get<StatsModel>(this.baseApiUrl + '/stats/' + tuneService.tuneModel.value.tune.id)
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
        });
  }

  clearStats() {
    const tuneService: TuneService = this.injector.get<TuneService>(TuneService);
    this.isLoading = true;
    this.http.delete<StatsModel>(this.baseApiUrl + '/stats/' + tuneService.tuneModel.value.tune.id)
      .subscribe(model => {
        this.isLoading = false;
        model = plainToClass(StatsModel, model);
        this.statsModel.next(model);
      });
  }
}
