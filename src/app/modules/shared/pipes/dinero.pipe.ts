import { Pipe, PipeTransform } from '@angular/core';
// @ts-ignore
import coinify from 'coinify';
import { Dinero, toDecimal } from 'dinero.js';

@Pipe({ name: 'dinero' })
export class DineroPipe implements PipeTransform {
  transform(value: Dinero<number> | null, args?: any): String {
    if (value == null) return '';
    return toDecimal(value) + coinify.symbol(value.toJSON().currency.code);
  }
}
