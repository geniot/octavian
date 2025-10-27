import {Component, Input} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {ICONS_MAP} from "../../../../model/constants";
import {Role} from "../../../../model/enums/role";
import {UserService} from "../../../../services/userservice";
import {TuneService} from "../../../../services/tuneservice";

@Component({
  selector: 'fingering-button',
  templateUrl: './fingering.button.html'
})
export class FingeringButton {
  fingeringSrcSuffix = '';
  @Input() isSelected: boolean = false;

  constructor(public infoService: InfoService,
              public userService: UserService,
              public tuneService: TuneService,
              public router: Router
  ) {
  }

  getFingeringSrc(): string {
    let suffix: string = (this.isSelected ? 'on' : 'off') + this.fingeringSrcSuffix;
    return ICONS_MAP.get('FINGERING_' + suffix.toUpperCase())!;
  }

  shouldShowFingering(): boolean {
    if (this.userService.getUserRole() == Role.ADMIN || this.infoService.settings.level == 0) {
      return true;
    } else {
      return false;
    }
  }
}
