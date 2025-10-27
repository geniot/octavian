import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RequestPasswordResetComponent} from "../requestpasswordreset/request-password-reset.component";
import {InfoService} from "../../../services/infoservice";
import {Router} from "@angular/router";
import {INSTRUMENTS_ROUTES_MAP, isPassword} from "../../../model/constants";
import {skip} from "rxjs/operators";
import {UserService} from "../../../services/userservice";
import {messages} from "../../../environments/messages";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends RequestPasswordResetComponent implements OnInit {

  password1!: string;
  password2!: string;

  @ViewChild('passwordInput') passwordElement!: ElementRef;


  constructor(public override infoService: InfoService,
              public override userService: UserService,
              public override router: Router) {
    super(infoService, userService, router);
  }

  override ngOnInit(): void {
    let _this = this;
    this.infoService.dialogsHandler.hideAllDialogs();
    setTimeout(function () {
      _this.passwordElement.nativeElement.focus();
    }, 0);
    this.subscriptions.push(this.userService.resetPasswordModel.asObservable().pipe(skip(1)).subscribe(
      m => {
        if (!m.hasError) {
          this.router.navigate([INSTRUMENTS_ROUTES_MAP.get(this.infoService.settings.instrument)]);
          this.infoService.dialogsHandler.isShowSignInDialog = true;
        }
      }));
  }

  override isButtonDisabled() {
    return !isPassword(this.password1) || !isPassword(this.password2) || this.userService.isLoading;
  }

  override onSubmit() {
    if (this.password1 != this.password2) {
      this.userService.resetPasswordModel.value.hasError = true;
      this.userService.resetPasswordModel.value.message = messages.message_passwords_no_match;
      return;
    }
    let token = new URLSearchParams(window.location.search).get("token");
    if (token == null) {
      this.userService.resetPasswordModel.value.hasError = true;
      this.userService.resetPasswordModel.value.message = messages.message_token_not_found;
      return;
    } else {
      this.userService.resetPassword(this.password1, token);
    }
  }


}
