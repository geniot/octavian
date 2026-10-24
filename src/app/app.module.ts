import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SliderModule} from 'primeng/slider';
import {AngularSplitModule} from 'angular-split';
import {NgxResizeObserverModule} from 'ngx-resize-observer';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {KnobModule} from "primeng/knob";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FlexLayoutModule} from '@angular/flex-layout';
import {PlayerComponent} from './player/player.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PlayerWrapperComponent} from './playerwrapper/player-wrapper.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserComponent} from "./browser/browser.component";
import {MenuComponent} from "./menu/menu.component";
import {ButtonKeyboardComponent} from './buttonkeyboard/button-keyboard.component';
import {InfoService} from "../services/infoservice";
import {RadioButtonModule} from "primeng/radiobutton";
import {DialogModule} from "primeng/dialog";
import {PianoKeyboardComponent} from './pianokeyboard/piano-keyboard.component';
import {CheckboxModule} from "primeng/checkbox";
import {LeftButtonKeyboardComponent} from "./buttonkeyboard/left-button-keyboard.component";
import {RightButtonKeyboardComponent} from "./buttonkeyboard/right-button-keyboard.component";
import {PlayerSliderComponent} from './playerslider/player-slider.component';
import {PlayerControlsComponent} from './playercontrols/player-controls.component';
import {PasswordModule} from "primeng/password";
import {RecaptchaModule} from "ng-recaptcha-2";
import {SignInDialog} from "./dialogs/signin.dialog";
import {CheckYourEmailDialog} from "./dialogs/checkyouremail.dialog";
import {AboutDialog} from "./dialogs/about.dialog";
import {SettingsDialog} from "./dialogs/settings.dialog";
import {LeftHandLayoutDialog} from "./dialogs/lefthandlayout.dialog";
import {RightHandLayoutDialog} from "./dialogs/righthandlayout.dialog";
import {UserProfileDialog} from "./dialogs/userprofile.dialog";
import {RequestPasswordResetComponent} from './account/requestpasswordreset/request-password-reset.component';
import {SignupComponent} from './account/signup/signup.component';
import {ResendLinkComponent} from './account/resendlink/resend-link.component';
import {CheckYourEmailComponent} from "./account/checkyouremail/check-your-email.component";
import {ResetPasswordComponent} from './account/resetpassword/reset-password.component';
import {UploadDialog} from "./dialogs/upload.dialog";
import {TabViewModule} from "primeng/tabview";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {ContextMenuModule} from "primeng/contextmenu";
import {DeleteDialog} from "./dialogs/delete.dialog";
import {ResponseInterceptor} from "../model/responseinterceptor";
import {ProgressDialog} from "./dialogs/progress.dialog";
import {CardModule} from "primeng/card";
import {CopyDialog} from "./dialogs/copy.dialog";
import {PlayerProgressbarComponent} from "./playerprogressbar/player-progressbar.component";
import {StatsDialog} from "./dialogs/statsdialog";
import {FingeringComponent} from './fingering/fingering.component';
import {FingeringDialog} from "./dialogs/fingering.dialog";
import {DropdownModule} from "primeng/dropdown";
import {SplitterModule} from "primeng/splitter";
import {ListboxModule} from "primeng/listbox";
import {CatalogueService} from "../services/catalogueservice";
import {TuneService} from "../services/tuneservice";
import {UserService} from "../services/userservice";
import {StatsService} from "../services/statsservice";
import {ResultDialog} from "./dialogs/result.dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {UnlockService} from "../services/unlockservice";
import {HomeButton} from "./menu/buttons/home/home.button";
import {TuneButton} from "./menu/buttons/tune/tune.button";
import {FingeringButton} from "./menu/buttons/fingering/fingering.button";
import {SettingsButton} from "./menu/buttons/settings/settings.button";
import {FullscreenButton} from "./menu/buttons/fullscreen/fullscreen.button";
import {StatsButton} from "./menu/buttons/stats/stats.button";
import {SaveButton} from "./menu/buttons/save/save.button";
import {TextButton} from "./menu/buttons/text/text.button";
import {InputTextModule} from "primeng/inputtext";
import {DownloadButton} from "./menu/buttons/download/download.button";
import {LevelsComponent} from "./menu/levels/levels.component";
import {CommonModule} from "@angular/common";
import {MeasureSelectorComponent} from "./measureselector/measure-selector.component";
import {RangeSelectorComponent} from "./rangeselector/range-selector.component";

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerWrapperComponent,
    BrowserComponent,
    MenuComponent,
    ButtonKeyboardComponent,
    LeftButtonKeyboardComponent,
    RightButtonKeyboardComponent,
    PianoKeyboardComponent,
    PlayerSliderComponent,
    PlayerProgressbarComponent,
    PlayerControlsComponent,
    SignInDialog,
    CheckYourEmailDialog,
    AboutDialog,
    ProgressDialog,
    SettingsDialog,
    LeftHandLayoutDialog,
    RightHandLayoutDialog,
    UserProfileDialog,
    UploadDialog,
    DeleteDialog,
    CopyDialog,
    StatsDialog,
    FingeringDialog,
    ResultDialog,
    RequestPasswordResetComponent,
    SignupComponent,
    ResendLinkComponent,
    CheckYourEmailComponent,
    ResetPasswordComponent,
    FingeringComponent,
    HomeButton,
    TuneButton,
    FingeringButton,
    SettingsButton,
    FullscreenButton,
    StatsButton,
    SaveButton,
    TextButton,
    DownloadButton,
    LevelsComponent,
    MeasureSelectorComponent,
    RangeSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SliderModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    KnobModule,
    ToggleButtonModule,
    FlexLayoutModule,
    SelectButtonModule,
    ProgressSpinnerModule,
    AppRoutingModule,
    RadioButtonModule,
    DialogModule,
    CheckboxModule,
    AngularSplitModule,
    PasswordModule,
    RecaptchaModule,
    TabViewModule,
    FileUploadModule,
    TableModule,
    ContextMenuModule,
    CardModule,
    DropdownModule,
    SplitterModule,
    ListboxModule,
    NgxResizeObserverModule,
    ConfirmDialogModule,
    InputTextModule,
    CommonModule
  ],
  providers: [
    ConfirmationService,
    InfoService, CatalogueService, TuneService, UserService, StatsService, UnlockService,
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
