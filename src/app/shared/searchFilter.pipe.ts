import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../products/models/product';

@Pipe({ name: 'filter' })
export class SearchFilter implements PipeTransform {
	transform(items: any[], searchText: string) {
		if (!items) {
			return [];
		}
		if (!searchText) {
			return items;
		}

		searchText = searchText.toLocaleLowerCase();
		return items.filter((product: Product) => product.productName.toLocaleLowerCase().indexOf(searchText) !== -1);
	}
}
