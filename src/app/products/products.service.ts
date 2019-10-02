import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { Observable, throwError, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	private productsUrl = 'api/products';
	constructor(private http: HttpClient) {}

	getAllProducts(): Observable<Product[]> {
		// return this.http
		// 	.get<Product[]>(this.productsUrl)
		// 	.pipe(tap((data) => console.log(JSON.stringify(data))), catchError(this.handleError));
		// console.log(this.products);
		return of(this.products);
	}

	getProductById(productId: number): Observable<Product> {
		if (productId === 0) {
			return of(this.initProduct());
		}
		return of(this.products.find((pro) => pro.id === productId));
	}

	deleteProduct(id: number): Observable<{}> {
		const updateItem = this.products.find((pro) => pro.id === id);

		const index = this.products.indexOf(updateItem);
		this.products.splice(index, 1);
		return of({});
	}

	updateProduct(product: Product): Observable<Product> {
		const updateItem = this.products.find((pro) => pro.id === product.id);

		const index = this.products.indexOf(updateItem);

		// this.products[index] = product;
		this.products[index].productName = product.productName;
		this.products[index].productCode = product.productCode;
		this.products[index].description = product.description;
		this.products[index].starRating = product.starRating;

		return of(this.products[index]);
	}

	addProduct(prod: Product): Observable<Product> {
		let lastProdId = this.products[this.products.length - 1].id;
		lastProdId = lastProdId + 1;
		prod.id = lastProdId;
		this.products.push(prod);

		return of(prod);
	}

	private findIndexToUpdate(newItem) {
		return newItem.id === this;
	}

	// Helper Methods
	private handleError(err) {
		// in a real world app, we may send the server to some remote logging infrastructure
		// instead of just logging it to the console
		let errorMessage: string;
		if (err.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			errorMessage = `An error occurred: ${err.error.message}`;
		}
		else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
		}
		console.error(err);
		return throwError(errorMessage);
	}

	products: Product[] = [
		{
			id: 1,
			productName: 'Leaf Rake',
			productCode: 'GDN-0011',
			releaseDate: 'March 19, 2018',
			description: 'Leaf rake with 48-inch wooden handle',
			price: 19.95,
			starRating: 3.2,
			imageUrl: 'assets/images/leaf_rake.png',
			tags: [
				'rake',
				'leaf',
				'yard',
				'home'
			]
		},
		{
			id: 2,
			productName: 'Garden Cart',
			productCode: 'GDN-0023',
			releaseDate: 'March 18, 2018',
			description: '15 gallon capacity rolling garden cart',
			price: 32.99,
			starRating: 4.2,
			imageUrl: 'assets/images/garden_cart.png'
		},
		{
			id: 5,
			productName: 'Hammer',
			productCode: 'TBX-0048',
			releaseDate: 'May 21, 2018',
			description: 'Curved claw steel hammer',
			price: 8.9,
			starRating: 4.8,
			imageUrl: 'assets/images/hammer.png',
			tags: [
				'tools',
				'hammer',
				'construction'
			]
		},
		{
			id: 8,
			productName: 'Saw',
			productCode: 'TBX-0022',
			releaseDate: 'May 15, 2018',
			description: '15-inch steel blade hand saw',
			price: 11.55,
			starRating: 3.7,
			imageUrl: 'assets/images/saw.png'
		},
		{
			id: 10,
			productName: 'Video Game Controller',
			productCode: 'GMG-0042',
			releaseDate: 'October 15, 2018',
			description: 'Standard two-button video game controller',
			price: 35.95,
			starRating: 4.6,
			imageUrl: 'assets/images/xbox-controller.png'
		}
	];

	initProduct(): Product {
		return {
			id: 0,
			productName: null,
			productCode: null,
			releaseDate: null,
			description: null,
			price: 0,
			starRating: 0,
			imageUrl: null,
			tags: []
		};
	}
}
