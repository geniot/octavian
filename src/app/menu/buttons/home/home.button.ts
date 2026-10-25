import {Component} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {ICONS_MAP} from "../../../../model/constants";

@Component({
  selector: 'home-button',
  templateUrl: './home.button.html'
})
export class HomeButton {
  homeSrcSuffix = '';

  constructor(public infoService: InfoService,
              public router: Router
  ) {
  }

  getHomeSrc(): string {
    if (this.infoService.dialogsHandler.isShowMenuDialog) {
      return ICONS_MAP.get('LIST_SELECTED')!;
    } else {
      return ICONS_MAP.get('LIST' + this.homeSrcSuffix.toUpperCase())!;
    }
  }

  onHomeClick(): void {
    this.infoService.playerComponent.loopHandler.pause();
    this.infoService.dialogsHandler.isShowMenuDialog = true;
  }
}
