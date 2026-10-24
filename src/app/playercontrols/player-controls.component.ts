import {Component, HostListener, OnInit} from '@angular/core';
import {InfoService} from "../../services/infoservice";
import {HandType} from "../../model/enums/handtype";
import {DestroyableComponent} from "../../model/destroyablecomponent";
import {PlayerMode} from "../../model/enums/playermode";
import {TuneService} from "../../services/tuneservice";

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.css']
})
export class PlayerControlsComponent extends DestroyableComponent implements OnInit {
  HandType = HandType;
  isSpaceDown: boolean = false;

  constructor(public infoService: InfoService,
              public tuneService: TuneService) {
    super();
  }

  ngOnInit(): void {
  }

  onHandClick(handType: HandType): void {
    this.infoService.progressValue.next(0);
    if (handType == HandType.LEFT_HAND) {
      this.infoService.settings.leftHand = !this.infoService.settings.leftHand;
    } else {
      this.infoService.settings.rightHand = !this.infoService.settings.rightHand;
    }
    if (!this.infoService.settings.rightHand && !this.infoService.settings.leftHand) {
      if (handType == HandType.RIGHT_HAND) {
        this.infoService.settings.leftHand = true;
      } else {
        this.infoService.settings.rightHand = true;
      }
    }
    this.infoService.handChangedTrigger.next(true);
    this.infoService.unsetKeysTrigger.next(true);

    if (this.infoService.settings.mode == PlayerMode.WAIT) {
      this.infoService.playerComponent.loopHandler.playLoop(false);
    }
  }

  trash(): void {
    this.infoService.progressValue.next(0);
    this.infoService.trashTrigger.next(true);
  }

  onPlayClick() {
    if (this.infoService.settings.mode == PlayerMode.WAIT) {
      this.trash();
    } else {
      if (this.infoService.pausedTrigger.value) {
        this.tuneService.loadInstrument(() => {
          this.infoService.playerComponent.loopHandler.play();
        });
      } else {
        this.infoService.playerComponent.loopHandler.pause();
      }
    }
  }

  @HostListener('document:keydown.space', ['$event'])
  handleKeyboardDownEvent(event: KeyboardEvent) {
    if (!this.isSpaceDown) {
      this.isSpaceDown = true;
      this.onPlayClick();
    }
  }

  @HostListener('document:keyup.space', ['$event'])
  handleKeyboardUpEvent(event: KeyboardEvent) {
    this.isSpaceDown = false;
  }

  protected readonly PlayerMode = PlayerMode;
}
