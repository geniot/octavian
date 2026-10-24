import {Component, ElementRef, ViewChild} from "@angular/core";
import {environment} from "../../environments/environment";
import {AnyDialog} from "./anydialog";
import {messages} from "../../environments/messages";
import {Tune} from "../../model/tune";
import {Instrument} from "../../model/enums/instrument";
import {TuneInstrument} from "../../model/enums/tuneinstrument";

@Component({
  selector: 'upload-dialog',
  templateUrl: './upload.dialog.html'
})
export class UploadDialog extends AnyDialog {
  BASE_API_URL = environment.BASE_API_URL;

  instruments = [
    {name: 'accordion', code: 'accordion-button-type'},
    {name: 'piano', code: 'piano'},
  ];

  title: string = "";
  author: string = "";

  pathPattern: RegExp = new RegExp("^[a-z0-9_-]*$");

  @ViewChild('authorInput') authorElement!: ElementRef;
  @ViewChild('titleInput') titleElement!: ElementRef;
  @ViewChild('pathInput') pathElement!: ElementRef;
  @ViewChild('museInput', {static: false}) museElement!: ElementRef;
  @ViewChild('coverInput', {static: false}) coverElement!: ElementRef;

  ngOnInit() {

    this.subscriptions.push(this.tuneService.tuneModel.asObservable().subscribe(
      m => {
        this.infoService.dialogsHandler.isShowProgressDialog = false;
        if (m.hasError) {
          this.hasError = m.hasError;
          this.message = m.message;
        } else {
          this.hasError = false;
          this.message = null;
          this.infoService.dialogsHandler.isShowUploadDialog = false;
        }
      }));
  }

  onSubmit() {
    if (this.title.trim().length == 0) {
      this.message = messages.message_title_empty;
      this.hasError = true;
      this.titleElement.nativeElement.focus();
      return;
    }
    if (this.author.trim().length == 0) {
      this.message = messages.message_author_empty;
      this.hasError = true;
      this.authorElement.nativeElement.focus();
      return;
    }
    this.message = null;
    this.hasError = false;


    let tune: Tune = new Tune();
    if (!this.infoService.isNewDialogState) {
      tune.id = this.tuneService.tuneModel.value.tune.id;
    }
    tune.title = this.title;
    tune.author = this.author;
    tune.instrument = this.infoService.settings.instrument == Instrument.PIANO ? TuneInstrument.PIANO : TuneInstrument.ACCORDION;

    this.infoService.dialogsHandler.isShowProgressDialog = true;
    this.tuneService.saveTune(tune);
  }

  override onErrorClose() {
    this.message = null;
    this.hasError = false;
    this.titleElement.nativeElement.focus();
  }

  override onShow() {
    super.onShow();
    if (this.infoService.isNewDialogState) {
      this.reset();
    } else {
      let tune: Tune = this.tuneService.tuneModel.value.tune;
      this.title = tune.title;
      this.author = tune.author;
    }

    let _this = this;
    setTimeout(function () {
      _this.titleElement.nativeElement.focus();
    }, 0);
  }

  override onHide() {
    this.reset();
    super.onHide();
  }

  reset() {
    this.museElement.nativeElement.value = "";
    this.coverElement.nativeElement.value = "";
    this.title = "";
    this.author = "";
    this.tuneService.coverFile = null;
    this.tuneService.museFile = null;
  }

  onFieldChange(val: string, event: KeyboardEvent): void {
    if (event.key != undefined && event.key.trim().length <= 1 && val.length >= 30) {
      event.preventDefault();
    }
  }

  onMuseSelected(event: any) {
    this.tuneService.museFile = event.target.files;
  }

  onCoverSelected(event: any) {
    this.tuneService.coverFile = event.target.files;
  }
}
