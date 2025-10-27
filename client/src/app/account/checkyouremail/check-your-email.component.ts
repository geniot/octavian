import {Component, OnInit} from '@angular/core';
import {DestroyableComponent} from "../../../model/destroyablecomponent";
import {InfoService} from "../../../services/infoservice";
import {Router} from "@angular/router";
import {ClientAction} from "../../../model/enums/clientaction";
import {UserService} from "../../../services/userservice";
import {OCTAVIAN_LOGO} from "../../../model/images";

@Component({
  selector: 'check-your-email',
  templateUrl: './check-your-email.component.html',
  styleUrls: ['./check-your-email.component.css']
})
export class CheckYourEmailComponent extends DestroyableComponent implements OnInit {

  constructor(public infoService: InfoService,
              public userService: UserService,
              public router: Router) {
    super();

  }

  ngOnInit(): void {
    this.infoService.dialogsHandler.hideAllDialogs();
  }

  goBack() {
    this.router.navigate([window.history.state.data || ('/' + ClientAction.ACCORDION_BUTTON_TYPE)], {state: {data: this.router.url}});
  }


  protected readonly OCTAVIAN_LOGO = OCTAVIAN_LOGO;
}
