import Konva from "konva";
import {PlayerComponent} from "../../app/player/player.component";
import {InfoService} from "../../services/infoservice";
import {SELECTION_HANDLE_HEIGHT, SELECTION_HANDLE_WIDTH} from "../constants";
import {DestroyableComponent} from "../destroyablecomponent";
import {PlayerMode} from "../enums/playermode";
import {TuneService} from "../../services/tuneservice";

export class HandleRectGroup extends DestroyableComponent {
  constructor(public playerComponent: PlayerComponent,
              config: any,
              public infoService: InfoService,
              public tuneService: TuneService) {
    super(config);
    this.on('mouseenter', function () {
      playerComponent.stage.container().style.cursor = 'e-resize';
    });

    this.on('mousemove', function () {
      playerComponent.stage.container().style.cursor = 'e-resize';
    });

    this.on('mouseleave', function () {
      playerComponent.stage.container().style.cursor = 'grab';
    });

    infoService.pausedTrigger.asObservable().subscribe(
      paused => {
        this.visible(paused.valueOf() || infoService.settings.mode == PlayerMode.WAIT);
      });
  }

  onResized(handleRect: Konva.Rect, handleSymbol: Konva.Path) {
    this.y((this.tuneService.tuneModel.value.tune.sheetHeight - SELECTION_HANDLE_HEIGHT) / 2 * this.playerComponent.scaleFactor);
    handleRect.width(SELECTION_HANDLE_WIDTH * this.playerComponent.scaleFactor);
    handleRect.height(SELECTION_HANDLE_HEIGHT * this.playerComponent.scaleFactor);
    handleSymbol.scaleX(this.playerComponent.scaleFactor);
    handleSymbol.scaleY(this.playerComponent.scaleFactor);
  }
}
