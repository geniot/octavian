import {Injectable, Injector} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {StatsModel} from "../model/mds/statsmodel";
import {plainToClass} from "class-transformer";
import {InfoService} from "./infoservice";
import {StatsRecord} from "../model/statsrecord";
import {AnyService} from "./anyservice";
import {getParamValueQueryString} from "../model/constants";


@Injectable({providedIn: 'root'})
export class StatsService extends AnyService {
  statsModel: BehaviorSubject<StatsModel> = new BehaviorSubject<StatsModel>(new StatsModel());
  readonly statsLocalStorageName: string = "octavian-statsLocalStorageName";

  constructor(public http: HttpClient,
              private injector: Injector) {
    super();
    if (localStorage.getItem(this.statsLocalStorageName)) {
      let stats = JSON.parse(localStorage.getItem(this.statsLocalStorageName)!);
      this.statsModel.next(plainToClass(StatsModel, stats));
    } else {
      this.statsModel.next(new StatsModel());
    }
  }

  submitStats() {
    const infoService: InfoService = this.injector.get<InfoService>(InfoService);
    const newStatsRecord: StatsRecord = infoService.playerComponent.sheetGroup.noteChecker.getStatsRecord();
    const instrument = getParamValueQueryString("instrument");
    const tune = getParamValueQueryString("tune");
    if (instrument != null && tune != null) {
      let records: StatsRecord[] = new Array<StatsRecord>();
      if (this.statsModel.value.records.has(instrument + ":" + tune)) {
        records = this.statsModel.value.records.get(instrument + ":" + tune)!;
      }
      records.push(newStatsRecord);
      this.statsModel.value.submittedStats = newStatsRecord;
      this.statsModel.value.records.set(instrument + ":" + tune, records);
      this.statsModel.next(this.statsModel.value);
      localStorage.setItem(this.statsLocalStorageName, JSON.stringify(this.statsModel.value));
    }
  }

  loadStats(): void {
    this.statsModel.next(this.statsModel.value);
  }

  clearStats() {
    const instrument = getParamValueQueryString("instrument");
    const tune = getParamValueQueryString("tune");
    if (instrument != null && tune != null) {
      this.statsModel.value.records.set(instrument + ":" + tune, new Array<StatsRecord>());
      this.statsModel.next(this.statsModel.value);
      localStorage.setItem(this.statsLocalStorageName, JSON.stringify(this.statsModel.value));
    }
  }
}
