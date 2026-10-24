import {Component, Inject, Input} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {ICONS_MAP} from "../../../../model/constants";

@Component({
  selector: 'fullscreen-button',
  templateUrl: './fullscreen.button.html'
})
export class FullscreenButton {
  @Input() maxSize: number = 100;
  @Input() showSubtitle = true;
  fullscreenSrcSuffix = '';
  elem: any;

  constructor(@Inject(DOCUMENT) public document: any,
              public infoService: InfoService,
              public router: Router
  ) {
    this.elem = document.documentElement;
  }

  getFullscreenSrc(): string {
    let suffix: string = (!this.infoService.fullScreenHandler.isFullscreen() ? 'on' : 'off') + this.fullscreenSrcSuffix;
    return ICONS_MAP.get('FULLSCREEN_' + suffix.toUpperCase())!;
  }
}
