import {AnyDialog} from "../app/dialogs/anydialog";
import {LayoutConfig, PianoLayoutConfig} from "./layoutconfig";
import {Directive, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {IOutputData} from "angular-split";
import {HandType} from "./enums/handtype";
import {Instrument} from "./enums/instrument";
import {cloneDeep} from "lodash-es";
import {getNextPointer} from "./constants";
import {PlayerMode} from "./enums/playermode";

@Directive()
export abstract class SplitLayoutHandler extends AnyDialog implements OnInit {
  config!: LayoutConfig;
  pianoConfig!: PianoLayoutConfig;

  defaultConfig: LayoutConfig = new LayoutConfig();
  defaultPianoConfig: PianoLayoutConfig = new PianoLayoutConfig();

  @ViewChild('centerDiv') centerDiv!: ElementRef;

  HandType = HandType;
  Instrument = Instrument;

  toolbarZoom: number = 1;

  getAccordionSplitLayoutLocalStorageName(): string {
    return 'octavian-accordionSplitLayoutLocalStorageName';
  }

  getPianoSplitLayoutLocalStorageName(): string {
    return 'octavian-pianoSplitLayoutLocalStorageName';
  }

  ngOnInit(): void {

    if (localStorage.getItem(this.getAccordionSplitLayoutLocalStorageName())) {
      this.config = JSON.parse(localStorage.getItem(this.getAccordionSplitLayoutLocalStorageName())!);
      //in rare cases we may want to add/remove columns and we need to stay in sync
      if (this.config.columns.length != this.defaultConfig.columns.length) {
        this.resetConfig();
      }
    } else {
      this.resetConfig();
    }

    if (localStorage.getItem(this.getPianoSplitLayoutLocalStorageName())) {
      this.pianoConfig = JSON.parse(localStorage.getItem(this.getPianoSplitLayoutLocalStorageName())!);
      //in rare cases we may want to add/remove columns and we need to stay in sync
      if (this.pianoConfig.columns.length != this.defaultPianoConfig.columns.length) {
        this.resetPianoConfig();
      }
    } else {
      this.resetPianoConfig();
    }
  }

  resetConfig(): void {
    this.config = cloneDeep(this.defaultConfig);
    localStorage.removeItem(this.getAccordionSplitLayoutLocalStorageName());
  }

  resetPianoConfig(): void {
    this.pianoConfig = cloneDeep(this.defaultPianoConfig);
    localStorage.removeItem(this.getPianoSplitLayoutLocalStorageName());
  }

  onDragEnd(e: IOutputData, indexes: Array<number>) {
    let indexPointer: number = 0;
    for (let i = 0; i < e.sizes.length; i++) {
      this.config.columns[indexes[indexPointer++]].size = e.sizes[i] as number;
    }
    localStorage.setItem(this.getAccordionSplitLayoutLocalStorageName(), JSON.stringify(this.config));
    this.infoService.playerInitTrigger.next(true);
  }

  onPianoDragEnd(e: IOutputData) {
    for (let i = 0; i < e.sizes.length; i++) {
      this.pianoConfig.columns[i].size = e.sizes[i] as number;
    }
    localStorage.setItem(this.getPianoSplitLayoutLocalStorageName(), JSON.stringify(this.pianoConfig));
    this.infoService.playerInitTrigger.next(true);
  }

  onCenterResized(event: any) {
    let containerWidth: number = Math.round(this.centerDiv.nativeElement.getBoundingClientRect().width);
    let containerHeight: number = Math.round(this.centerDiv.nativeElement.getBoundingClientRect().height);

    let padding: number = 15;
    let toolbarWidth: number = 100 * 7 + padding;
    let toolbarHeight: number = 130;

    if (containerWidth < toolbarWidth || containerHeight < toolbarHeight * 2) {
      let zoom1: number = containerWidth / toolbarWidth;
      let zoom2: number = containerHeight / toolbarHeight / 2;
      this.toolbarZoom = zoom1 < zoom2 ? zoom1 : zoom2;
    } else {
      this.toolbarZoom = 1;
    }
  }

  @HostListener('document:keydown.control', ['$event'])
  handleControlLeftKeyDown(event: KeyboardEvent) {
    this.infoService.controlPressed.next(true);
  }

  @HostListener('document:keyup.control', ['$event'])
  handleControlLeftKeyUp(event: KeyboardEvent) {
    this.infoService.controlPressed.next(false);
  }

  @HostListener('document:keydown.ArrowRight', ['$event'])
  @HostListener('document:keydown.ArrowLeft', ['$event'])
  handleLeftRightArrowKeyboardEvent(event: KeyboardEvent) {
    if ((this.infoService.settings.mode == PlayerMode.WAIT || this.infoService.settings.mode == PlayerMode.FINGERING)
      && !this.infoService.dialogsHandler.isAnyDialogOpen()) {
      let isNext: boolean = event.key == 'ArrowRight';
      let nextPointer: number = getNextPointer(
        this.tuneService.tuneModel.value.tune.points,
        this.infoService.playerComponent.waitPointer + (isNext ? 1 : -1),
        true,
        false,
        true,
        true,
        isNext
      );
      if (nextPointer >= 0) {
        this.infoService.playerComponent.waitPointer = nextPointer;
        this.infoService.playerComponent.loopHandler.scrollToWaitPointer();
      }
    }
  }

}
