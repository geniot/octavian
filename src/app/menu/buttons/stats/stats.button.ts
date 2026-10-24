import {Component} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {ICONS_MAP} from "../../../../model/constants";

@Component({
  selector: 'stats-button',
  templateUrl: './stats.button.html'
})
export class StatsButton {
  statsSrcSuffix = '';

  constructor(
    public infoService: InfoService
  ) {
  }

  onStatsClick(): void {
    this.infoService.dialogsHandler.isShowStatsDialog = true;
  }

  getStatsSrc(): string {
    if (this.infoService.dialogsHandler.isShowStatsDialog) {
      return ICONS_MAP.get('STATS_SELECTED')!;
    } else {
      return ICONS_MAP.get('STATS' + this.statsSrcSuffix.toUpperCase())!;
    }
  }

}
