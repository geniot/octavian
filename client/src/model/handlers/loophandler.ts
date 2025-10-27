import {PlayerComponent} from "../../app/player/player.component";
import {InfoService} from "../../services/infoservice";
import {Point} from "../point";
import {soundPoint} from "../constants";
import {ReplayTween} from "../konva/replaytween";
import Konva from "konva";
import {ChangeEvent} from "../changeevent";
import {PlayerMode} from "../enums/playermode";
import {TuneService} from "../../services/tuneservice";
import {Tune} from "../tune";

/**
 * This is the heart of the player.
 */
export class LoopHandler {
  replayTween!: ReplayTween;

  constructor(public playerComponent: PlayerComponent,
              public infoService: InfoService,
              public tuneService: TuneService) {
  }

  playLoop(isAutoPlay: boolean): void {
    if (!this.infoService.pausedTrigger.value) {
      let tune: Tune = this.tuneService.tuneModel.value.tune;
      let points: Point[] = tune.points;
      let thisPoint: Point = points[this.playerComponent.playPointer];

      let thisSheetOffset = isAutoPlay ? thisPoint.offsetX : this.playerComponent.getSheetOffset();
      let playbackRate: number = (this.infoService.settings.mode == PlayerMode.WAIT) ?
        100 : this.infoService.settings.playbackRate;

      if (this.hasSelection()) {
        if (thisSheetOffset >= Math.round(this.playerComponent.selectionGroup.calcSelectionTo() - tune.playHeadWidth) ||
          thisSheetOffset < Math.round(this.playerComponent.selectionGroup.calcSelectionFrom())
        ) {
          this.scrollToSelectionStart();
          return;
        }
      }

      let thisPointerOffset: number = this.playerComponent.playPointer < points.length ? points[this.playerComponent.playPointer].offsetX : tune.sheetWidth;
      let nextPointerOffset: number = this.playerComponent.playPointer < points.length - 1 ? points[this.playerComponent.playPointer + 1].offsetX : tune.sheetWidth;

      if (this.hasSelection()) {
        let rightHandleOffset: number = Math.round(this.playerComponent.selectionGroup.calcSelectionTo() - tune.playHeadWidth);
        if (nextPointerOffset > rightHandleOffset) {
          nextPointerOffset = rightHandleOffset;
        }
      }

      let nextSheetOffset = nextPointerOffset + tune.playHeadWidth / 2;
      let nextSheetOffsetLimit = tune.sheetWidth - tune.playHeadWidth / 2;
      if (nextSheetOffset > nextSheetOffsetLimit) {
        nextSheetOffset = nextSheetOffsetLimit;
      }

      let shouldAdjust: boolean = false;
      if (thisSheetOffset != thisPointerOffset &&
        thisSheetOffset != tune.sheetWidth - tune.playHeadWidth / 2) {
        shouldAdjust = true;
      }

      let moveDuration: number;
      if (shouldAdjust) {
        moveDuration = (Math.abs(this.playerComponent.relativeToAbsolute(nextSheetOffset) - this.playerComponent.sheetGroup.x()) / 1000) * (100 / playbackRate);
      } else {
        moveDuration = (this.getPointDuration(this.playerComponent.playPointer) / 1000) * (100 / playbackRate);
        if (this.infoService.settings.mode == PlayerMode.PLAY || thisPoint.notesOff != null) {
          soundPoint(thisPoint, true, this.infoService, this.tuneService);
        }
      }

      //speeding up in wait mode if waitPointer goes far ahead
      // if (this.infoService.model.value.waitModeOn && pointsDelta > 2) {
      //   console.log("speed up");
      //   moveDuration = moveDuration / pointsDelta;
      // }

      if ((this.infoService.settings.mode == PlayerMode.WAIT || this.infoService.settings.mode == PlayerMode.FINGERING)
        && this.playerComponent.playPointer == this.playerComponent.waitPointer) {
        soundPoint(thisPoint, false, this.infoService, this.tuneService);
        if (this.infoService.settings.mode == PlayerMode.FINGERING) {
          let _this = this;
          setTimeout(function () {
            _this.infoService.fingeringComponent.initInput();
          }, 0);
        }
        return;
      } else {
        if (this.playerComponent.sheetGroup.x() != nextSheetOffset) {
          //console.log("Move duration: " + moveDuration);
          if (moveDuration < 0.01) {
            this.playerComponent.sheetGroup.x(this.playerComponent.relativeToAbsolute(nextSheetOffset));
            this.onLoopFinish();
          } else {
            if (this.replayTween != null) {
              this.replayTween.destroy();
            }
            this.replayTween = new ReplayTween({
              node: this.playerComponent.sheetGroup,
              duration: moveDuration,
              easing: Konva.Easings.Linear,
              onUpdate: () => {
                this.onTweenUpdate();
              },
              onFinish: () => {
                this.onLoopFinish();
              },
              x: this.playerComponent.relativeToAbsolute(nextSheetOffset)
            });
            this.replayTween.play();
          }
        } else if (this.playerComponent.playPointer == points.length - 1) {
          this.onTuneEnd();
        }
      }
    }
  }

  onLoopFinish(): void {
    let points: Point[] = this.tuneService.tuneModel.value.tune.points;
    this.onTweenUpdate();
    this.replayTween?.pause();
    if (this.playerComponent.playPointer < points.length - 1) {
      ++this.playerComponent.playPointer;
      this.playLoop(true);
    } else {
      this.onTuneEnd();
    }
  }

  onTweenUpdate(): void {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    let offset: number = this.playerComponent.absoluteToRelative(this.playerComponent.sheetGroup.x());
    this.infoService.sliderValue.next(new ChangeEvent(offset, this));
    if (this.infoService.settings.mode == PlayerMode.WAIT || this.infoService.settings.mode == PlayerMode.FINGERING) {
      let sheetOffsetLimit = tune.sheetWidth - tune.points[0].offsetX - tune.playHeadWidth / 2;
      let percent: number = (offset - tune.points[0].offsetX) * 100 / sheetOffsetLimit;
      this.infoService.progressValue.next(percent);
    }
  }

  getPointDuration(pointer: number): number {
    let points: Point[] = this.tuneService.tuneModel.value.tune.points;
    let thisPointTimestamp: number = points[pointer].timestamp;
    let nextPointTimestamp: number = pointer < points.length - 1 ? points[pointer + 1].timestamp : points[points.length - 1].timestamp + 35;
    return nextPointTimestamp - thisPointTimestamp;
  }

  scrollToSelectionStart(): void {
    this.infoService.unsetKeysTrigger.next(true);
    let nextSheetOffset: number = this.playerComponent.selectionGroup.calcSelectionFrom() + this.tuneService.tuneModel.value.tune.playHeadWidth / 2;
    this.scrollToSheetOffset(nextSheetOffset);
  }

  scrollToWaitPointer(): void {
    this.infoService.unsetKeysTrigger.next(true);
    this.infoService.progressValue.next(0);
    let points: Point[] = this.tuneService.tuneModel.value.tune.points;
    let nextPointerOffset: number = points[this.playerComponent.waitPointer].offsetX;
    let nextSheetOffset = nextPointerOffset + this.tuneService.tuneModel.value.tune.playHeadWidth / 2;
    this.scrollToSheetOffset(nextSheetOffset);
  }

  scrollToSheetOffset(nextSheetOffset: number): void {
    let moveDuration: number = Math.abs(this.playerComponent.relativeToAbsolute(nextSheetOffset) - this.playerComponent.sheetGroup.x()) / 1000;
    if (this.replayTween != null) {
      this.replayTween.destroy();
    }
    this.replayTween = new ReplayTween({
      node: this.playerComponent.sheetGroup,
      duration: moveDuration,
      easing: Konva.Easings.Linear,
      onUpdate: () => {
        this.onTweenUpdate();
      },
      onFinish: () => {
        this.onTweenUpdate();
        this.replayTween.pause();
        this.playerComponent.updatePointer();
        this.playLoop(false);
      },
      x: this.playerComponent.relativeToAbsolute(nextSheetOffset)
    });
    this.replayTween.play();
  }

  hasSelection(): boolean {
    return this.playerComponent.sheetGroup.find("#selection").length > 0;
  }


  onTuneEnd(): void {
    if (this.hasSelection()) {
      this.scrollToSelectionStart();
    } else {
      if (this.infoService.settings.mode == PlayerMode.PLAY) {
        this.pause();
      } else {
        this.infoService.unsetTuneKeysTrigger.next(true);
      }
    }
  }

  play(): void {
    this.infoService.pausedTrigger.next(false);
    if (this.hasSelection() && this.withinSelection()) {
      this.scrollToSelectionStart();
    } else {
      this.tuneService.selectionRemovedTrigger.next(true);
      this.infoService.playerComponent.removeSelection();
      this.playLoop(false);
    }
  }

  pause(): void {
    this.infoService.pausedTrigger.next(true);
    this.tuneService.getCurrentPlayer()?.stop();
    if (this.replayTween != null) {
      this.replayTween.pause();
    }
  }

  withinSelection(): boolean {
    let selectionStart: number = this.playerComponent.selectionGroup.calcSelectionFrom();
    let selectionEnd: number = this.playerComponent.selectionGroup.calcSelectionTo();
    let headerAt: number = this.playerComponent.getSheetOffset();
    let noise: number = this.tuneService.tuneModel.value.tune.playHeadWidth * 3;
    return headerAt >= selectionStart - noise && headerAt <= selectionEnd + noise;
  }

}
