import Konva from "konva";
import {PlayerComponent} from "../../app/player/player.component";
import {InfoService} from "../../services/infoservice";
import {SELECTION_HANDLE_HEIGHT, setPointerCursor} from "../constants";
import {DestroyableComponent} from "../destroyablecomponent";
import {PlayerMode} from "../enums/playermode";
import {TuneService} from "../../services/tuneservice";

export class RemoveSelectionButtonCircleGroup extends DestroyableComponent {
  selectionButtonCircle!: Konva.Circle;
  removalSymbol!: Konva.Path;

  constructor(public playerComponent: PlayerComponent,
              public infoService: InfoService,
              public tuneService: TuneService,
              public selectionWidth: number
  ) {

    super({
        x: selectionWidth / 2,
        y: (tuneService.tuneModel.value.tune.sheetHeight / 2),
      }
    );
    this.selectionButtonCircle = new Konva.Circle({
      x: 0,
      y: 0,
      radius: SELECTION_HANDLE_HEIGHT / 2,
      stroke: "#ffffff",
      strokeWidth: 1
    });

    let val: number = 10;
    this.removalSymbol = new Konva.Path({
      x: 0,
      y: 0,
      data: 'M0 0 L' + val + ' ' + val + ' L-' + val + ' -' + val + ' L0 0 L' + val + ' -' + val + ' L-' + val + ' ' + val,
      stroke: "#ffffff",
      strokeWidth: 3
    });

    this.on('click', function () {
      this.tuneService.selectionRemovedTrigger.next(true);
      playerComponent.removeSelection();
    });

    setPointerCursor(this, playerComponent);

    this.add(this.selectionButtonCircle);
    this.add(this.removalSymbol);

    infoService.pausedTrigger.asObservable().subscribe(
      paused => {
        this.visible(paused.valueOf() || infoService.settings.mode == PlayerMode.WAIT);
      });
  }
}
