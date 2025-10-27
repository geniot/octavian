import {InfoService} from "../../services/infoservice";

export class DialogsHandler {

  isShowRightHandLayoutDialog: boolean = false;
  isShowLeftHandLayoutDialog: boolean = false;
  isShowSettingsDialog: boolean = false;
  isShowAboutDialog: boolean = false;
  isShowStatsDialog: boolean = false;
  isShowFingeringDialog: boolean = false;
  isShowUnlockDialog: boolean = false;
  isShowHelpDialog: boolean = false;
  isShowUploadDialog: boolean = false;
  isShowDeleteDialog: boolean = false;
  isShowCopyDialog: boolean = false;
  isShowSignInDialog: boolean = false;
  isShowUserProfileDialog: boolean = false;
  isShowCheckYourEmailDialog: boolean = false;
  isShowProgressDialog: boolean = false;
  isShowResultDialog: boolean = false;

  constructor(public infoService: InfoService) {
  }

  hideAllDialogs(): void {
    this.isShowRightHandLayoutDialog = false;
    this.isShowLeftHandLayoutDialog = false;

    this.isShowSettingsDialog = false;
    this.isShowAboutDialog = false;
    this.isShowStatsDialog = false;
    this.isShowFingeringDialog = false;

    this.isShowUnlockDialog = false;
    this.isShowHelpDialog = false;
    this.isShowUploadDialog = false;
    this.isShowDeleteDialog = false;

    this.isShowCopyDialog = false;
    this.isShowSignInDialog = false;
    this.isShowUserProfileDialog = false;
    this.isShowCheckYourEmailDialog = false;
    this.isShowProgressDialog = false;
    this.isShowResultDialog = false;
  }

  isAnyDialogOpen(): boolean {
    return this.isShowRightHandLayoutDialog
      || this.isShowLeftHandLayoutDialog

      || this.isShowSettingsDialog
      || this.isShowAboutDialog
      || this.isShowStatsDialog
      || this.isShowFingeringDialog

      || this.isShowUnlockDialog
      || this.isShowHelpDialog
      || this.isShowUploadDialog
      || this.isShowDeleteDialog

      || this.isShowCopyDialog
      || this.isShowSignInDialog
      || this.isShowUserProfileDialog
      || this.isShowCheckYourEmailDialog
      || this.isShowProgressDialog
      || this.isShowResultDialog
      ;
  }
}
