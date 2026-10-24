import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Tune} from "../../model/tune";
import {InfoService} from "../../services/infoservice";
import {environment} from "../../environments/environment";
import {DestroyableComponent} from "../../model/destroyablecomponent";
import {MenuItem} from "primeng/api";
import {DomSanitizer} from "@angular/platform-browser";
import {INSTRUMENTS_ROUTES_MAP} from "../../model/constants";
import {Role} from "../../model/enums/role";
import {messages} from "../../environments/messages";
import {cloneDeep} from "lodash-es";
import {CatalogueService} from "../../services/catalogueservice";
import {TuneService} from "../../services/tuneservice";
import {UserService} from "../../services/userservice";
import {UnlockService} from "../../services/unlockservice";
import {PLACEHOLDER_IMG, STAR_EMPTY_IMG, STAR_IMG} from "../../model/images";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent extends DestroyableComponent implements OnInit {

  BASE_API_URL = environment.BASE_API_URL;
  protected readonly INSTRUMENTS_ROUTES_MAP = INSTRUMENTS_ROUTES_MAP;

  hasError: boolean = false;
  message!: string | null;
  items: MenuItem[] = [];
  timeStamp: any = Date.now();
  Role = Role;

  constructor(public router: Router,
              public infoService: InfoService,
              public tuneService: TuneService,
              public catalogueService: CatalogueService,
              public userService: UserService,
              public unlockService: UnlockService,
              public sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(this.catalogueService.catalogueModel.asObservable().subscribe(
      model => {
        this.hasError = model.hasError;
        this.message = model.message;
        if (this.hasError) {
          this.message = messages.message_unable_to_connect;
        }
      }));
  }

  onTry(event: any) {
    let dataLink: String = event.target.getAttribute('data-link');
    if (dataLink != null && dataLink == "onTry") {
      this.hasError = false;
      this.catalogueService.loadCatalogue();
    }
  }

  getItemMenuOptions(tune: Tune) {
    this.tuneService.tuneModel.value.tune = cloneDeep(tune);
    this.items = [
      {
        label: 'Edit',
        command: () => {
          this.infoService.isNewDialogState = false;
          this.infoService.dialogsHandler.isShowUploadDialog = true;
        }
      },
      {
        label: 'Fingering',
        command: () => {
          this.tuneService.onFingering();
        }
      },
      {
        label: 'Delete',
        command: () => {
          this.infoService.dialogsHandler.isShowDeleteDialog = true;
        }
      }
    ];
  }

  getTuneCover(tune: Tune): string {
    return tune.cover == '' ? PLACEHOLDER_IMG : tune.cover;
  }

  onTuneClick(tune: Tune) {
    this.tuneService.audio.pause();
    this.tuneService.loadInstrument(() => {
      this.router.navigate([INSTRUMENTS_ROUTES_MAP.get(this.infoService.settings.instrument) + '/' + tune.ownerId + '/' + tune.id]);
    });
  }

  protected readonly Array = Array;
  protected readonly STAR_EMPTY_IMG = STAR_EMPTY_IMG;
  protected readonly STAR_IMG = STAR_IMG;
}
