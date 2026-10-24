import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from "@angular/core";
import Konva from "konva";
import {ScoreRange} from "../../model/konva/scorerange";
import {MeasureSelectorComponent} from "../measureselector/measure-selector.component";
import {RangeSelectionMode} from "../../model/enums/rangeselectionmode";
import {PlayerMode} from "../../model/enums/playermode";
import {clearArray, LETTERS} from "../../model/constants";

@Component({
  selector: 'range-selector',
  template: '<div #rangeSelectorContainerDiv id="rangeSelectorContainer" ' +
    '(onResize)="onResized($event)" ' +
    'style="padding:0;border: 0 solid red;height:100%;width:100%;overflow: hidden;"></div>'
})
export class RangeSelectorComponent extends MeasureSelectorComponent implements AfterViewInit {

  @ViewChild('rangeSelectorContainerDiv') override containerDiv!: ElementRef;
  selections: Set<number> = new Set();

  override ngAfterViewInit(): void {
    this.stage = new Konva.Stage({
      container: 'rangeSelectorContainer',
      width: this.containerDiv.nativeElement.getBoundingClientRect().width,
      height: this.containerDiv.nativeElement.getBoundingClientRect().height,
      visible: false
    });

    this.selectionRanges = [];
    if (this.tuneService.tuneModel.value.tune.selectionRanges != null) {
      let splits: string[] = this.tuneService.tuneModel.value.tune.selectionRanges.split(",");
      splits.forEach((element) => {
        this.selections.add(Number(element));
      });
    } else {
      this.selections.add(this.tuneService.tuneModel.value.tune.points[0].offsetX);
    }
    this.updateRanges();
  }

  @HostListener('document:keydown.pageUp', ['$event'])
  handlePgUpKeyboardEvent(event: KeyboardEvent) {
    if (this.infoService.settings.mode == PlayerMode.FINGERING) {
      this.selections.add(this.tuneService.tuneModel.value.tune.points[this.infoService.playerComponent.waitPointer].offsetX);
      this.infoService.isFingeringSaved = false;
      this.updateRanges();
    }
  }

  @HostListener('document:keydown.pageDown', ['$event'])
  handlePgDownKeyboardEvent(event: KeyboardEvent) {
    if (this.infoService.settings.mode == PlayerMode.FINGERING) {
      if (this.selections.size > 1) {//we want to leave at least one selection - the whole score
        let removalRange = 50;
        let offset = this.tuneService.tuneModel.value.tune.points[this.infoService.playerComponent.waitPointer].offsetX;
        for (let i = offset - removalRange / 2; i < offset + removalRange / 2; i++) {
          this.selections.delete(i);
        }
        this.infoService.isFingeringSaved = false;
        this.updateRanges();
      }
    }
  }

  private updateRanges() {
    clearArray(this.selectionRanges);
    this.stage.destroyChildren();
    let measuresLayer = new Konva.Layer();
    let selectionsArr = Array.from(this.selections.values()).sort((n1, n2) => n1 - n2);
    for (let i = 0; i < selectionsArr.length; i++) {
      let fromOffset = selectionsArr[i] - 1;
      let toOffset = (i == selectionsArr.length - 1 ? this.tuneService.tuneModel.value.tune.sheetWidth : Number(selectionsArr[i + 1]));
      let rangeSelectionMode: RangeSelectionMode = this.infoService.settings.mode == PlayerMode.FINGERING ? RangeSelectionMode.NO_ACTION : RangeSelectionMode.TOGGLE_SELECT;
      let selectionRange = new ScoreRange(rangeSelectionMode, this.selectionRanges, this.tuneService, this.infoService, this.stage, this.tooltipLayer, i, fromOffset, toOffset, LETTERS[i]);

      this.selectionRanges.push(selectionRange);
      measuresLayer.add(selectionRange);
    }
    this.stage.add(measuresLayer);
    this.tuneService.tuneModel.value.tune.selectionRanges = selectionsArr.toString();

    let _this = this;
    setTimeout(function () {
      _this.onResized({isFirst: false});
      _this.stage.visible(true);
    }, 0);
  }
}
