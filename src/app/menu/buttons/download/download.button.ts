import {Component} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {UserService} from "../../../../services/userservice";
import {TuneService} from "../../../../services/tuneservice";
import {ICONS_MAP} from "../../../../model/constants";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'download-button',
  templateUrl: './download.button.html'
})
export class DownloadButton {
  downloadSrcSuffix = '';

  constructor(public infoService: InfoService,
              public userService: UserService,
              public tuneService: TuneService,
              public router: Router
  ) {
  }

  getDownloadSrc(): string {
    return ICONS_MAP.get('DOWNLOAD' + this.downloadSrcSuffix.toUpperCase())!;
  }

  onDownload() {
    const url = environment.BASE_API_URL +
      "/tune/download/" +
      this.tuneService.tuneModel.value.tune.id + "?jwt=" +
      this.userService.loginModel.value.jwt!;

    window.open(url);
  }

}
