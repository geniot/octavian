import Konva from "konva";
import {PlayerComponent} from "../../app/player/player.component";
import {InfoService} from "../../services/infoservice";
import {SELECTION_AREA_FILL, SELECTION_INIT, setPointerCursor} from "../constants";
import {DestroyableComponent} from "../destroyablecomponent";
import {PlayerMode} from "../enums/playermode";
import {TuneService} from "../../services/tuneservice";
import {Tune} from "../tune";


export class SelectButtonCircleGroup extends DestroyableComponent {
  selectionButtonCircle!: Konva.Circle;
  selectionSymbol1!: Konva.Path;
  selectionSymbol2!: Konva.Path;

  selectionSymbol1Init: { x: number, y: number } = {x: -18, y: -20};
  selectionSymbol2Init: { x: number, y: number } = {x: -2, y: -20};

  constructor(public playerComponent: PlayerComponent,
              public infoService: InfoService,
              public tuneService: TuneService,
              public isFingering: boolean) {
    super({
      x: playerComponent.stage.width() / 2,
      y: playerComponent.stage.width() / 2,
      visible: !isFingering
    });

    this.selectionButtonCircle = new Konva.Circle({
      x: 0,
      y: 0,
      radius: this.tuneService.tuneModel.value.tune.playHeadWidth,
      fill: '#ffffff',
      strokeWidth: 1,
      stroke: SELECTION_AREA_FILL,
      opacity: 0.3,
      visible: !isFingering
    });

    this.selectionSymbol1 = new Konva.Path({
      x: this.selectionSymbol1Init.x,
      y: this.selectionSymbol1Init.y,
      data: 'M15 5 L5 20 L15 35',
      stroke: 'orange',
      strokeWidth: 3,
      visible: !isFingering
    });

    this.selectionSymbol2 = new Konva.Path({
      x: this.selectionSymbol2Init.x,
      y: this.selectionSymbol2Init.y,
      data: 'M5 5 L15 20 L5 35',
      stroke: 'orange',
      strokeWidth: 3,
      visible: !isFingering
    });

    this.on('click', function () {
      let tune: Tune = this.tuneService.tuneModel.value.tune;
      let selectionFrom = this.playerComponent.absoluteToRelative(this.playerComponent.sheetGroup.x()) - tune.playHeadWidth / 2;
      let selectionWidth = SELECTION_INIT;
      playerComponent.createSelection(selectionFrom, selectionWidth);
    });

    setPointerCursor(this, playerComponent);

    this.add(this.selectionButtonCircle);
    this.add(this.selectionSymbol1);
    this.add(this.selectionSymbol2);

    infoService.pausedTrigger.asObservable().subscribe(
      pausedTrigger => {
        this.visible((!playerComponent.loopHandler.hasSelection() && infoService.settings.mode == PlayerMode.WAIT) || (pausedTrigger.valueOf() && !playerComponent.loopHandler.hasSelection()));
      });
  }

  public onResized(): void {
    this.x(this.playerComponent.stage.width() / 2);
    this.y(this.playerComponent.stage.height() / 2);

    this.scaleX(this.playerComponent.scaleFactor);
    this.scaleY(this.playerComponent.scaleFactor);
  }
}
