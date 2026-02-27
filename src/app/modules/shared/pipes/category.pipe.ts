import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../../models/category';

@Pipe({
	name: 'category',
})
export class CategoryPipe implements PipeTransform {
	transform(value: string | Category | undefined, args?: any): String {
		if (typeof value === 'string')
			return value;
		if (value == undefined)
			return "";
		return value.name;
	}
}
