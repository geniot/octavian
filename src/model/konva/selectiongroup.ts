import Konva from "konva";
import {RemoveSelectionButtonCircleGroup} from "./removeselectionbuttoncirclegroup";
import {LeftHandleRectGroup} from "./lefthandlerectgroup";
import {RightHandleRectGroup} from "./righthandlerectgroup";
import {SELECTION_AREA_FILL} from "../constants";
import {InfoService} from "../../services/infoservice";
import {PlayerComponent} from "../../app/player/player.component";
import {DestroyableComponent} from "../destroyablecomponent";
import {TuneService} from "../../services/tuneservice";
import {Tune} from "../tune";

export class SelectionGroup extends DestroyableComponent {
  removeSelectionButtonCircleGroup!: RemoveSelectionButtonCircleGroup;
  leftHandleRectGroup!: LeftHandleRectGroup;
  rightHandleRectGroup!: RightHandleRectGroup;
  selectionRect!: Konva.Rect;

  constructor(public playerComponent: PlayerComponent,
              public infoService: InfoService,
              public tuneService: TuneService,
              public selectionFrom: number,
              public selectionWidth: number
  ) {
    super();

    let tune: Tune = this.tuneService.tuneModel.value.tune;
    //adjusting fromX if we are at the end of the sheet
    if (this.selectionFrom > tune.sheetWidth - selectionWidth - tune.playHeadWidth) {
      this.selectionFrom = tune.sheetWidth - selectionWidth;
    }

    this.x(this.selectionFrom * this.playerComponent.scaleFactor);
    this.y(0);
    this.id("selection");
    this.scaleX(this.playerComponent.scaleFactor);
    this.scaleY(this.playerComponent.scaleFactor);

    this.selectionRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: selectionWidth,
      height: tune.sheetHeight,
      fill: SELECTION_AREA_FILL
    });

    this.removeSelectionButtonCircleGroup = new RemoveSelectionButtonCircleGroup(this.playerComponent, this.infoService, this.tuneService, this.selectionWidth);
    this.leftHandleRectGroup = new LeftHandleRectGroup(playerComponent, this, this.infoService, this.tuneService);
    this.rightHandleRectGroup = new RightHandleRectGroup(playerComponent, this, this.infoService, this.tuneService, this.selectionWidth);

    this.containers.push(this.removeSelectionButtonCircleGroup);
    this.containers.push(this.leftHandleRectGroup);
    this.containers.push(this.rightHandleRectGroup);

    this.add(this.selectionRect);
    this.add(this.removeSelectionButtonCircleGroup);
    this.add(this.leftHandleRectGroup);
    this.add(this.rightHandleRectGroup);
  }

  onResized(): void {
    this.scaleX(this.playerComponent.scaleFactor);
    this.scaleY(this.playerComponent.scaleFactor);
    this.x(this.selectionFrom * this.playerComponent.scaleFactor);
  }

  calcSelectionTo(): number {
    return this.calcSelectionFrom() + this.selectionRect.width();
  }

  calcSelectionFrom() {
    return this.playerComponent.selectionGroup.selectionRect.getAbsolutePosition(this.playerComponent.sheetGroup).x / this.playerComponent.scaleFactor;
  }
}
