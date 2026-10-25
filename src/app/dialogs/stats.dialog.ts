import {Component} from "@angular/core";
import {AnyDialog} from "./anydialog";
import {StatsRecord} from "../../model/statsrecord";
import {getParamValueQueryString, getScore} from "../../model/constants";
import {instrument} from "soundfont-player";

@Component({
  selector: 'stats-dialog',
  templateUrl: './stats.dialog.html'
})
export class StatsDialog extends AnyDialog {
  stats!: StatsRecord[];

  columnWidthCounter: number = 50;
  columnWidthDate: number = 150;
  columnWidthTimeScore: number = 100;
  transparency: number = 0.3;

  getScore = getScore;

  ngOnInit(): void {
    this.subscriptions.push(this.statsService.statsModel.asObservable().subscribe(
      m => {
        const path = getParamValueQueryString("path");
        this.stats = this.statsService.statsModel.value.records.get(instrument + ":" + path)!;
      }));
    //for debugging
    // this.infoService.dialogsHandler.isShowStatsDialog = true;
  }

  override onShow() {
    super.onShow();
    this.stats = [];
    this.statsService.loadStats();
  }

  override onHide() {
    super.onHide();
    this.stats = [];
  }

  getDate(date: string): string {
    let splits = date.split("T")[0].split("-");
    return splits[2] + "-" + splits[1] + "-" + splits[0];
  }

  getTime(date: string): string {
    let time: string = date.split("T")[1].split(".")[0];
    return time.substring(0, time.lastIndexOf(":"));
  }


  getIndex(record: StatsRecord): string {
    for (let i = 0; i < this.stats.length; i++) {
      if (this.stats[i] == record) {
        return String(i + 1);
      }
    }
    return "";
  }

  getColorByChar(char: string): string {
    if (char == '0') {
      return 'rgba(0, 255, 0, ' + this.transparency + ')';
    }
    if (char == '1') {
      return 'rgba(255, 255, 0, ' + this.transparency + ')';
    }
    if (char == '2') {
      return 'rgba(255, 0, 0, ' + this.transparency + ')';
    }
    return 'rgba(255, 255, 255, ' + this.transparency + ')';
  }

  confirm(event: Event) {
    this.statsService.clearStats();
  }
}
