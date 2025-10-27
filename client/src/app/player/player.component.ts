import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import Konva from "konva";
import {SheetGroup} from "../../model/konva/sheetgroup";
import {SelectButtonCircleGroup} from "../../model/konva/selectbuttoncirclegroup";
import {InfoService} from "../../services/infoservice";
import {binarySearch, getNextPointer, isTuneLoaded} from "../../model/constants";
import {DestroyableComponent} from "../../model/destroyablecomponent";
import {LoopHandler} from "../../model/handlers/loophandler";
import {SelectionGroup} from "../../model/konva/selectiongroup";
import {debounceTime} from "rxjs/operators";
import {PlayerMode} from "../../model/enums/playermode";
import {TuneService} from "../../services/tuneservice";
import {Tune} from "../../model/tune";
import {StatsService} from "../../services/statsservice";
import {UserService} from "../../services/userservice";
import Layer = Konva.Layer;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent extends DestroyableComponent implements AfterViewInit {

  @ViewChild('containerDiv') containerDiv!: ElementRef;
  @Input() isFingering: boolean = false;

  stage!: Konva.Stage;
  sheetGroup!: SheetGroup;
  selectionButtonCircleGroup!: SelectButtonCircleGroup;
  selectionGroup!: SelectionGroup;
  debugRect!: Konva.Rect;

  playPointer: number = 0;
  waitPointer: number = 0;

  scaleFactor: number = 1;

  loopHandler!: LoopHandler;

  constructor(public infoService: InfoService,
              public tuneService: TuneService,
              public statsService: StatsService,
              public userService: UserService
  ) {
    super();

    this.infoService.playerComponent = this;
    this.loopHandler = new LoopHandler(this, infoService, tuneService);
  }

  ngAfterViewInit(): void {
    this.scaleFactor = this.containerDiv.nativeElement.getBoundingClientRect().height / this.tuneService.tuneModel.value.tune.sheetHeight;
    this.stage = new Konva.Stage({
      container: 'container',
      width: this.containerDiv.nativeElement.getBoundingClientRect().width,
      height: this.containerDiv.nativeElement.getBoundingClientRect().height,
      visible: false
    });

    this.stage.add(this.initSheetLayer());
    this.stage.add(this.initPlayHeadControlLayer());

    let _this = this;
    setTimeout(function () {
      _this.onResized({isFirst: false});
      _this.stage.visible(true);
      _this.infoService.playerInitTrigger.next(true);
      // _this.createSelection();
    }, 0);

    this.subscriptions.push(
      this.infoService.playerInitTrigger.asObservable().pipe(debounceTime(100)).subscribe(
        playerInitTrigger => {
          if (playerInitTrigger.valueOf()) {
            this.init();
          }
        })
    );

    this.subscriptions.push(this.infoService.waitModeTrigger.asObservable().subscribe(
      waitModeTrigger => {
        this.init();
      }));

    this.subscriptions.push(this.tuneService.tuneModel.asObservable().subscribe(
      model => {
        // this.onResized({isFirst: false});
        this.playPointer = 0;
        this.init();
      }));

  }

  init(): void {
    if (isTuneLoaded(this.tuneService.tuneModel.value)) {
      if (this.infoService.settings.mode == PlayerMode.WAIT || this.infoService.settings.mode == PlayerMode.FINGERING) {
        this.updatePointer();
        this.loopHandler.play();
      } else {
        this.loopHandler.pause();
      }
    }
  }

  initSheetLayer(): Layer {
    let sheetLayer = new Konva.Layer();
    this.sheetGroup = new SheetGroup(this, this.infoService, this.tuneService, this.statsService, this.userService);
    this.containers.push(this.sheetGroup);
    sheetLayer.add(this.sheetGroup);
    return sheetLayer;
  }

  initPlayHeadControlLayer(): Layer {
    let playHeadControlLayer = new Konva.Layer();
    this.selectionButtonCircleGroup = new SelectButtonCircleGroup(this, this.infoService, this.tuneService, this.isFingering);
    this.containers.push(this.selectionButtonCircleGroup);
    playHeadControlLayer.add(this.selectionButtonCircleGroup);
    return playHeadControlLayer;
  }

  removeSelection(): void {
    if (this.selectionGroup != null) {
      this.selectionGroup.destroy();
      this.selectionButtonCircleGroup.visible(true);
    }
  }

  createSelection(from: number, width: number): void {
    this.infoService.progressValue.next(0);
    this.selectionButtonCircleGroup.visible(false);
    this.selectionGroup = new SelectionGroup(this, this.infoService, this.tuneService, from, width);
    this.sheetGroup.add(this.selectionGroup);
  }


  relativeToAbsolute(relativeX: number): number {
    return this.stage.width() / 2 - relativeX * this.scaleFactor;
  }

  absoluteToRelative(absoluteX: number): number {
    return (this.stage.width() / 2 - absoluteX) / this.scaleFactor;
  }

  getSheetOffset(): number {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    let sheetOffsetRelative: number = Math.round(this.absoluteToRelative(this.sheetGroup.x()) - tune.playHeadWidth / 2);
    sheetOffsetRelative = sheetOffsetRelative < tune.points[0].offsetX ? tune.points[0].offsetX : sheetOffsetRelative;
    return sheetOffsetRelative;
  }


  updatePointer(): void {
    let tune: Tune = this.tuneService.tuneModel.value.tune;
    let sheetOffsetRelative: number = this.getSheetOffset();

    let pointer: number = binarySearch(tune.points, sheetOffsetRelative);
    this.playPointer = pointer < 0 ? Math.abs(pointer + 1) : pointer;

    this.waitPointer = getNextPointer(
      tune.points,
      this.playPointer,
      true,
      false,
      this.infoService.settings.leftHand,
      this.infoService.settings.rightHand,
      true
    );

    //in very rare cases when there is a pause between points we need to adjust playPointer (see Polonez measure 10)
    if (this.playPointer > 0 &&
      this.playPointer == this.waitPointer &&
      sheetOffsetRelative != tune.points[this.playPointer].offsetX) {
      --this.playPointer;
    }

    // if (this.playPointer >= 0 && this.playPointer < this.infoService.model.value.tune.points.length) {
    //     this.barPointer = this.infoService.model.value.tune.points[this.playPointer].bar;
    //     this.infoService.userNotesRecorder.barMap.get(this.barPointer)!.clear(false);
    // }
  }

  public onResized(event: any) {
    if (!event.isFirst) {
      this.loopHandler.pause();

      this.scaleFactor = this.containerDiv.nativeElement.getBoundingClientRect().height / this.tuneService.tuneModel.value.tune.sheetHeight;

      this.stage.width(this.containerDiv.nativeElement.getBoundingClientRect().width);
      this.stage.height(this.containerDiv.nativeElement.getBoundingClientRect().height);

      this.sheetGroup.onResized();
      this.selectionButtonCircleGroup.onResized();

      if (this.selectionGroup != null) {
        this.selectionGroup.onResized();
      }
    }
  }

  updateDebug(): void {
    if (this.debugRect == null) {
      this.debugRect = new Konva.Rect();
      let debugLayer: Konva.Layer = new Konva.Layer();
      debugLayer.add(this.debugRect);
      this.stage.add(debugLayer);
    }
    let padding = 3;
    this.debugRect.stroke('blue');
    this.debugRect.x(padding);
    this.debugRect.y(padding);
    this.debugRect.width(this.getCanvasWidth() - padding * 2);
    this.debugRect.height(this.getCanvasHeight() - padding * 2);
  }

  getCanvasWidth(): number {
    return this.containerDiv.nativeElement.getBoundingClientRect().width;
  }

  getCanvasHeight(): number {
    return this.containerDiv.nativeElement.getBoundingClientRect().height;
  }

  protected readonly PlayerMode = PlayerMode;
}
