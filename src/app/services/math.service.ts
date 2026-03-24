import { Injectable, inject } from '@angular/core';
import { BanknService } from './bankn.service';
import { Dinero, dinero, Currency, toDecimal } from 'dinero.js';
import * as currencies from '@dinero.js/currencies';
import { countries } from 'country-data-list';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  private banknService = inject(BanknService);

  static getCurrencyOfCountry(countryCode: string): string {
    for (var country of countries.all) {
      if (country.alpha2 == countryCode) 
        return country.currencies[0];
    }
    throw new Error(countryCode + ' not found in list of countries');
  }

  getReferenceCurrency(): string {
    var country = this.banknService.getReferenceCountry();
    return MathService.getCurrencyOfCountry(country);
  }

  toCurrency(currencyCode?: string): Currency<number> {
    if (currencyCode == undefined) currencyCode = this.getReferenceCurrency();
    return MathService.toCurrency(currencyCode);
  }

  static toCurrency(currencyCode: string): Currency<number> {
    return currencies[currencyCode as keyof typeof currencies];
  }

  static toCurrencyFromCountry(countryCode: string): Currency<number> {
    var currencyCode = MathService.getCurrencyOfCountry(countryCode);
    return MathService.toCurrency(currencyCode);
  }

  toDinero(value: number, currency?: Currency<number>): Dinero<number> {
    if (currency == undefined) currency = this.toCurrency();
    return MathService.toDinero(value, currency);
  }

  static toDinero(value: number, currency: Currency<number>): Dinero<number> {
    //console.log(value);
    //console.log(currency);
    return dinero({
      amount: value,
      currency: currency,
    });
  }

  static toInputValue(value: Dinero<number>): string {
    return toDecimal(value);
  }

  static fromInputValue(number: string, countryCode: string): Dinero<number> {
    var currency = MathService.toCurrencyFromCountry(countryCode);
    var value = Math.round(
      parseFloat(number) * Math.pow(10, currency.exponent)
    );
    return this.toDinero(value, currency);
  }
}
