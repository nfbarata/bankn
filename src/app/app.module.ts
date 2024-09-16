//angular dependecies
import { NgModule, LOCALE_ID, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { APP_BASE_HREF } from '@angular/common';//from erro
//external dependencies
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as farSquare,
  faCheckSquare as farCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStackOverflow,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';
//localization
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localePt, 'pt-PT');
//modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
//services
import { FileService } from './services/file.service';
import { EventsService } from './services/events.service';
import { BanknService } from './services/bankn.service';
import { AccountService } from './services/account.service';
import { TransactionService } from './services/transaction.service';
//guards
import { InitializedGuard } from './guards/initialized.guard';
//components
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuSideComponent } from './components/menu-side/menu-side.component';
import { HomeComponent } from './components/home/home.component';
//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import the functions you need from the SDKs you need
//import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
// charts
//import { GoogleChartsModule } from 'angular-google-charts';

//TODO pass to object
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

//registerLocaleData(localePt, 'pt-PT');

//TODO circular dependencies:
//export let AppInjector: Injector;
export const ACCOUNT_SERVICE = new InjectionToken('AccountService');
export const TRANSACTION_SERVICE = new InjectionToken('TransactionService');

@NgModule({
  imports: [
    BrowserModule, //.withServerTransition({ appId: 'serverApp' })
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    //GoogleChartsModule,
  ],
  exports: [],
  declarations: [
    MainComponent,
    MenuComponent,
    HomeComponent,
    MenuSideComponent,
  ],
  bootstrap: [MainComponent],
  providers: [
    EventsService,
    FileService,
    BanknService,
    AccountService,
    TransactionService,
    //{provide: APP_BASE_HREF, useValue : '/' },
    { provide: LOCALE_ID, useValue: LANG },
    { provide: ACCOUNT_SERVICE, useExisting: AccountService },
    { provide: TRANSACTION_SERVICE, useExisting: TransactionService },
    InitializedGuard,
  ],
})
export class AppModule {
  constructor(
    //private injector:Injector,
    private library: FaIconLibrary
  ) {
    //AppInjector=this.injector;
    library.addIcons(
      faSquare,
      faCheckSquare,
      farSquare,
      farCheckSquare,
      faStackOverflow,
      faGithub,
      faMedium
    );

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: 'AIzaSyBZHKQH0wcP_rjvqRX0lZNHOq-jh8eYqRQ',
      authDomain: 'nfbarata-bankn.firebaseapp.com',
      databaseURL: 'https://nfbarata-bankn.firebaseio.com',
      projectId: 'nfbarata-bankn',
      storageBucket: 'nfbarata-bankn.appspot.com',
      messagingSenderId: '355178782356',
      appId: '1:355178782356:web:1f470491d43237b8031e81',
      measurementId: 'G-FSZ84CBVCC',
    };

    // Initialize Firebase
    //const app = initializeApp(firebaseConfig);
    //const analytics = getAnalytics(app);
  }
}
