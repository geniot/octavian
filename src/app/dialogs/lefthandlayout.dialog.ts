import {Component, OnInit} from "@angular/core";
import {LeftHandLayout} from "../../model/enums/lefthandlayout";
import {arrayFromMap, LEFT_HAND_LAYOUT_OPTIONS_MAP} from "../../model/constants";
import {AnyDialog} from "./anydialog";

@Component({
  selector: 'left-hand-layout-dialog',
  templateUrl: './lefthandlayout.dialog.html'
})
export class LeftHandLayoutDialog extends AnyDialog implements OnInit {
  selectedLeftHandLayoutOption!: LeftHandLayout;
  leftHandLayoutOptions: Array<{ key: string, value: string }> = arrayFromMap(LEFT_HAND_LAYOUT_OPTIONS_MAP);

  ngOnInit() {
    this.selectedLeftHandLayoutOption = this.infoService.settings.leftHandLayout;
  }

  onLeftHandLayoutChange(): void {
    if (this.selectedLeftHandLayoutOption != this.infoService.settings.leftHandLayout) {
      this.infoService.settings.leftHandLayout = this.selectedLeftHandLayoutOption;
      this.infoService.leftHandLayoutChangedTrigger.next(true);
      this.infoService.playerInitTrigger.next(true);
    }
  }
}
