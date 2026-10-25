import {Component} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {TuneService} from "../../../../services/tuneservice";
import {getParamValueQueryString, ICONS_MAP} from "../../../../model/constants";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'download-button',
  templateUrl: './download.button.html'
})
export class DownloadButton {
  downloadSrcSuffix = '';
  readonly baseApiUrl = environment.BASE_API_URL;

  constructor(public infoService: InfoService,
              public tuneService: TuneService
  ) {
  }

  getDownloadSrc(): string {
    return ICONS_MAP.get('DOWNLOAD' + this.downloadSrcSuffix.toUpperCase())!;
  }

  onDownload() {
    const instrument = getParamValueQueryString("instrument");
    const tune = getParamValueQueryString("tune");
    if (instrument != null && tune != null) {
      const url = this.baseApiUrl + instrument + '/' + tune + "/" + tune + ".musicxml";
      window.open(url);
    }
  }

}
