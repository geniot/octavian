import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InfoService} from "../../../services/infoservice";
import {Router} from "@angular/router";
import {isEmail} from "../../../model/constants";
import {DestroyableComponent} from "../../../model/destroyablecomponent";
import {RecaptchaComponent} from "ng-recaptcha-2";
import {ClientAction} from "../../../model/enums/clientaction";
import {skip} from "rxjs/operators";
import {UserService} from "../../../services/userservice";
import {RequestPasswordResetModel} from "../../../model/mds/requestpasswordresetmodel";
import {OCTAVIAN_LOGO, RECAPTCHA_SITE_KEY} from "../../../model/images";

@Component({
  selector: 'request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent extends DestroyableComponent implements OnInit {
  reCaptchaSiteKey = RECAPTCHA_SITE_KEY;

  @ViewChild('emailInput') emailElement!: ElementRef;
  @ViewChild('captchaElem') captchaElem!: RecaptchaComponent;
  email!: string;
  isReCaptchaResolved: boolean = false;
  captchaResponse!: string;

  constructor(public infoService: InfoService,
              public userService: UserService,
              public router: Router) {
    super();
  }

  ngOnInit(): void {
    this.userService.requestPasswordResetModel.next(new RequestPasswordResetModel());
    this.infoService.dialogsHandler.hideAllDialogs();
    let _this = this;
    setTimeout(function () {
      _this.emailElement.nativeElement.focus();
    }, 0);

    this.subscriptions.push(this.userService.requestPasswordResetModel.asObservable().pipe(skip(1)).subscribe(
      resetModel => {
        if (this.captchaElem != null) {
          this.captchaElem.reset();
          this.isReCaptchaResolved = false;
        }
        if (!resetModel.hasError) {
          this.router.navigate([ClientAction.CHECK], {state: {data: this.router.url}});
        }
      }));
  }

  onErrorClose() {
    this.userService.loginModel.value.message = null;
    this.emailElement.nativeElement.focus();
  }

  resolved(captchaResponse: any) {
    this.isReCaptchaResolved = true;
    this.captchaResponse = captchaResponse;
  }

  isButtonDisabled() {
    return !this.isReCaptchaResolved || !isEmail(this.email) || this.userService.isLoading;
  }

  onSubmit() {
    this.userService.sendResetLink(this.email, this.captchaResponse);
  }


  protected readonly OCTAVIAN_LOGO = OCTAVIAN_LOGO;
}
