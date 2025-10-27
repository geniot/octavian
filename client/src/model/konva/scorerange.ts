import {DestroyableComponent} from "../destroyablecomponent";
import Konva from "konva";
import {TuneService} from "../../services/tuneservice";
import {InfoService} from "../../services/infoservice";
import {RangeSelectionMode} from "../enums/rangeselectionmode";
import {skip} from "rxjs/operators";
import Stage = Konva.Stage;

export class ScoreRange extends DestroyableComponent {
  measureRect!: Konva.Rect;
  countText!: Konva.Text;
  tooltip!: Konva.Label;
  tooltipTag!: Konva.Tag;

  padding: number = 2;
  isSelected: boolean = false;
  isTooltipActive: boolean = false;

  neutralColor: string = 'white';
  neutralTextColor: string = 'darkgray';
  neutralBorderColor: string = 'darkgray';

  mouseOverColor: string = 'lightgray';
  mouseOverTextColor: string = 'darkgray';
  mouseOverBorderColor: string = 'darkgray';

  mouseDownColor: string = 'darkgray';
  mouseDownTextColor: string = 'gray';
  mouseDownBorderColor: string = 'black';

  neutralSelectedColor: string = 'darkgray';
  neutralSelectedTextColor: string = 'gray';
  neutralSelectedBorderColor: string = 'black';


  constructor(
    public rangeSelectionMode: RangeSelectionMode,
    public selectionRanges: ScoreRange[],
    public tuneService: TuneService,
    public infoService: InfoService,
    public stage: Stage,
    public tooltipLayer: Konva.Layer,
    public measureIndex: number,
    public fromOffset: number,
    public toOffset: number,
    public txt: string
  ) {

    super();

    this.measureRect = new Konva.Rect();
    this.countText = new Konva.Text({text: txt});

    this.tooltip = new Konva.Label({
      opacity: 0.75,
    });

    this.tooltipTag = new Konva.Tag({
      fill: 'black',
      pointerDirection: 'left',
      pointerWidth: 20,
      pointerHeight: 28,
      lineJoin: 'round',
    });

    this.tooltip.add(this.tooltipTag);

    this.tooltip.add(
      new Konva.Text({
        text: this.countText.text(),
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'white',
      })
    );

    this.add(this.measureRect);
    this.add(this.countText);

    let _this = this;
    this.subscriptions.push(
      this.tuneService.selectionRemovedTrigger.asObservable().pipe(skip(1)).subscribe(
        selectionRemovedTrigger => {
          if (selectionRemovedTrigger.valueOf()) {
            _this.unselectAll();
          }
        })
    );

    if (this.rangeSelectionMode != RangeSelectionMode.NO_ACTION) {
      if (this.rangeSelectionMode != RangeSelectionMode.TOGGLE_SELECT) {
        this.on('mouseenter', function () {
          this.measureRect.fill(this.mouseOverColor);
          this.countText.fill(this.mouseOverTextColor);
          this.measureRect.stroke(this.mouseOverBorderColor);
          this.stage.container().style.cursor = 'pointer';
          if (this.isTooltipActive) {
            this.tooltip.x(this.measureRect.x() + this.measureRect.width());
            this.tooltip.y(this.measureRect.y() + this.measureRect.height() / 2);
            if (this.tooltip.x() + this.tooltip.width() * 3 > this.stage.width()) {
              this.tooltipTag.pointerDirection("right");
              this.tooltip.x(this.measureRect.x());
            } else {
              this.tooltipTag.pointerDirection("left");
            }

            this.tooltipLayer.add(this.tooltip);
          }
        });
        this.on('mouseleave', function () {
          this.measureRect.fill(this.neutralColor);
          this.countText.fill(this.neutralTextColor);
          this.measureRect.stroke(this.neutralBorderColor);
          this.stage.container().style.cursor = 'default';
          if (this.isTooltipActive) {
            this.tooltipLayer.removeChildren();
          }
        });
      }

      this.on('mousedown', function () {
        if (this.rangeSelectionMode == RangeSelectionMode.GOTO_MEASURE) {
          this.infoService.gotoMeasure(this.measureIndex);
          this.measureRect.fill(this.mouseDownColor);
          this.countText.fill(this.mouseDownTextColor);
          this.measureRect.stroke(this.mouseDownBorderColor);
        } else if (this.rangeSelectionMode == RangeSelectionMode.TOGGLE_SELECT) {
          if (this.infoService.controlPressed.value.valueOf() && !this.isSelected && this.isNeighbourSelected()) {
            this.isSelected = true;
            this.infoService.playerComponent.removeSelection();
            let from = this.getMinFrom();
            let to = this.getMaxTo();
            this.infoService.playerComponent.createSelection(from, to - from);
          } else {
            this.unselectAll();
            this.isSelected = !this.isSelected;
            this.infoService.playerComponent.removeSelection();
            if (this.isSelected) {
              this.infoService.gotoOffset(this.fromOffset);
              this.infoService.playerComponent.createSelection(this.fromOffset, this.toOffset - this.fromOffset);
            }
          }

          this.measureRect.fill(this.neutralSelectedColor);
          this.countText.fill(this.neutralSelectedTextColor);
          this.measureRect.stroke(this.neutralSelectedBorderColor);
        }

      });
      this.on('mouseup', function () {
        if (this.rangeSelectionMode == RangeSelectionMode.GOTO_MEASURE) {
          this.measureRect.fill(this.mouseOverColor);
          this.countText.fill(this.mouseOverTextColor);
          this.measureRect.stroke(this.mouseOverBorderColor);
        } else if (this.rangeSelectionMode == RangeSelectionMode.TOGGLE_SELECT) {
          this.measureRect.fill(this.isSelected ? this.neutralSelectedColor : this.neutralColor);
          this.countText.fill(this.isSelected ? this.neutralSelectedTextColor : this.neutralTextColor);
          this.measureRect.stroke(this.isSelected ? this.neutralSelectedBorderColor : this.neutralBorderColor);
        }
      });
    }

  }

  isNeighbourSelected(): boolean {
    return this.selectionRanges[this.measureIndex - 1]?.isSelected || this.selectionRanges[this.measureIndex + 1]?.isSelected;
  }

  getMinFrom(): number {
    for (let i = 0; i < this.selectionRanges.length; i++) {
      if (this.selectionRanges[i].isSelected) {
        return this.selectionRanges[i].fromOffset;
      }
    }
    return 0;
  }

  getMaxTo(): number {
    for (let i = this.selectionRanges.length - 1; i >= 0; i--) {
      if (this.selectionRanges[i].isSelected) {
        return this.selectionRanges[i].toOffset;
      }
    }
    return this.tuneService.tuneModel.value.tune.sheetWidth;
  }

  unselectAll(): void {
    let _this = this;
    this.selectionRanges.forEach((element) => {
      if (element.fromOffset != _this.fromOffset) {
        element.isSelected = false;
        element.updateColors();
      }
    });
  }

  onResized(newHeight: number, newWidth: number) {

    let sheetWidth = this.tuneService.tuneModel.value.tune.sheetWidth;
    let ratio = newWidth / sheetWidth;
    let measureWidth = this.toOffset - this.fromOffset;

    this.measureRect.strokeWidth(0.5);
    this.measureRect.cornerRadius(7);
    this.measureRect.x(this.fromOffset * ratio);
    this.measureRect.y(this.padding);
    this.measureRect.width(measureWidth * ratio - this.padding * 2);
    this.measureRect.height(newHeight - this.padding * 2);

    this.countText.x(this.fromOffset * ratio + (measureWidth * ratio) / 2 - this.countText.width() / 2 - this.padding);
    this.countText.y(newHeight / 1.8 - this.countText.height() / 2);
    this.countText.text(this.txt);

    if (this.countText.width() > this.measureRect.width() || this.countText.height() > this.measureRect.height()) {
      this.countText.visible(false);
      this.isTooltipActive = true;
    }

    this.updateColors();
  }

  updateColors(): void {
    this.measureRect.fill(this.isSelected ? this.neutralSelectedColor : this.neutralColor);
    this.countText.fill(this.isSelected ? this.neutralSelectedTextColor : this.neutralTextColor);
    this.measureRect.stroke(this.isSelected ? this.neutralSelectedBorderColor : this.neutralBorderColor);
  }
}
