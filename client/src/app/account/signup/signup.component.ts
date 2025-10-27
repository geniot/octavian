import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RequestPasswordResetComponent} from "../requestpasswordreset/request-password-reset.component";
import {InfoService} from "../../../services/infoservice";
import {Router} from "@angular/router";
import {INSTRUMENTS_ROUTES_MAP, isEmail, isPassword} from "../../../model/constants";
import {UserService} from "../../../services/userservice";
import {SignupModel} from "../../../model/mds/signupmodel";
import {skip} from "rxjs/operators";
import {ClientAction} from "../../../model/enums/clientaction";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends RequestPasswordResetComponent implements OnInit {

  signUpPassword!: string;
  @ViewChild('signUpPasswordInput') signUpPasswordElement!: ElementRef;

  constructor(public override infoService: InfoService,
              public override userService: UserService,
              public override router: Router
  ) {
    super(infoService, userService, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.userService.signupModel.next(new SignupModel());
    this.subscriptions.push(this.userService.signupModel.asObservable().pipe(skip(1)).subscribe(
      signupModel => {
        if (this.captchaElem != null) {
          this.captchaElem.reset();
          this.isReCaptchaResolved = false;
        }
        if (!signupModel.hasError) {
          this.router.navigate([ClientAction.CHECK], {state: {data: this.router.url}});
        }
      }));
  }

  onContinue() {
    this.userService.signUp(this.email, this.signUpPassword, this.captchaResponse);
  }

  override isButtonDisabled() {
    return !this.isReCaptchaResolved || !isEmail(this.email) || !isPassword(this.signUpPassword) || this.userService.isLoading;
  }

  onSignIn() {
    this.userService.loginModel.value.message = null;
    this.router.navigate([INSTRUMENTS_ROUTES_MAP.get(this.infoService.settings.instrument)]);
    this.infoService.dialogsHandler.isShowSignInDialog = true;
  }

}
