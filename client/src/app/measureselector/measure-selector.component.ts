import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {DestroyableComponent} from "../../model/destroyablecomponent";
import {InfoService} from "../../services/infoservice";
import {TuneService} from "../../services/tuneservice";
import Konva from "konva";
import {ScoreRange} from "../../model/konva/scorerange";
import {RangeSelectionMode} from "../../model/enums/rangeselectionmode";

@Component({
  selector: 'measure-selector',
  template: '<div #measureSelectorContainerDiv id="measureSelectorContainer" ' +
    '(onResize)="onResized($event)" ' +
    'style="padding:0;border: 0 solid red;height:100%;width:100%;overflow: hidden;"></div>'
})
export class MeasureSelectorComponent extends DestroyableComponent implements AfterViewInit {

  @ViewChild('measureSelectorContainerDiv') containerDiv!: ElementRef;
  stage!: Konva.Stage;
  measuresLayer!: Konva.Layer;
  tooltipLayer!: Konva.Layer;
  selectionRanges!: ScoreRange[];

  constructor(public infoService: InfoService,
              public tuneService: TuneService) {
    super();
  }

  ngAfterViewInit(): void {
    this.stage = new Konva.Stage({
      container: 'measureSelectorContainer',
      width: this.containerDiv.nativeElement.getBoundingClientRect().width,
      height: this.containerDiv.nativeElement.getBoundingClientRect().height,
      visible: false
    });

    this.measuresLayer = new Konva.Layer();
    this.tooltipLayer = new Konva.Layer();

    this.selectionRanges = [];
    let measuresCount = this.tuneService.tuneModel.value.tune.barOffsets.length;
    for (let i = 0; i < measuresCount; i++) {

      let fromOffset = this.tuneService.tuneModel.value.tune.barOffsets[i];
      let toOffset = i == measuresCount - 1 ? this.tuneService.tuneModel.value.tune.sheetWidth : this.tuneService.tuneModel.value.tune.barOffsets[i + 1];
      let selectionRange = new ScoreRange(RangeSelectionMode.GOTO_MEASURE, this.selectionRanges, this.tuneService, this.infoService, this.stage, this.tooltipLayer, i, fromOffset, toOffset, String(i + 1));

      this.selectionRanges.push(selectionRange);
      this.measuresLayer.add(selectionRange);
    }
    this.stage.add(this.measuresLayer);
    this.stage.add(this.tooltipLayer);

    let _this = this;
    setTimeout(function () {
      _this.onResized({isFirst: false});
      _this.stage.visible(true);
    }, 0);
  }

  public onResized(event: any) {
    if (!event.isFirst) {
      let newHeight = this.containerDiv.nativeElement.getBoundingClientRect().height;
      let newWidth = this.containerDiv.nativeElement.getBoundingClientRect().width;
      this.stage.height(newHeight);
      this.stage.width(newWidth);
      this.selectionRanges.forEach((element) => {
        element.onResized(newHeight, newWidth);
      });
    }
  }
}
