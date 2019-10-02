import { Product } from './../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: [
		'./product-details.component.css'
	]
})
export class ProductDetailsComponent implements OnInit {
	product: Product;
	pageTitle = 'Product Detail';
	errorMessage = '';
	constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.productsService.getProductById(+this.route.snapshot.paramMap.get('id')).subscribe({
			next: (product) => {
				this.product = product;
			},
			error: (err) => {
				this.errorMessage = err;
			}
		});
	}

	onBack() {
		this.router.navigate([
			'/products'
		]);
	}
}
