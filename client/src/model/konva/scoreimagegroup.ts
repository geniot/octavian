import {PlayerComponent} from "../../app/player/player.component";
import {InfoService} from "../../services/infoservice";
import {TuneService} from "../../services/tuneservice";
import {DestroyableComponent} from "../destroyablecomponent";
import Konva from "konva";
import Image = Konva.Image;

export class ScoreImageGroup extends DestroyableComponent {
  images!: Image[];

  constructor(public playerComponent: PlayerComponent, public infoService: InfoService, public tuneService: TuneService) {
    super();
    this.images = [];
    let xOffset = 0;

    for (let i = 0; i < this.tuneService.imageObjs.size; i++) {
      let scaleFactor = this.tuneService.tuneModel.value.tune.pngWidth / this.tuneService.tuneModel.value.tune.sheetWidth;
      let scaledWidth = this.tuneService.imageObjs.get(i)!.width / scaleFactor;
      let image = new Konva.Image({
        image: this.tuneService.imageObjs.get(i)!,
        x: xOffset,
        width: scaledWidth,
        height: this.tuneService.tuneModel.value.tune.sheetHeight
      });
      xOffset += scaledWidth;
      this.images.push(image);
      this.add(image);
    }
  }

  onResized() {
    if (this.playerComponent.sheetGroup != null) {
      let xOffset = 0;
      for (let i = 0; i < this.images.length; i++) {
        let scaleFactor = this.tuneService.tuneModel.value.tune.pngWidth / this.tuneService.tuneModel.value.tune.sheetWidth;
        let scaledWidth = this.tuneService.imageObjs.get(i)!.width / scaleFactor;
        this.images[i].width(scaledWidth * this.playerComponent.scaleFactor);
        this.images[i].height(this.tuneService.tuneModel.value.tune.sheetHeight * this.playerComponent.scaleFactor);
        this.images[i].x(xOffset);
        xOffset += scaledWidth * this.playerComponent.scaleFactor;
      }
    }
  }
}
