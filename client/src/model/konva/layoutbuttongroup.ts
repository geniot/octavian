import Konva from "konva";
import {InfoService} from "../../services/infoservice";
import {LEFT_HAND_LAYOUT_OPTIONS_MAP, RIGHT_HAND_LAYOUT_OPTIONS_MAP} from "../constants";
import {HandType} from "../enums/handtype";
import {ButtonKeyboardComponent} from "../../app/buttonkeyboard/button-keyboard.component";
import {ViewMode} from "../enums/viewmode";
import {DestroyableComponent} from "../destroyablecomponent";

export class LayoutButtonGroup extends DestroyableComponent{
  griffText!: Konva.Text;
  griffButtonRect!: Konva.Rect;

  constructor(public keyboard: ButtonKeyboardComponent, public infoService: InfoService, public handType: HandType, public viewMode: ViewMode) {
    super();
    let _this = this;
    let xOffset: number = 15;
    let yOffset: number = 15;


    this.griffText = new Konva.Text({
      x: xOffset,
      y: yOffset + 1,
      text: handType == HandType.RIGHT_HAND ? RIGHT_HAND_LAYOUT_OPTIONS_MAP.get(infoService.settings.rightHandLayout) : LEFT_HAND_LAYOUT_OPTIONS_MAP.get(infoService.settings.leftHandLayout)
    });

    this.griffButtonRect = new Konva.Rect({
      x: xOffset - 5,
      y: yOffset - 5,
      width: this.griffText.width() + 10,
      height: this.griffText.height() + 10,
      stroke: 'black',
      strokeWidth: 1,
      cornerRadius: 5
    });

    this.adjustButtons(handType, viewMode);

    this.add(this.griffText);
    this.add(this.griffButtonRect);

    this.griffButtonRect.on('mouseenter', function () {
      keyboard.stage.container().style.cursor = 'pointer';
      _this.griffButtonRect.stroke('blue');
    });

    this.griffButtonRect.on('mouseleave', function () {
      keyboard.stage.container().style.cursor = 'default';
      _this.griffButtonRect.stroke('black');
    });

    this.griffButtonRect.on('mousedown', function () {
      _this.griffButtonRect.stroke('red');
      if (handType == HandType.LEFT_HAND) {
        keyboard.infoService.dialogsHandler.isShowLeftHandLayoutDialog = true;
      } else {
        keyboard.infoService.dialogsHandler.isShowRightHandLayoutDialog = true;
      }
    });

    this.griffButtonRect.on('mouseup', function () {
      _this.griffButtonRect.stroke('blue');
    });


    if (handType == HandType.RIGHT_HAND) {
      this.infoService.rightHandLayoutChangedTrigger.asObservable().subscribe(
        rightHandLayoutChangedTrigger => {
          if (RIGHT_HAND_LAYOUT_OPTIONS_MAP.has(infoService.settings.rightHandLayout)) {
            let newValue = RIGHT_HAND_LAYOUT_OPTIONS_MAP.get(infoService.settings.rightHandLayout);
            if (typeof newValue === "string") {
              _this.griffText.text(newValue);
              _this.griffButtonRect.width(_this.griffText.width() + 10);
              _this.adjustButtons(handType, viewMode);
            }
          }
        });
    } else {
      this.infoService.leftHandLayoutChangedTrigger.asObservable().subscribe(
        leftHandLayoutChangedTrigger => {
          if (LEFT_HAND_LAYOUT_OPTIONS_MAP.has(infoService.settings.leftHandLayout)) {
            let newValue = LEFT_HAND_LAYOUT_OPTIONS_MAP.get(infoService.settings.leftHandLayout);
            if (typeof newValue === "string") {
              _this.griffText.text(newValue);
              _this.griffButtonRect.width(_this.griffText.width() + 10);
              _this.adjustButtons(handType, viewMode);
            }
          }
        });
    }
  }

  adjustButtons(handType: HandType, viewMode: ViewMode): void {
    if ((handType == HandType.LEFT_HAND && viewMode == ViewMode.MIRROR_MODE) ||
      (handType == HandType.RIGHT_HAND && viewMode == ViewMode.TEACHER_MODE)) {
      this.griffText.x(this.keyboard.stage.width() - this.griffButtonRect.width() - 5);
      this.griffButtonRect.x(this.keyboard.stage.width() - this.griffButtonRect.width() - 10);
    }
  }
}
