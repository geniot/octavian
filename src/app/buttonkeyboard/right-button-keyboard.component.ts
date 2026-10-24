import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ButtonKeyboardComponent} from "./button-keyboard.component";
import {InfoService} from "../../services/infoservice";

@Component({
  selector: 'app-right-button-keyboard',
  template: '<div #rightContainerDiv id="{{containerId}}" (onResize)="onResized($event)" style="padding:0;border: 0 solid red;height:100%;width:100%;overflow: hidden;"></div>',
  styleUrls: ['./button-keyboard.component.css']
})
export class RightButtonKeyboardComponent extends ButtonKeyboardComponent implements OnInit {

  @ViewChild('rightContainerDiv') override containerDiv!: ElementRef;

  constructor(public override infoService: InfoService) {
    super(infoService);
  }

  ngOnInit() {
    if (this.fingeringComponent != null) {
      this.fingeringComponent.rightButtonKeyboardComponent = this;
    }
  }
}
