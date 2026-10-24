import {Component, OnInit} from "@angular/core";
import {AnyDialog} from "./anydialog";

@Component({
  selector: 'user-profile-dialog',
  templateUrl: './userprofile.dialog.html'
})
export class UserProfileDialog extends AnyDialog implements OnInit {

  ngOnInit() {
    this.subscriptions.push(this.userService.loginModel.asObservable().subscribe(
      m => {
        this.hasError = m.hasError;
        this.message = m.message;
      }));
  }

  onSignOut() {
    this.userService.loginModel.value.jwt = null;
    this.infoService.settings.shared = true;
    // this.catalogueService.loadCatalogue();
    this.infoService.dialogsHandler.isShowUserProfileDialog = false;
    this.userService.saveModel();
  }

  refresh() {
    if (!this.userService.isLoading) {
      this.message = null;
      this.userService.refreshSubscription();
    }
  }
}
