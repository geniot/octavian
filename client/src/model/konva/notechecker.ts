import {InfoService} from "../../services/infoservice";
import {getBarPoints} from "../constants";
import {Bar} from "./bar";
import {Point} from "../point";
import {Note} from "../note";
import {DestroyableComponent} from "../destroyablecomponent";
import {StatsRecord} from "../statsrecord";
import {BarColor} from "../barcolor";
import {PlayerMode} from "../enums/playermode";
import {TuneService} from "../../services/tuneservice";
import {StatsService} from "../../services/statsservice";
import {UserService} from "../../services/userservice";

export class NoteChecker extends DestroyableComponent {
  barMap: Map<number, Bar> = new Map<number, Bar>();

  lastBarReached: boolean = false;
  hundredPercentPlayed: boolean = false;

  constructor(public infoService: InfoService,
              public tuneService: TuneService,
              public statsService: StatsService,
              public userService: UserService
  ) {
    super();
    this.subscriptions.push(this.infoService.trashTrigger.asObservable().subscribe(
      trashTrigger => {
        if (trashTrigger.valueOf()) {
          for (let i = 1; i <= this.tuneService.tuneModel.value.tune.barOffsets.length; i++) {
            let bar: Bar = this.barMap.get(i)!
            if (bar != null) {
              bar.clear();
            }
          }
        }
      }));
    this.subscriptions.push(this.tuneService.tuneModel.asObservable().subscribe(
      model => {
        for (let key of this.barMap.keys()) {
          this.barMap.get(key)!.remove();
        }
        this.barMap.clear();
        for (let i = 1; i <= model.tune.barOffsets.length; i++) {
          let barPoints: Array<number> = getBarPoints(model.tune.points, i);
          let bar: Bar = new Bar(this.infoService, this.tuneService, i, barPoints);
          this.add(bar);
          this.barMap.set(i, bar);
        }
      }));

    let checkHandler = (note: Note) => {
      if (!note.isTune && note.noteValue > -1) {
        if (this.infoService.settings.mode == PlayerMode.WAIT) {

          let points: Point[] = this.tuneService.tuneModel.value.tune.points;
          let waitPointer: number = this.infoService.playerComponent.waitPointer;
          let barPointer: number = waitPointer < 0 ? this.tuneService.tuneModel.value.tune.barOffsets.length : points[waitPointer].bar;

          for (let i: number = barPointer; i >= 1; i--) {
            let bar: Bar = this.barMap.get(i)!;
            if (bar.isAllPlayed()) {
              bar.check();
              bar.clearPlayedHistory();

              if (i == this.barMap.size) {
                this.lastBarReached = true;
                this.submitStats();
              }
            }
            //bar.debug();
          }
        }
      }
    }

    this.subscriptions.push(infoService.rightNoteOff.asObservable().subscribe(checkHandler));
    this.subscriptions.push(infoService.leftNoteOff.asObservable().subscribe(checkHandler));
    this.subscriptions.push(infoService.leftChordOff.asObservable().subscribe(checkHandler));
    this.subscriptions.push(infoService.pianoNoteOff.asObservable().subscribe(checkHandler));
  }

  getStatsRecord() {
    let statsRecord: StatsRecord = new StatsRecord();
    let lh: string = "";
    let rh: string = "";
    for (let i = 0; i < this.barMap.size; i++) {
      let bar: Bar = this.barMap.get(i + 1)!;
      rh += this.numberByColor(<string>bar.rightHandBarRect.fill());
      lh += this.numberByColor(<string>bar.leftHandBarRect.fill());
    }
    statsRecord.rh = rh;
    statsRecord.lh = lh;
    return statsRecord;
  }

  numberByColor(colorKey: string): number {
    if (colorKey == BarColor.GREEN) {
      return 0;
    }
    if (colorKey == BarColor.YELLOW) {
      return 1;
    }
    if (colorKey == BarColor.RED) {
      return 2;
    }
    console.log("Couldn't identify bar color: " + colorKey);
    return 0;
  }

  /**
   * Two conditions should be met to submit the stats.
   * @private
   */
  public submitStats(): void {
    if (this.lastBarReached && this.hundredPercentPlayed && this.userService.isUserLoggedIn()) {
      this.lastBarReached = false;
      this.hundredPercentPlayed = false;
      this.infoService.dialogsHandler.isShowResultDialog = true;
      this.statsService.submitStats();
    }
  }
}
