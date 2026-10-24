import {Component} from "@angular/core";
import {InfoService} from "../../../../services/infoservice";
import {Router} from "@angular/router";
import {ICONS_MAP, INSTRUMENTS_ROUTES_MAP} from "../../../../model/constants";

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
    return ICONS_MAP.get('HOME' + this.homeSrcSuffix.toUpperCase())!;
  }

  onHomeClick(): void {
    this.infoService.playerComponent.loopHandler.pause();
    this.router.navigate([INSTRUMENTS_ROUTES_MAP.get(this.infoService.settings.instrument)]);
  }
}
