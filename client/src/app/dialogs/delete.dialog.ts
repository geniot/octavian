import {Component, OnInit} from "@angular/core";
import {AnyDialog} from "./anydialog";

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete.dialog.html'
})
export class DeleteDialog extends AnyDialog implements OnInit {
  allowDelete: boolean = false;
  allowDeleteId: string = "allowDeleteId";

  ngOnInit(): void {
    // this.subscriptions.push(this.infoService.model.asObservable().subscribe(
    //   m => {
    //     // if (m.action == ServerAction.DELETE_TUNE) {
    //     //   this.hasError = m.hasError;
    //     //   this.message = m.message;
    //     //   if (!this.hasError) {
    //     //     this.infoService.dialogsHandler.isShowDeleteDialog = false;
    //     //   }
    //     // }
    //   }));
  }

  override onErrorClose() {
    this.message = null;
    this.hasError = false;
  }

  override onShow() {
    this.allowDelete = false;
  }

  override onHide() {
    this.allowDelete = false;
  }

  onDelete() {
    this.tuneService.deleteTune();
  }
}
