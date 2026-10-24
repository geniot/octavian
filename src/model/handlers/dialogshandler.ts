import {InfoService} from "../../services/infoservice";

export class DialogsHandler {

  isShowRightHandLayoutDialog: boolean = false;
  isShowLeftHandLayoutDialog: boolean = false;
  isShowSettingsDialog: boolean = false;
  isShowAboutDialog: boolean = false;
  isShowStatsDialog: boolean = false;
  isShowResultDialog: boolean = false;

  constructor(public infoService: InfoService) {
  }

  hideAllDialogs(): void {
    this.isShowRightHandLayoutDialog = false;
    this.isShowLeftHandLayoutDialog = false;

    this.isShowSettingsDialog = false;
    this.isShowAboutDialog = false;
    this.isShowStatsDialog = false;
    this.isShowResultDialog = false;
  }

  isAnyDialogOpen(): boolean {
    return this.isShowRightHandLayoutDialog
      || this.isShowLeftHandLayoutDialog
      || this.isShowSettingsDialog
      || this.isShowAboutDialog
      || this.isShowStatsDialog
      || this.isShowResultDialog
      ;
  }
}
