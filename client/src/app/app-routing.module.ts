import {NgModule} from '@angular/core';
import {NavigationStart, Router, RouterModule, Routes} from '@angular/router';
import {InfoService} from "../services/infoservice";
import {DEFAULT_ROUTER_URL} from "../model/constants";
import {MenuComponent} from "./menu/menu.component";
import {PlayerWrapperComponent} from "./playerwrapper/player-wrapper.component";
import {Instrument} from "../model/enums/instrument";
import {DestroyableComponent} from "../model/destroyablecomponent";
import {RequestPasswordResetComponent} from "./account/requestpasswordreset/request-password-reset.component";
import {SignupComponent} from "./account/signup/signup.component";
import {ResendLinkComponent} from "./account/resendlink/resend-link.component";
import {CheckYourEmailComponent} from "./account/checkyouremail/check-your-email.component";
import {ClientAction} from "../model/enums/clientaction";
import {ResetPasswordComponent} from "./account/resetpassword/reset-password.component";
import {FingeringComponent} from "./fingering/fingering.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule extends DestroyableComponent {
  constructor(private router: Router, private infoService: InfoService) {
    super();
    let _this = this;
    this.router.resetConfig([
      {path: '', redirectTo: DEFAULT_ROUTER_URL, pathMatch: 'full'},

      {path: ClientAction.ACCORDION_BUTTON_TYPE, component: MenuComponent},
      {path: ClientAction.ACCORDION_PIANO_TYPE, component: MenuComponent},
      {path: ClientAction.PIANO, component: MenuComponent},

      {path: ClientAction.REQUEST_RESET, component: RequestPasswordResetComponent},
      {path: ClientAction.RESET, component: ResetPasswordComponent},
      {path: ClientAction.SIGNUP, component: SignupComponent},
      {path: ClientAction.RESEND, component: ResendLinkComponent},
      {path: ClientAction.CHECK, component: CheckYourEmailComponent},

      {path: ClientAction.FINGERING+'/:id', component: FingeringComponent},
      {path: '**', component: PlayerWrapperComponent},

    ]);
    this.subscriptions.push(this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        let navigationStart: NavigationStart = e;

        if (navigationStart.url.startsWith('/' + ClientAction.ACCORDION_BUTTON_TYPE)) {
          this.infoService.settings.instrument = Instrument.BUTTON_ACCORDION;
        } else if (navigationStart.url.startsWith('/' + ClientAction.ACCORDION_PIANO_TYPE)) {
          this.infoService.settings.instrument = Instrument.PIANO_ACCORDION;
        } else if (navigationStart.url.startsWith('/' + ClientAction.PIANO)) {
          this.infoService.settings.instrument = Instrument.PIANO;
        } else if (navigationStart.url.startsWith('/' + ClientAction.FINGERING)) {
          //no change
        } else {
          this.infoService.settings.instrument = Instrument.PIANO;
        }
      }
    }));
  }
}
