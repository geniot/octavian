import {Component} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {ICONS_MAP} from "../../../../model/constants";

@Component({
  selector: 'settings-button',
  templateUrl: './settings.button.html'
})
export class SettingsButton {
  settingsSrcSuffix = '';

  constructor(public infoService: InfoService,
              public router: Router
  ) {
  }

  getSettingsSrc(): string {
    let suffix: string = this.infoService.connectedTrigger.value.valueOf() ? 'on' : 'off';
    if (this.infoService.dialogsHandler.isShowSettingsDialog) {
      return ICONS_MAP.get('SETTINGS_' + suffix.toUpperCase() + '_SELECTED')!;
    } else {
      return ICONS_MAP.get('SETTINGS_' + suffix.toUpperCase() + this.settingsSrcSuffix.toUpperCase())!;
    }
  }
}
