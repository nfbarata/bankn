import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';//from erro

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localePt, 'pt-PT');

import { BanknRoutingModule } from './bankn-routing.module';

import { AccountService } from '../services/account.service';
import { FileService } from '../services/file.service';

import { BanknComponent } from './bankn/bankn.component';
import { MenuComponent } from './menu/menu.component';
import { MenuSideComponent } from './menu-side/menu-side.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, ReactiveFormsModule,
    BanknRoutingModule
  ],
  exports: [
  ],
  declarations: [ 
    BanknComponent, MenuComponent, HomeComponent, MenuSideComponent
  ],
  bootstrap: [ BanknComponent ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }, 
    AccountService, FileService
  ]
})
export class AppModule { }