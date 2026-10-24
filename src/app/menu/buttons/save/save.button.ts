import {Component, Input} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {ICONS_MAP} from "../../../../model/constants";
import {UserService} from "../../../../services/userservice";
import {TuneService} from "../../../../services/tuneservice";


@Component({
  selector: 'save-button',
  templateUrl: './save.button.html'
})
export class SaveButton {
  saveSrcSuffix = '';
  @Input() isSelected: boolean = false;

  constructor(public infoService: InfoService,
              public userService: UserService,
              public tuneService: TuneService,
              public router: Router
  ) {
  }

  getSaveSrc(): string {
    let suffix: string = (this.infoService.isFingeringSaved ? 'on' : 'off') + this.saveSrcSuffix;
    return ICONS_MAP.get('SAVE_' + suffix.toUpperCase())!;
  }

  onSave() {
    this.tuneService.saveFingering();
  }

}
