import {Component} from "@angular/core";
import {AnyDialog} from "./anydialog";
import {MenuItem} from "../../model/menuitem";
import {PlayerMode} from "../../model/enums/playermode";
import {TabViewChangeEvent} from "primeng/tabview";

@Component({
  selector: 'menu-dialog',
  templateUrl: './menu.dialog.html'
})
export class MenuDialog extends AnyDialog {
  readonly statsLocalStorageName: string = "octavian-MenuDialogStorageName";
  menuItems: MenuItem[] = [];
  selectedInstrument: number = 0;
  columnWidthCounter: number = 50;

  ngOnInit(): void {
    this.subscriptions.push(this.catalogueService.catalogueModel.asObservable().subscribe(
      m => {
        this.menuItems = m.menuItems
      }));
    if (localStorage.getItem(this.statsLocalStorageName)) {
      this.selectedInstrument = JSON.parse(localStorage.getItem(this.statsLocalStorageName)!);
    } else {
      this.selectedInstrument = 0;
    }
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

  protected readonly PlayerMode = PlayerMode;

  protected filterByInstrument(instrument: string): MenuItem[] {
    let filteredItems: MenuItem[] = [];
    if (this.menuItems != undefined) {
      let index = 0;
      this.menuItems.forEach((element) => {
        if (element.instrument == instrument) {
          element.index = ++index;
          filteredItems.push(element);
        }
      });
    }
    return filteredItems;
  }

  protected onTabChange($event: TabViewChangeEvent) {
    this.selectedInstrument = $event.index;
    localStorage.setItem(this.statsLocalStorageName, JSON.stringify(this.selectedInstrument));
  }
}
