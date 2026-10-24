import {Component} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {ICONS_MAP} from "../../../../model/constants";
import {UserService} from "../../../../services/userservice";
import {TuneService} from "../../../../services/tuneservice";


@Component({
  selector: 'text-button',
  templateUrl: './text.button.html'
})
export class TextButton {
  textSrcSuffix = '';

  constructor(public infoService: InfoService,
              public userService: UserService,
              public tuneService: TuneService,
              public router: Router
  ) {
  }

  onTextClick(): void {
    this.infoService.dialogsHandler.isShowFingeringDialog = true;
  }

  getTextSrc(): string {
    if (this.infoService.dialogsHandler.isShowFingeringDialog) {
      return ICONS_MAP.get('TEXT_SELECTED')!;
    } else {
      return ICONS_MAP.get('TEXT' + this.textSrcSuffix.toUpperCase())!;
    }
  }
}
