import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'reflect-metadata';
import {RecaptchaComponent} from 'ng-recaptcha-2';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

RecaptchaComponent.prototype.ngOnDestroy = function () {};
