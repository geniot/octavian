import {Component} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {ICONS_MAP} from "../../../../model/constants";
import {UserService} from "../../../../services/userservice";

@Component({
  selector: 'stats-button',
  templateUrl: './stats.button.html'
})
export class StatsButton {
  statsSrcSuffix = '';

  constructor(
    public infoService: InfoService,
    public userService: UserService,
    public router: Router
  ) {
  }

  onStatsClick(): void {
    if (this.userService.isUserLoggedIn()) {
      this.infoService.dialogsHandler.isShowStatsDialog = true;
    }
  }

  getStatsSrc(): string {
    if (this.infoService.dialogsHandler.isShowStatsDialog) {
      return ICONS_MAP.get('STATS_SELECTED')!;
    } else {
      return ICONS_MAP.get('STATS' + this.statsSrcSuffix.toUpperCase())!;
    }
  }

}
