import {Component} from "@angular/core";
import {AnyDialog} from "./anydialog";
import {StatsRecord} from "../../model/statsrecord";
import {getParamValueQueryString} from "../../model/constants";

@Component({
  selector: 'menu-dialog',
  templateUrl: './menu.dialog.html'
})
export class MenuDialog extends AnyDialog {
  stats!: StatsRecord[];

  columnWidthCounter: number = 50;
  columnWidthInstrument: number = 250;
  transparency: number = 0.3;

  ngOnInit(): void {
    this.subscriptions.push(this.statsService.statsModel.asObservable().subscribe(
      m => {
        const instrument = getParamValueQueryString("instrument");
        const tune = getParamValueQueryString("tune");
        this.stats = this.statsService.statsModel.value.records.get(instrument + ":" + tune)!;
      }));
    //for debugging
    // this.infoService.dialogsHandler.isShowMenuDialog = true;
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
}
