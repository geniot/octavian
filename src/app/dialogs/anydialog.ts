import {DestroyableComponent} from "../../model/destroyablecomponent";
import {InfoService} from "../../services/infoservice";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ChangeDetectorRef, Directive, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {ClientAction} from "../../model/enums/clientaction";
import {CatalogueService} from "../../services/catalogueservice";
import {TuneService} from "../../services/tuneservice";
import {UserService} from "../../services/userservice";
import {StatsService} from "../../services/statsservice";
import {ConfirmationService} from "primeng/api";
import {UnlockService} from "../../services/unlockservice";

@Directive()
export class AnyDialog extends DestroyableComponent {
  hasError: boolean = false;
  message: string | null = null;
  elem: any;

  constructor(@Inject(DOCUMENT) public document: any,
              public infoService: InfoService,
              public tuneService: TuneService,
              public catalogueService: CatalogueService,
              public userService: UserService,
              public statsService: StatsService,
              public unlockService: UnlockService,
              public sanitizer: DomSanitizer,
              public cdr: ChangeDetectorRef,
              public router: Router,
              public confirmationService: ConfirmationService
              ) {
    super();
    this.elem = document.documentElement;
  }

  onSignIn(event: any) {
    this.hasError = false;
    this.message = null;
    let dataLink: String = event.target.getAttribute('data-link');
    if (dataLink != null && dataLink == "onSignIn") {
      this.infoService.dialogsHandler.isShowSignInDialog = true;
    }
    if (dataLink != null && dataLink == "onSignUp") {
      this.router.navigate(['/' + ClientAction.SIGNUP], {state: {data: this.router.url}});
    }
    if (dataLink != null && dataLink == "onSubscribe") {
      this.infoService.dialogsHandler.hideAllDialogs();
      this.infoService.onHomeClick();
      this.infoService.dialogsHandler.isShowUserProfileDialog = true;
    }
  }

  onShow() {
    this.hasError = false;
    this.message = null;
  }

  onHide() {
    this.hasError = false;
    this.message = null;
    this.infoService.dialogsHandler.isShowSignInDialog = false;
  }

  onErrorClose() {
    this.message = null;
    this.hasError = false;
  }


}
