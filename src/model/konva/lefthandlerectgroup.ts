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

export class LeftHandleRectGroup extends HandleRectGroup {
  lastValidLeftHandleX: number;
  leftHandleRect!: Konva.Rect;
  leftHandleSymbol!: Konva.Path;

  constructor(public override playerComponent: PlayerComponent,
              public selectionGroup: SelectionGroup,
              public override infoService: InfoService,
              public override tuneService: TuneService) {
    super(playerComponent, {
        id: "leftHandleRectGroup",
        x: -SELECTION_HANDLE_WIDTH / 2,
        y: (tuneService.tuneModel.value.tune.sheetHeight - SELECTION_HANDLE_HEIGHT) / 2,
        draggable: true,
      },
      infoService,
      tuneService
    );

    let tune:Tune = this.tuneService.tuneModel.value.tune;
    this.lastValidLeftHandleX = (-tune.playHeadWidth / 2) * playerComponent.scaleFactor;

    let _this = this;

    this.leftHandleRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: SELECTION_HANDLE_WIDTH,
      height: SELECTION_HANDLE_HEIGHT,
      fill: SELECTION_HANDLE_FILL_COLOR,
      stroke: SELECTION_AREA_FILL,
      strokeWidth: 1,
      cornerRadius: 5
    });

    this.leftHandleSymbol = new Konva.Path({
      x: 0,
      y: 0,
      data: 'M15 5 L5 20 L15 35',
      stroke: 'orange',
      strokeWidth: 3
    });

    this.on('dragmove', (evt) => {
      let newX = _this.getAbsolutePosition(playerComponent.sheetGroup).x;
      let newY = (tune.sheetHeight - SELECTION_HANDLE_HEIGHT) / 2 * playerComponent.scaleFactor;

      let leftLimit: number = (tune.points[0].offsetX - tune.playHeadWidth / 2)
        * this.playerComponent.scaleFactor
        - Math.round(this.playerComponent.scaleFactor) * 4;

      let rightLimit: number = (tune.sheetWidth - SELECTION_MIN - tune.playHeadWidth / 2)
        * this.playerComponent.scaleFactor;

      if (newX < leftLimit) {
        newX = leftLimit;
      }
      if (newX > rightLimit) {
        newX = rightLimit;
      }

      _this.setAbsolutePosition({x: newX + playerComponent.sheetGroup.x(), y: newY});

      selectionGroup.selectionRect.setAbsolutePosition({
        x: newX + playerComponent.sheetGroup.x() + (SELECTION_HANDLE_WIDTH * this.playerComponent.scaleFactor) / 2,
        y: selectionGroup.selectionRect.getAbsolutePosition().y
      });

      if (selectionGroup.rightHandleRectGroup.getAbsolutePosition().x - selectionGroup.leftHandleRectGroup.getAbsolutePosition().x < SELECTION_MIN * this.playerComponent.scaleFactor) {
        selectionGroup.rightHandleRectGroup.setAbsolutePosition({
          x: newX + playerComponent.sheetGroup.x() + SELECTION_MIN * this.playerComponent.scaleFactor,
          y: newY
        });
      }

      selectionGroup.selectionRect.width((selectionGroup.rightHandleRectGroup.getAbsolutePosition().x - selectionGroup.leftHandleRectGroup.getAbsolutePosition().x) / this.playerComponent.scaleFactor);

      selectionGroup.removeSelectionButtonCircleGroup.setAbsolutePosition(
        {
          x: newX
            + playerComponent.sheetGroup.x()
            + selectionGroup.selectionRect.width() / 2 * this.playerComponent.scaleFactor
            + selectionGroup.removeSelectionButtonCircleGroup.selectionButtonCircle.radius() / 2 * this.playerComponent.scaleFactor,
          y: selectionGroup.removeSelectionButtonCircleGroup.getAbsolutePosition().y
        }
      );
    });

    this.add(this.leftHandleRect);
    this.add(this.leftHandleSymbol);
  }
}
