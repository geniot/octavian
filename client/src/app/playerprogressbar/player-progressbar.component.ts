import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {InfoService} from "../../services/infoservice";
import {DestroyableComponent} from "../../model/destroyablecomponent";

@Component({
  selector: 'app-player-progressbar',
  templateUrl: './player-progressbar.component.html',
  styleUrls: ['./player-progressbar.component.css']
})
export class PlayerProgressbarComponent extends DestroyableComponent implements OnInit {
  progressValue: number = 0;

  constructor(public infoService: InfoService, private cdr: ChangeDetectorRef) {
    super();

  }

  ngOnInit(): void {
    this.subscriptions.push(this.infoService.progressValue.asObservable().subscribe(
      progressValue => {
        if (this.infoService.settings.leftHand &&
          this.infoService.settings.rightHand &&
          this.infoService.playerComponent.loopHandler != null &&
          this.infoService.playerComponent.sheetGroup != null &&
          !this.infoService.playerComponent.loopHandler.hasSelection()
        ) {

          let newPercent: number = Math.round(progressValue.valueOf());
          if (newPercent == this.progressValue + 1) {
            this.progressValue = newPercent;
            if (this.progressValue == 100) {
              this.infoService.playerComponent.sheetGroup.noteChecker.hundredPercentPlayed = true;
              this.infoService.playerComponent.sheetGroup.noteChecker.submitStats();
            }
          }
          if (this.progressValue != newPercent) {
            this.progressValue = 0;
          }
        } else {
          this.progressValue = 0;
        }
        this.cdr.detectChanges();
      }));
  }

}
