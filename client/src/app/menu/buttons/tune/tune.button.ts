import {Component, Input} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {ICONS_MAP, INSTRUMENTS_ROUTES_MAP} from "../../../../model/constants";
import {Role} from "../../../../model/enums/role";
import {UserService} from "../../../../services/userservice";
import {TuneService} from "../../../../services/tuneservice";


@Component({
  selector: 'tune-button',
  templateUrl: './tune.button.html'
})
export class TuneButton {
  tuneSrcSuffix = '';
  @Input() isSelected: boolean = false;

  constructor(public infoService: InfoService,
              public userService: UserService,
              public tuneService: TuneService,
              public router: Router
  ) {
  }

  getTuneSrc(): string {
    let suffix: string = (this.isSelected ? 'on' : 'off') + this.tuneSrcSuffix;
    return ICONS_MAP.get('TUNE_' + suffix.toUpperCase())!;
  }

  shouldShowFingering(): boolean {
    if (this.userService.getUserRole() == Role.ADMIN || this.infoService.settings.level == 0) {
      return true;
    } else {
      return false;
    }
  }

  onTune() {
    let path: string = INSTRUMENTS_ROUTES_MAP.get(this.infoService.settings.instrument) + '/' +
      this.tuneService.tuneModel.value.tune.ownerId + '/' +
      this.tuneService.tuneModel.value.tune.id;
    this.router.navigate([path]);
  }
}
