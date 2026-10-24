import Konva from "konva";

export class ReplayTween extends Konva.Tween {
  isPlaying: boolean = false;

  override play(): any {
    this.isPlaying = true;
    return super.play();
  }

  override pause(): any {
    this.isPlaying = false;
    return super.pause();
  }
}
