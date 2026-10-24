import {ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {InfoService} from "../services/infoservice";
import {DestroyableComponent} from "../model/destroyablecomponent";
import {timer} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Icon} from "../model/enums/icon";
import {ICONS_MAP} from "../model/constants";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends DestroyableComponent {
  title = 'octavian-ui';

  constructor(private httpClient: HttpClient,
              public infoService: InfoService,
              private cdr: ChangeDetectorRef) {
    super();

    let _this = this;
    timer(0, 1000).subscribe(() => {
      _this.infoService.saveSettings();
    });

    for (const key in Icon) {
      if (Icon.hasOwnProperty(key)) {
        this.loadIcon('assets/' + key.toLowerCase() + '.svg', key);
      }
    }

  }

  @HostListener('window:resize', ['$event.target'])
  public onResize(target: any) {
    let _this = this;
    setTimeout(function () {
      _this.infoService.playerInitTrigger.next(true);
    }, 0);
  }

  private loadIcon(path: string, iconKey: string): void {
    this.httpClient
      .get(path, {responseType: 'text'})
      .subscribe(value => {
        ICONS_MAP.set(iconKey, 'data:image/svg+xml;base64,' + window.btoa(value));
      });
  }

}
