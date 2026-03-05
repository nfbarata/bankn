/// <reference types="@angular/localize" />

import { enableProdMode, LOCALE_ID, InjectionToken, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { EventsService } from './app/services/events.service';
import { FileService } from './app/services/file.service';
import { BanknService } from './app/services/bankn.service';
import { AccountService } from './app/services/account.service';
import { TransactionService } from './app/services/transaction.service';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { InitializedGuard } from './app/guards/initialized.guard';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app/app-routing.module';
import { SharedModule } from './app/modules/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './app/components/main/main.component';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localePt, 'pt-PT');

const LANG = (function (defaultValue: String) {
  if (
    typeof window === 'undefined' ||
    typeof window.navigator === 'undefined'
  ) {
    return defaultValue;
  }
  const wn = window.navigator as any;
  let lang = wn.languages ? wn.languages[0] : defaultValue;
  lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
  return lang;
})('pt-PT');
const firebaseConfig = {
  apiKey: "AIzaSyCqXtiIQbDsLh8B0CYife9S3xBXueQtoxo",
  authDomain: "bankn-10300436-56914.firebaseapp.com",
  projectId: "bankn-10300436-56914",
  storageBucket: "bankn-10300436-56914.firebasestorage.app",
  messagingSenderId: "116495198466",
  appId: "1:116495198466:web:b9f263dc874c283bca7a1b",
  measurementId: "G-GQS9NSEL2C"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

Chart.register(ChartDataLabels);

if (environment.production) {
  enableProdMode();
}

//TODO circular dependencies:
//export const ACCOUNT_SERVICE = new InjectionToken('AccountService');
//export const TRANSACTION_SERVICE = new InjectionToken('TransactionService');

bootstrapApplication(MainComponent, {
  providers: [
    importProvidersFrom(BrowserModule, //.withServerTransition({ appId: 'serverApp' })
      FormsModule, ReactiveFormsModule, FontAwesomeModule, AppRoutingModule, SharedModule, RouterModule),
    EventsService,
    FileService,
    BanknService,
    AccountService,
    TransactionService,
    //{provide: APP_BASE_HREF, useValue : '/' },
    { provide: LOCALE_ID, useValue: LANG },
    //    { provide: ACCOUNT_SERVICE, useExisting: AccountService },
    //    { provide: TRANSACTION_SERVICE, useExisting: TransactionService },
    { provide: 'FirebaseApp', useValue: app },
    { provide: 'FirebaseAnalytics', useValue: analytics },
    InitializedGuard,
  ]
}).catch(err => console.error(err));
