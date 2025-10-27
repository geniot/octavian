import {Component} from "@angular/core";
import {INSTRUMENTS_NAMES_MAP} from "src/model/constants";
import {Instrument} from "src/model/enums/instrument";
import {AnyDialog} from "./anydialog";

@Component({
  selector: 'about-dialog',
  templateUrl: './about.dialog.html'
})
export class AboutDialog extends AnyDialog {
  INSTRUMENTS_NAMES_MAP = INSTRUMENTS_NAMES_MAP;
  Instrument = Instrument;
}
