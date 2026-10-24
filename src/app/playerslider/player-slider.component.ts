import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {InfoService} from "../../services/infoservice";
import {DestroyableComponent} from "../../model/destroyablecomponent";
import {ChangeEvent} from "../../model/changeevent";
import {PlayerMode} from "../../model/enums/playermode";
import {TuneService} from "../../services/tuneservice";
import {Tune} from "../../model/tune";

@Component({
  selector: 'app-player-slider',
  templateUrl: './player-slider.component.html',
  styleUrls: ['./player-slider.component.css']
})
export class PlayerSliderComponent extends DestroyableComponent implements OnInit {


  // sliderValue!: number;

  constructor(public infoService: InfoService,
              public tuneService: TuneService,
              private cdr: ChangeDetectorRef) {
    super();

  }

  ngOnInit(): void {
    this.subscriptions.push(this.tuneService.tuneModel.asObservable().subscribe(
      model => {
        let tune: Tune = this.tuneService.tuneModel.value.tune;
        this.infoService.sliderMin = tune.points[0].offsetX + tune.playHeadWidth / 2;
        this.infoService.sliderMax = tune.sheetWidth - tune.playHeadWidth / 2;
        this.infoService.sliderValue.next(new ChangeEvent(this.infoService.sliderMin, this));
      }));

    this.subscriptions.push(this.infoService.sliderValue.asObservable().subscribe(
      sliderValue => {
        this.cdr.detectChanges();
      }));
  }

  onSliderChange(event: any) {
    this.infoService.progressValue.next(0);
    this.infoService.playerComponent.updatePointer();
    this.infoService.sliderValue.next(new ChangeEvent(event.value, this));

  }

  onSlideEnd($event: any) {
    this.infoService.onDragEnd();
  }

  protected readonly PlayerMode = PlayerMode;
}
