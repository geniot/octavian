import {Component} from "@angular/core";
import {AnyDialog} from "./anydialog";
import {MenuItem} from "../../model/menuitem";

@Component({
  selector: 'menu-dialog',
  templateUrl: './menu.dialog.html'
})
export class MenuDialog extends AnyDialog {
  menuItems!: MenuItem[];

  columnWidthCounter: number = 50;
  columnWidthInstrument: number = 250;

  ngOnInit(): void {
    this.subscriptions.push(this.catalogueService.catalogueModel.asObservable().subscribe(
      m => {
        this.menuItems = m.menuItems
      }));
    //for debugging
    // this.infoService.dialogsHandler.isShowMenuDialog = true;
  }

  override onShow() {
    super.onShow();
    this.menuItems = [];
    this.catalogueService.loadCatalogue();
  }

  override onHide() {
    super.onHide();
    this.menuItems = [];
  }

  getDate(date: string): string {
    let splits = date.split("T")[0].split("-");
    return splits[2] + "-" + splits[1] + "-" + splits[0];
  }

  getTime(date: string): string {
    let time: string = date.split("T")[1].split(".")[0];
    return time.substring(0, time.lastIndexOf(":"));
  }


  getIndex(record: MenuItem): string {
    for (let i = 0; i < this.menuItems.length; i++) {
      if (this.menuItems[i] == record) {
        return String(i + 1);
      }
    }
    return "";
  }
}
