import {Component, OnInit} from '@angular/core';
import {InfoService} from "../../../services/infoservice";
import {Router} from "@angular/router";
import {RequestPasswordResetComponent} from "../requestpasswordreset/request-password-reset.component";
import {UserService} from "../../../services/userservice";
import {RequestActivationLinkModel} from "../../../model/mds/requestactivationlinkmodel";
import {skip} from "rxjs/operators";
import {ClientAction} from "../../../model/enums/clientaction";

@Component({
  selector: 'app-resend-link',
  templateUrl: './resend-link.component.html',
  styleUrls: ['./resend-link.component.css']
})
export class ResendLinkComponent extends RequestPasswordResetComponent implements OnInit {

  constructor(public override infoService: InfoService,
              public override userService: UserService,
              public override router: Router) {
    super(infoService, userService, router);
  }

  override ngOnInit(): void {
    this.userService.requestActivationLinkModel.next(new RequestActivationLinkModel());
    this.infoService.dialogsHandler.hideAllDialogs();
    let _this = this;
    setTimeout(function () {
      _this.emailElement.nativeElement.focus();
    }, 0);

    this.subscriptions.push(this.userService.requestActivationLinkModel.asObservable().pipe(skip(1)).subscribe(
      requestActivationLinkModel => {
        if (this.captchaElem != null) {
          this.captchaElem.reset();
          this.isReCaptchaResolved = false;
        }
        if (!requestActivationLinkModel.hasError) {
          this.router.navigate([ClientAction.CHECK], {state: {data: this.router.url}});
        }
      }));
  }

  override onSubmit() {
    this.userService.sendActivationLink(this.email, this.captchaResponse);
  }


}
