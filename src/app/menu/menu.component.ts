import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {InfoService} from "../../services/infoservice";
import {DOCUMENT} from "@angular/common";
import {DestroyableComponent} from "../../model/destroyablecomponent";
import {ClientAction} from "../../model/enums/clientaction";
import {Role} from "../../model/enums/role";
import {CatalogueService} from "../../services/catalogueservice";
import {UserService} from "../../services/userservice";
import {ICONS_MAP} from "../../model/constants";
import {ACCORDION_BUTTON_IMG, ACCORDION_PIANO_IMG, OCTAVIAN_LOGO, PIANO_IMG} from "../../model/images";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends DestroyableComponent implements OnInit {
  ClientAction = ClientAction;
  elem: any;

  userSrcSuffix = '';
  aboutSrcSuffix = '';
  listSrcSuffix = '';
  addSrcSuffix = '';
  fullscreenSrcSuffix = '';


  constructor(
    @Inject(DOCUMENT) public document: any,
    public router: Router,
    public infoService: InfoService,
    public catalogueService: CatalogueService,
    public userService: UserService,
    private cdr: ChangeDetectorRef
  ) {

    super();
    this.elem = document.documentElement;
    if (userService.isUserLoggedIn()) {
      this.catalogueService.loadCatalogue();
    }
  }

  ngOnInit(): void {
  }

  onAddClick() {
    if (this.userService.isUserLoggedIn()) {
      this.infoService.isNewDialogState = true;
      this.infoService.dialogsHandler.isShowUploadDialog = true;
    }
  }

  protected readonly Role = Role;


  getUserSrc(): string {
    if (this.infoService.dialogsHandler.isShowSignInDialog || this.infoService.dialogsHandler.isShowUserProfileDialog) {
      let suffix: string = (this.userService.isUserLoggedIn() ? 'on' : 'off') + '_selected';
      return ICONS_MAP.get('USER_' + suffix.toUpperCase())!;
    } else {
      let suffix: string = (this.userService.isUserLoggedIn() ? 'on' : 'off') + this.userSrcSuffix;
      return ICONS_MAP.get('USER_' + suffix.toUpperCase())!;
    }
  }

  getFullscreenSrc(): string {
    let suffix: string = (!this.infoService.fullScreenHandler.isFullscreen() ? 'on' : 'off') + this.fullscreenSrcSuffix;
    return ICONS_MAP.get('FULLSCREEN_' + suffix.toUpperCase())!;
  }

  getAboutSrc(): string {
    if (this.infoService.dialogsHandler.isShowAboutDialog) {
      return ICONS_MAP.get('INFO_SELECTED')!;
    } else {
      return ICONS_MAP.get('INFO' + this.aboutSrcSuffix.toUpperCase())!;
    }
  }

  getListSrc(): string {
    if (this.infoService.dialogsHandler.isShowUnlockDialog) {
      return ICONS_MAP.get('LIST_SELECTED')!;
    } else {
      return ICONS_MAP.get('LIST' + this.listSrcSuffix.toUpperCase())!;
    }
  }

  getAddSrc(): string {
    if (this.infoService.dialogsHandler.isShowUploadDialog) {
      return ICONS_MAP.get('ADD_SELECTED')!;
    } else {
      return ICONS_MAP.get('ADD' + this.addSrcSuffix.toUpperCase())!;
    }
  }


  protected readonly ACCORDION_BUTTON_IMG = ACCORDION_BUTTON_IMG;
  protected readonly PIANO_IMG = PIANO_IMG;
  protected readonly OCTAVIAN_LOGO = OCTAVIAN_LOGO;
  protected readonly ACCORDION_PIANO_IMG = ACCORDION_PIANO_IMG;
  protected readonly window = window;
}
