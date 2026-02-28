import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from 'src/app/services/category.service';

@Pipe({
	name: 'category',
})
export class CategoryPipe implements PipeTransform {
	transform(value: string | Category | undefined | null, args?: any): String {
		if (typeof value === 'string')
			return value;
		if (value == undefined)
			return "";
		return CategoryService.getFullCategoryName(value);
	}
}
