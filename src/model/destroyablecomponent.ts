import {Injectable, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import Konva from "konva";
import {clearArray} from "./constants";
import {Container} from "konva/lib/Container";

@Injectable()
export class DestroyableComponent extends Konva.Group implements OnDestroy {
  subscriptions: Subscription[] = [];
  containers: Array<Container | Konva.Group | Konva.Shape | Konva.Image> = [];

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    for (let group of this.containers) {
      group.destroy();
    }
    clearArray(this.subscriptions);
    clearArray(this.containers);
  }

  override destroy(): any {
    this.ngOnDestroy();
    return super.destroy();
  }
}
