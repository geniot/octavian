import Konva from "konva";
import {PlayerComponent} from "../../app/player/player.component";
import {InfoService} from "../../services/infoservice";
import {SELECTION_AREA_FILL} from "../constants";
import {TuneService} from "../../services/tuneservice";

export class PlayHeadGroup extends Konva.Rect {
  constructor(public playerComponent: PlayerComponent, public infoService: InfoService, public tuneService: TuneService) {
    super({
        fill: SELECTION_AREA_FILL
      }
    );
  }

  onResized() {
    if (this.playerComponent.sheetGroup != null) {

      this.x(
        this.playerComponent.stage.width() / 2
        - this.tuneService.tuneModel.value.tune.playHeadWidth * this.playerComponent.scaleFactor / 2
        - this.playerComponent.sheetGroup.x()
      );

      this.width(this.tuneService.tuneModel.value.tune.playHeadWidth * this.playerComponent.scaleFactor);
      this.height(this.tuneService.tuneModel.value.tune.sheetHeight * this.playerComponent.scaleFactor);

    }
  }
}
