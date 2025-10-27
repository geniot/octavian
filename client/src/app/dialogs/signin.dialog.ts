import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {isEmail, isPassword} from "../../model/constants";
import {ClientAction} from "../../model/enums/clientaction";
import {AnyDialog} from "./anydialog";
import {messages} from "../../environments/messages";

@Component({
  selector: 'sign-in-dialog',
  templateUrl: './signin.dialog.html'
})
export class SignInDialog extends AnyDialog implements OnInit {

  email!: string;
  password!: string;

  @ViewChild('emailInput') emailElement!: ElementRef;
  @ViewChild('passwordInput') passwordElement!: ElementRef;

  ngOnInit() {
    this.subscriptions.push(this.userService.loginModel.asObservable().subscribe(
      m => {
        if (this.infoService.dialogsHandler.isShowSignInDialog) {
          this.hasError = m.hasError;
          this.message = m.message;
          if (!this.hasError) {
            this.infoService.dialogsHandler.isShowSignInDialog = false;
          }
        }
      }));

    //DEBUG
    // this.infoService.onShowUploadDialog();
  }

  onSubmit() {
    if (!isEmail(this.email) || !isPassword(this.password)) {
      this.message = messages.message_email_password_incorrect;
      this.hasError = true;
      this.emailElement.nativeElement.focus();
    } else {
      this.message = null;
      this.userService.signIn(this.email, this.password);
    }
  }

  override onErrorClose() {
    this.userService.loginModel.value.message = null;
    this.emailElement.nativeElement.focus();
  }

  override onShow() {
    let _this = this;
    this.userService.isLoading = false;
    this.userService.loginModel.value.jwt = null;
    super.onShow();
    setTimeout(function () {
      _this.emailElement.nativeElement.focus();
    }, 0);
  }

  onForgotPassword() {
    this.router.navigate(['/' + ClientAction.REQUEST_RESET], {state: {data: this.router.url}});
  }

  onSignUp() {
    this.router.navigate(['/' + ClientAction.SIGNUP], {state: {data: this.router.url}});
  }

  onResend(event: any) {
    let dataLink: String = event.target.getAttribute('data-link');
    if (dataLink != null && dataLink == "onResend") {
      this.router.navigate(['/' + ClientAction.RESEND], {state: {data: this.router.url}});
    }
  }
}
