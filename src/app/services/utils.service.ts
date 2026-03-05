import { Injectable } from '@angular/core';
//@ts-ignore
import { countries } from 'country-data-list';
import comparison from 'string-comparison';

const COUNTRIES = countries.all.filter(function (country: any) {
  return country.currencies.length > 0;
});

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  static minRating = 0.6;

  getCountries() {
    return COUNTRIES;
  }

  static calculateSimilarityRating(
    description: string,
    descriptionPatterns: string[]
  ): number {
    if (descriptionPatterns.length == 0) return 0;
    var results = comparison.levenshtein.sortMatch(description, descriptionPatterns);
    return results[results.length - 1].rating;
  }

  static formatDate(date: Date, format: string): string {
    if (format === 'YYYY-MM-DD') {
      return [
        date.getFullYear(),
        ('0' + (date.getMonth() + 1)).slice(-2),
        ('0' + date.getDate()).slice(-2)
      ].join('-');
    }
    return date.toISOString();
  }

  static removeTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  static addDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static removeDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }
}
