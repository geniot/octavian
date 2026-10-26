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
import {AboutDialog} from "./dialogs/about.dialog";
import {SettingsDialog} from "./dialogs/settings.dialog";
import {LeftHandLayoutDialog} from "./dialogs/lefthandlayout.dialog";
import {RightHandLayoutDialog} from "./dialogs/righthandlayout.dialog";
import {TabViewModule} from "primeng/tabview";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {ContextMenuModule} from "primeng/contextmenu";
import {ResponseInterceptor} from "../model/responseinterceptor";
import {CardModule} from "primeng/card";
import {PlayerProgressbarComponent} from "./playerprogressbar/player-progressbar.component";
import {StatsDialog} from "./dialogs/stats.dialog";
import {DropdownModule} from "primeng/dropdown";
import {SplitterModule} from "primeng/splitter";
import {ListboxModule} from "primeng/listbox";
import {CatalogueService} from "../services/catalogueservice";
import {TuneService} from "../services/tuneservice";
import {StatsService} from "../services/statsservice";
import {ResultDialog} from "./dialogs/result.dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {MeasureSelectorComponent} from "./measureselector/measure-selector.component";
import {RangeSelectorComponent} from "./rangeselector/range-selector.component";
import {HomeButton} from "./menu/buttons/home/home.button";
import {StatsButton} from "./menu/buttons/stats/stats.button";
import {SettingsButton} from "./menu/buttons/settings/settings.button";
import {DownloadButton} from "./menu/buttons/download/download.button";
import {FullscreenButton} from "./menu/buttons/fullscreen/fullscreen.button";
import {MenuDialog} from "./dialogs/menu.dialog";

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerWrapperComponent,
    ButtonKeyboardComponent,
    LeftButtonKeyboardComponent,
    RightButtonKeyboardComponent,
    PianoKeyboardComponent,
    PlayerSliderComponent,
    PlayerProgressbarComponent,
    PlayerControlsComponent,
    AboutDialog,
    SettingsDialog,
    LeftHandLayoutDialog,
    RightHandLayoutDialog,
    StatsDialog,
    MenuDialog,
    ResultDialog,
    MeasureSelectorComponent,
    RangeSelectorComponent,
    HomeButton,
    StatsButton,
    SettingsButton,
    DownloadButton,
    FullscreenButton
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
    TabViewModule,
    ToggleButtonModule,
    FlexLayoutModule,
    SelectButtonModule,
    ProgressSpinnerModule,
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
    InfoService, CatalogueService, TuneService, StatsService,
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
