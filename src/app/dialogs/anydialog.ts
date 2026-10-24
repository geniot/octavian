import {DestroyableComponent} from "../../model/destroyablecomponent";
import {InfoService} from "../../services/infoservice";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ChangeDetectorRef, Directive, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {CatalogueService} from "../../services/catalogueservice";
import {TuneService} from "../../services/tuneservice";
import {StatsService} from "../../services/statsservice";
import {ConfirmationService} from "primeng/api";

@Directive()
export class AnyDialog extends DestroyableComponent {
  hasError: boolean = false;
  message: string | null = null;
  elem: any;

  constructor(@Inject(DOCUMENT) public document: any,
              public infoService: InfoService,
              public tuneService: TuneService,
              public catalogueService: CatalogueService,
              public statsService: StatsService,
              public sanitizer: DomSanitizer,
              public cdr: ChangeDetectorRef,
              public router: Router,
              public confirmationService: ConfirmationService
  ) {
    super();
    this.elem = document.documentElement;
  }

  onShow() {
    this.hasError = false;
    this.message = null;
  }

  onHide() {
    this.hasError = false;
    this.message = null;
  }

  onErrorClose() {
    this.message = null;
    this.hasError = false;
  }


}
