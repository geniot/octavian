import {Component} from "@angular/core";
import {CatalogueService} from "../../../services/catalogueservice";
import {InfoService} from "../../../services/infoservice";
import {UserService} from "../../../services/userservice";
import {TuneService} from "../../../services/tuneservice";
import {Router} from "@angular/router";
import {ICONS_MAP} from "../../../model/constants";


@Component({
  selector: 'levels-component',
  templateUrl: './levels.component.html'
})
export class LevelsComponent {

  allowLevels: boolean = true;

  aSrcSuffix = '';
  bSrcSuffix = '';
  cSrcSuffix = '';
  dSrcSuffix = '';
  eSrcSuffix = '';
  fSrcSuffix = '';
  gSrcSuffix = '';

  privateSuffix = '';

  constructor(public infoService: InfoService,
              public userService: UserService,
              public tuneService: TuneService,
              public catalogueService: CatalogueService,
              public router: Router
  ) {
  }

  getLevelSrc(level: string, suffix: string): string {
    let levelNum: number = "abcdefg".indexOf(level);
    let sf: string = this.infoService.settings.level == levelNum + 1 ? '_selected' : suffix;
    return ICONS_MAP.get(level.toUpperCase() + sf.toUpperCase())!;
  }

  updateLevel(number: number): void {
    if (this.infoService.settings.level != number) {
      this.infoService.settings.level = number;
      this.catalogueService.loadCatalogue();
    }
  }
}
