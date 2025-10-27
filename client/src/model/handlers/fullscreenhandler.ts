import {InfoService} from "../../services/infoservice";

export class FullScreenHandler {
  constructor(public infoService: InfoService) {
  }

  toggleFullscreen(elem: any, document: any): void {
    this.isFullscreen() ? this.closeFullscreen(document) : this.openFullscreen(elem);
  }

  isFullscreen(): boolean {
    let delta = 3;
    if (Math.abs(screen.availHeight - window.innerHeight) < delta || Math.abs(screen.height - window.innerHeight) < delta) {
      return true;
    } else {
      return false;
    }
  }

  openFullscreen(elem: any): void {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen(document: any): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}
