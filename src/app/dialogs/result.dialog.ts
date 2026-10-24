import {Component, OnInit} from "@angular/core";
import {AnyDialog} from "./anydialog";
import {getScore} from "../../model/constants";

@Component({
  selector: 'result-dialog',
  templateUrl: './result.dialog.html'
})
export class ResultDialog extends AnyDialog implements OnInit {


  ngOnInit() {
  }

  protected readonly getScore = getScore;

  getResultWord() {
    let score = getScore(this.statsService.statsModel.value.submittedStats);
    if (score < 90) {
      return "good";
    } else if (score < 100) {
      return "very_good";
    } else {
      return "excellent";
    }
  }
}
