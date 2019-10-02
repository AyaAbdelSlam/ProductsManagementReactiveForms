import { ProductsService } from './../../products.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: [
		'./product-list.component.css'
	]
})
export class ProductListComponent implements OnInit {
	products: Product[] = [];
	filteredProducts: Product[] = [];
	pageTitle = 'Product List';
	imageWidth = 50;
	imageMargin = 2;
	showImage = false;
	listFilter = '';
	errorMessage = '';
	constructor(private productsService: ProductsService) {}

	ngOnInit() {
		this.productsService.getAllProducts().subscribe({
			next: (products) => {
				this.products = products;
				this.filteredProducts = this.products;
			},
			error: (err) => (this.errorMessage = err)
		});
	}

	toggleImage() {
		this.showImage = !this.showImage;
	}
}
