import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";
import {InfoService} from "../../services/infoservice";
import {DomSanitizer} from "@angular/platform-browser";
import {SplitLayoutHandler} from "../../model/splitlayouthandler";
import {PlayerMode} from "../../model/enums/playermode";
import {CatalogueService} from "../../services/catalogueservice";
import {TuneService} from "../../services/tuneservice";
import {UserService} from "../../services/userservice";
import {StatsService} from "../../services/statsservice";
import {ConfirmationService} from "primeng/api";
import {UnlockService} from "../../services/unlockservice";
import {Role} from "../../model/enums/role";

@Component({
  selector: 'app-player-wrapper',
  templateUrl: './player-wrapper.component.html',
  styleUrls: ['./player-wrapper.component.css'],
})
export class PlayerWrapperComponent extends SplitLayoutHandler implements OnInit, OnDestroy {

  state: string = 'default';
  protected readonly PlayerMode = PlayerMode;

  constructor(@Inject(DOCUMENT) public override document: any,
              public override infoService: InfoService,
              public override tuneService: TuneService,
              public override catalogueService: CatalogueService,
              public override userService: UserService,
              public override statsService: StatsService,
              public override unlockService: UnlockService,
              public override sanitizer: DomSanitizer,
              public override cdr: ChangeDetectorRef,
              public override router: Router,
              public override confirmationService: ConfirmationService
  ) {

    super(document, infoService, tuneService, catalogueService, userService, statsService, unlockService, sanitizer, cdr, router, confirmationService);

    this.tuneService.tuneLoadedTrigger.next(false);
    this.infoService.settings.routerUrl = router.url;
    if (this.infoService.settings.mode == PlayerMode.FINGERING) {
      this.infoService.settings.mode = PlayerMode.PLAY;
    }
    this.tuneService.loadScore();//launches a chain of load actions
  }


  override ngOnInit(): void {
    this.subscriptions.push(this.infoService.connectedTrigger.asObservable().subscribe(
      connected => {
        this.cdr.detectChanges();
      }));

    super.ngOnInit();
    //debug
    // let statsModel = new StatsModel();
    // statsModel.submittedStats = new StatsRecord();
    // statsModel.submittedStats.lh = "0000000000000";
    // statsModel.submittedStats.rh = "0000000000000";
    // this.statsService.statsModel.next(statsModel);
    // this.statsService.isLoading = false;
    // this.infoService.dialogsHandler.isShowResultDialog = true;
  }


  onWaitModeClick(): void {
    this.tuneService.loadInstrument(() => {
      this.infoService.settings.mode = this.infoService.settings.mode == PlayerMode.WAIT ? PlayerMode.PLAY : PlayerMode.WAIT;
      this.infoService.waitModeTrigger.next(true);
    });
  }

  protected readonly Role = Role;
}
