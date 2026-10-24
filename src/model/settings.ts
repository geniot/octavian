import {DEFAULT_ROUTER_URL} from "./constants";
import {Instrument} from "./enums/instrument";
import {RightHandLayout} from "./enums/righthandlayout";
import {LeftHandLayout} from "./enums/lefthandlayout";
import {ViewMode} from "./enums/viewmode";
import {PlayerMode} from "./enums/playermode";

export class Settings {
  routerUrl: string = DEFAULT_ROUTER_URL;
  shared: boolean = true;

  instrument: Instrument = Instrument.PIANO;

  volumeLeft: number = 100;
  volumeRight: number = 100;

  playbackRate: number = 100;

  leftHand: boolean = true;
  rightHand: boolean = true;

  prevLeftHand: boolean = true;
  prevRightHand: boolean = true;

  rightHandLayout: RightHandLayout = RightHandLayout.B_GRIFF_BAJAN;
  leftHandLayout: LeftHandLayout = LeftHandLayout._2_BS_ROWS;

  playPianoSound: boolean = true;
  showNoteNamesOnKeys: boolean = true;
  showKeyNumbersOnKeys: boolean = false;
  flipKeyboardsVertically: boolean = false;

  viewMode: ViewMode = ViewMode.MIRROR_MODE;
  mode: PlayerMode = PlayerMode.PLAY;
  prevMode: PlayerMode = PlayerMode.PLAY;

  level: number = 1;
}
