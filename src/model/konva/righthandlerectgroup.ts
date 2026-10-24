import Konva from "konva";
import {HandleRectGroup} from "./handlerectgroup";
import {PlayerComponent} from "../../app/player/player.component";
import {InfoService} from "../../services/infoservice";
import {
  SELECTION_AREA_FILL,
  SELECTION_HANDLE_FILL_COLOR,
  SELECTION_HANDLE_HEIGHT,
  SELECTION_HANDLE_WIDTH,
  SELECTION_MIN
} from "../constants";
import {SelectionGroup} from "./selectiongroup";
import {TuneService} from "../../services/tuneservice";
import {Tune} from "../tune";

export class RightHandleRectGroup extends HandleRectGroup {
  lastValidRightHandleX!: number;
  rightHandleRect!: Konva.Rect;
  rightHandleSymbol!: Konva.Path;

  constructor(public override playerComponent: PlayerComponent,
              public selectionGroup: SelectionGroup,
              public override infoService: InfoService,
              public override tuneService: TuneService,
              public selectionWidth: number
  ) {
    super(playerComponent, {
        id: "rightHandleRectGroup",
        x: selectionWidth - SELECTION_HANDLE_WIDTH / 2,
        y: (tuneService.tuneModel.value.tune.sheetHeight - SELECTION_HANDLE_HEIGHT) / 2,
        draggable: true,
      },
      infoService,
      tuneService
    );
    this.lastValidRightHandleX = this.x();
    let _this = this;
    this.rightHandleRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: SELECTION_HANDLE_WIDTH,
      height: SELECTION_HANDLE_HEIGHT,
      fill: SELECTION_HANDLE_FILL_COLOR,
      stroke: SELECTION_AREA_FILL,
      strokeWidth: 1,
      cornerRadius: 5
    });

    this.rightHandleSymbol = new Konva.Path({
      x: 0,
      y: 0,
      data: 'M5 5 L15 20 L5 35',
      stroke: 'orange',
      strokeWidth: 3
    });

    let tune: Tune = this.tuneService.tuneModel.value.tune;
    this.on('dragmove', () => {
      let newX = _this.getAbsolutePosition(playerComponent.sheetGroup).x;
      let newY = (tune.sheetHeight - SELECTION_HANDLE_HEIGHT) / 2 * playerComponent.scaleFactor;

      let leftLimit: number = (tune.points[0].offsetX + SELECTION_MIN - tune.playHeadWidth / 2) * this.playerComponent.scaleFactor;
      let rightLimit: number = (tune.sheetWidth - tune.playHeadWidth / 2) * this.playerComponent.scaleFactor;

      if (newX < leftLimit) {
        newX = leftLimit;
      }
      if (newX > rightLimit) {
        newX = rightLimit;
      }

      _this.setAbsolutePosition({x: newX + playerComponent.sheetGroup.x(), y: newY});


      if (selectionGroup.rightHandleRectGroup.getAbsolutePosition().x - selectionGroup.leftHandleRectGroup.getAbsolutePosition().x < SELECTION_MIN * this.playerComponent.scaleFactor) {
        selectionGroup.leftHandleRectGroup.setAbsolutePosition({
          x: newX + playerComponent.sheetGroup.x() - SELECTION_MIN * this.playerComponent.scaleFactor,
          y: newY
        });
      }

      selectionGroup.selectionRect.width((selectionGroup.rightHandleRectGroup.getAbsolutePosition().x - selectionGroup.leftHandleRectGroup.getAbsolutePosition().x) / this.playerComponent.scaleFactor);
      selectionGroup.selectionRect.setAbsolutePosition({
        x: selectionGroup.leftHandleRectGroup.getAbsolutePosition().x
          + selectionGroup.rightHandleRectGroup.rightHandleRect.width() / 2 * this.playerComponent.scaleFactor,
        y: selectionGroup.selectionRect.getAbsolutePosition().y
      });

      selectionGroup.removeSelectionButtonCircleGroup.setAbsolutePosition(
        {
          x: newX
            + playerComponent.sheetGroup.x()
            - selectionGroup.selectionRect.width() / 2 * this.playerComponent.scaleFactor
            + selectionGroup.removeSelectionButtonCircleGroup.selectionButtonCircle.radius() / 2 * this.playerComponent.scaleFactor,
          y: selectionGroup.removeSelectionButtonCircleGroup.getAbsolutePosition().y
        }
      );
    });

    this.add(this.rightHandleRect);
    this.add(this.rightHandleSymbol);
  }
}
