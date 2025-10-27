import {Component, OnInit} from "@angular/core";
import {AnyDialog} from "./anydialog";

@Component({
  selector: 'copy-dialog',
  templateUrl: './copy.dialog.html'
})
export class CopyDialog extends AnyDialog implements OnInit {


  ngOnInit(): void {
    // this.subscriptions.push(this.infoService.model.asObservable().subscribe(
    //   m => {
    //     // if (m.action == ServerAction.COPY_TUNE) {
    //     //   this.hasError = m.hasError;
    //     //   this.message = m.message;
    //     //   if (!this.hasError) {
    //     //     this.infoService.dialogsHandler.isShowCopyDialog = false;
    //     //   }
    //     // }
    //   }));
  }

  override onErrorClose() {
    this.message = null;
    this.hasError = false;
  }


  onCopy() {
    // this.infoService.model.value.action = ServerAction.COPY_TUNE;
    // this.infoService.updateModel();
  }

  override onHide() {
    super.onShow();
  }
}
