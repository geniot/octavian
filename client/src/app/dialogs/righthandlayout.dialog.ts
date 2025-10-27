import {Component, OnInit} from "@angular/core";
import {RightHandLayout} from "../../model/enums/righthandlayout";
import {arrayFromMap, RIGHT_HAND_LAYOUT_OPTIONS_MAP} from "../../model/constants";
import {AnyDialog} from "./anydialog";

@Component({
  selector: 'right-hand-layout-dialog',
  templateUrl: './righthandlayout.dialog.html'
})
export class RightHandLayoutDialog extends AnyDialog implements OnInit {
  selectedRightHandLayoutOption!: RightHandLayout;
  rightHandLayoutOptions: Array<{ key: string, value: string }> = arrayFromMap(RIGHT_HAND_LAYOUT_OPTIONS_MAP);

  ngOnInit() {
    this.selectedRightHandLayoutOption = this.infoService.settings.rightHandLayout;
  }

  onRightHandLayoutChange(): void {
    if (this.selectedRightHandLayoutOption != this.infoService.settings.rightHandLayout) {
      this.infoService.settings.rightHandLayout = this.selectedRightHandLayoutOption;
      this.infoService.rightHandLayoutChangedTrigger.next(true);
      this.infoService.playerInitTrigger.next(true);
    }
  }
}
