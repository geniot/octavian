import Konva from "konva";
import {PlayerComponent} from "../../app/player/player.component";
import {InfoService} from "../../services/infoservice";
import {HAND_SCREEN_FILL_COLOR} from "../constants";
import {PlayHeadGroup} from "./playheadgroup";
import {ChangeEvent} from "../changeevent";
import {DestroyableComponent} from "../destroyablecomponent";
import {NoteChecker} from "./notechecker";
import {PlayerMode} from "../enums/playermode";
import {TuneService} from "../../services/tuneservice";
import {Tune} from "../tune";
import {StatsService} from "../../services/statsservice";
import {UserService} from "../../services/userservice";
import {ScoreImageGroup} from "./scoreimagegroup";

export class SheetGroup extends DestroyableComponent {
  //cover screens to hide a little bit upper or lower part of the score
  rightHandleScreenRect!: Konva.Rect;
  leftHandleScreenRect!: Konva.Rect;
  playHeadGroup!: PlayHeadGroup;
  scoreImageGroup!: ScoreImageGroup;
  noteChecker!: NoteChecker;

  constructor(public playerComponent: PlayerComponent,
              public infoService: InfoService,
              public tuneService: TuneService,
              public statsService: StatsService,
              public userService: UserService
  ) {
    super({
        draggable: true
      }
    );
    let _this = this;

    this.on('dragend', (evt) => {
      if (evt.target._id == _this._id) {
        this.infoService.onDragEnd();
      }
    });

    this.on('dragmove', () => {
      infoService.progressValue.next(0);

      let leftLimitRelative: number = tuneService.tuneModel.value.tune.points[0].offsetX + tuneService.tuneModel.value.tune.playHeadWidth / 2;
      let rightLimitRelative: number = tuneService.tuneModel.value.tune.sheetWidth - tuneService.tuneModel.value.tune.playHeadWidth / 2;

      let leftLimitAbsolute: number = this.playerComponent.relativeToAbsolute(leftLimitRelative);
      let rightLimitAbsolute: number = this.playerComponent.relativeToAbsolute(rightLimitRelative);

      let nextOffsetAbsolute = _this.x();

      if (nextOffsetAbsolute > leftLimitAbsolute) {
        nextOffsetAbsolute = leftLimitAbsolute;
      }
      if (nextOffsetAbsolute < rightLimitAbsolute) {
        nextOffsetAbsolute = rightLimitAbsolute;
      }

      let nextSliderValueRelative: number = Math.round(this.playerComponent.absoluteToRelative(nextOffsetAbsolute));
      this.infoService.sliderValue.next(new ChangeEvent(nextSliderValueRelative, this));

      _this.x(nextOffsetAbsolute);
      _this.y(0);
    });

    this.on('xChange', () => {
      _this.playHeadGroup.onResized();
    });

    this.on('mouseenter', function () {
      playerComponent.stage.container().style.cursor = 'grab';
    });

    this.on('mouseleave', function () {
      playerComponent.stage.container().style.cursor = 'default';
    });

    this.rightHandleScreenRect = new Konva.Rect({
      fill: HAND_SCREEN_FILL_COLOR,
      opacity: 0.8,
      visible: false
    });

    this.leftHandleScreenRect = new Konva.Rect({
      fill: HAND_SCREEN_FILL_COLOR,
      opacity: 0.8,
      visible: false
    });

    this.playHeadGroup = new PlayHeadGroup(playerComponent, this.infoService, this.tuneService);
    this.scoreImageGroup = new ScoreImageGroup(playerComponent, this.infoService, this.tuneService);
    this.noteChecker = new NoteChecker(this.infoService, this.tuneService, this.statsService, this.userService);

    this.add(this.scoreImageGroup);
    this.add(this.noteChecker);
    this.add(this.rightHandleScreenRect);
    this.add(this.leftHandleScreenRect);
    this.add(this.playHeadGroup);

    this.containers.push(this.scoreImageGroup);
    this.containers.push(this.noteChecker);
    this.containers.push(this.playHeadGroup);

    this.subscriptions.push(infoService.pausedTrigger.asObservable().subscribe(
      pausedTrigger => {
        this.draggable(
          infoService.settings.mode == PlayerMode.FINGERING ||
          infoService.settings.mode == PlayerMode.WAIT ||
          pausedTrigger.valueOf());
      }));

    this.subscriptions.push(infoService.sliderValue.asObservable().subscribe(
      event => {
        if (event.value > -1) {
          _this.updateX(event.value);
        }
      }));

    this.subscriptions.push(infoService.handChangedTrigger.asObservable().subscribe(
      handChanged => {
        this.rightHandleScreenRect.visible(!infoService.settings.rightHand);
        this.leftHandleScreenRect.visible(!infoService.settings.leftHand);
      }));
  }

  onResized() {
    this.updateX(this.infoService.sliderValue.value.value);
    let tune: Tune = this.tuneService.tuneModel.value.tune;

    this.width(tune.sheetWidth * this.playerComponent.scaleFactor);
    this.height(tune.sheetHeight * this.playerComponent.scaleFactor);

    this.scoreImageGroup.onResized();

    this.rightHandleScreenRect.width(tune.sheetWidth * this.playerComponent.scaleFactor);
    this.rightHandleScreenRect.height(tune.sheetHeight / 2 * this.playerComponent.scaleFactor);

    this.leftHandleScreenRect.y(tune.sheetHeight / 2 * this.playerComponent.scaleFactor);
    this.leftHandleScreenRect.width(tune.sheetWidth * this.playerComponent.scaleFactor);
    this.leftHandleScreenRect.height(tune.sheetHeight / 2 * this.playerComponent.scaleFactor);

    this.playHeadGroup.onResized();

    this.noteChecker.scaleX(this.playerComponent.scaleFactor);
    this.noteChecker.scaleY(this.playerComponent.scaleFactor);
  }

  updateX(offset: number): void {
    this.x(this.playerComponent.relativeToAbsolute(offset));
  }
}
