import {Component, OnInit} from "@angular/core";
import {Instrument} from "../../model/enums/instrument";
import {ViewMode} from "../../model/enums/viewmode";
import {
  arrayFromMap,
  INSTRUMENTS_NAMES_MAP,
  INSTRUMENTS_ROUTES_MAP,
  SETTINGS_VIEW_MODE_MAP
} from "../../model/constants";
import {AnyDialog} from "./anydialog";

@Component({
  selector: 'settings-dialog',
  templateUrl: './settings.dialog.html'
})
export class SettingsDialog extends AnyDialog implements OnInit {
  Instrument = Instrument;
  selectedViewModeOption!: ViewMode;
  selectedAccordionTypeOption!: Instrument;

  settingsViewModeOptions: Array<{ key: string, value: string }> = arrayFromMap(SETTINGS_VIEW_MODE_MAP);
  accordionTypeOptions: Array<{ key: string, value: string }> = [{
    key: Instrument.BUTTON_ACCORDION,
    value: INSTRUMENTS_NAMES_MAP.get(Instrument.BUTTON_ACCORDION)!
  }, {
    key: Instrument.PIANO_ACCORDION,
    value: INSTRUMENTS_NAMES_MAP.get(Instrument.PIANO_ACCORDION)!
  }];

  playSoundId: string = "playSoundId";
  showNoteNamesOnKeysId: string = "showNoteNamesOnKeysId";
  showKeyNumbersOnKeysId: string = "showKeyNumbersOnKeysId";
  flipKeyboardsVerticallyId: string = "flipKeyboardsVerticallyId";

  ngOnInit() {
    this.selectedViewModeOption = this.infoService.settings.viewMode;
    this.selectedAccordionTypeOption = this.infoService.settings.instrument;
  }

  onSettingsChange(): void {
    this.infoService.settings.viewMode = this.selectedViewModeOption;
    this.infoService.settingsChangedTrigger.next(true);
    this.infoService.playerInitTrigger.next(true);
  }

  onInstrumentChange() {
    this.infoService.settings.instrument = this.selectedAccordionTypeOption;

    let path: string = INSTRUMENTS_ROUTES_MAP.get(this.infoService.settings.instrument) +
      '/' + this.tuneService.tuneModel.value.tune.ownerId +
      '/' + this.tuneService.tuneModel.value.tune.id;

    this.router.navigate([path], {state: {data: this.router.url}});

    this.infoService.settingsChangedTrigger.next(true);
    this.infoService.playerInitTrigger.next(true);
  }
}
