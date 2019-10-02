import { Product } from './../../models/product';
import { Component, OnInit, ViewChildren, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { ProductsService } from '../../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { NumberValidators } from 'src/app/shared/numeric.validator';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: [
		'./product-edit.component.css'
	]
})
export class ProductEditComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChildren(FormControlName, { read: ElementRef })
	formInputElements: ElementRef[];

	pageTitle = 'Product Edit';
	errorMessage: string;
	productForm: FormGroup;

	product: Product;
	private sub: Subscription;
	get tags(): FormArray {
		return this.productForm.get('tags') as FormArray;
	}
	// Use with the generic validation message class
	displayMessage: { [key: string]: string } = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;

	constructor(
		private fb: FormBuilder,
		private productsService: ProductsService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.validationMessages = {
			productName: {
				required: 'Product name is required.',
				minlength: 'Product name must be at least three characters.',
				maxlength: 'Product name cannot exceed 50 characters.'
			},
			productCode: {
				required: 'Product code is required.'
			},
			starRating: {
				range: 'Rate the product between 1 (lowest) and 5 (highest).'
			}
		};

		// Define an instance of the validator for use with this form,
		// passing in this form's set of validation messages.
		this.genericValidator = new GenericValidator(this.validationMessages);
	}

	getProduct(id: number): void {
		this.productsService.getProductById(id).subscribe({
			next: (prod) => this.displayProduct(prod),
			error: (err) => (this.errorMessage = err)
		});
	}

	displayProduct(prod: Product): void {
		if (this.productForm) {
			this.productForm.reset();
		}

		this.product = prod;

		if (this.product.id === 0) {
			this.pageTitle = 'Add Product';
		}
		else {
			this.pageTitle = `Edit Product: ${this.product.productName} `;
		}

		this.productForm.patchValue({
			productName: this.product.productName,
			productCode: this.product.productCode,
			starRating: this.product.starRating,
			description: this.product.description
		});

		this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
	}

	ngOnInit() {
		this.productForm = this.fb.group({
			productName: [
				'',
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(50)
				]
			],
			productCode: [
				'',
				[
					Validators.required
				]
			],
			starRating: [
				'',
				NumberValidators.range(1, 5)
			],
			tags: this.fb.array([]),
			description: ''
		});

		this.sub = this.route.paramMap.subscribe((params) => {
			const id = +params.get('id');
			this.getProduct(id);
		});
	}

	saveProduct() {
		if (this.productForm.valid) {
			if (this.productForm.dirty) {
				const p = { ...this.product, ...this.productForm.value };

				if (p.id === 0) {
					this.productsService.addProduct(p).subscribe({
						next: () => this.saveAndNavigate(),
						error: (err) => (this.errorMessage = err)
					});
				}
				else {
					this.productsService.updateProduct(p).subscribe({
						next: () => this.saveAndNavigate(),
						error: (err) => (this.errorMessage = err)
					});
				}
			}
			else {
				this.saveAndNavigate();
			}
		}
		else {
			this.errorMessage = 'Please correct the validation errors.';
		}
	}

	deleteTag(tageId: number): void {
		this.tags.removeAt(tageId);
		this.tags.markAsDirty();
	}

	addTag(): void {
		this.tags.push(new FormControl());
	}

	deleteProduct() {
		if (this.product.id === 0) {
			this.saveAndNavigate();
		}
		else {
			if (confirm(`Are you really sure to delete: ${this.product.productName}`)) {
				this.productsService.deleteProduct(this.product.id).subscribe({
					next: () => this.saveAndNavigate(),
					error: (err) => (this.errorMessage = err)
				});
			}
		}
		this.productsService.deleteProduct(+this.route.snapshot.paramMap.get('id'));
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	ngAfterViewInit(): void {
		const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
			fromEvent(formControl.nativeElement, 'blur')
		);

		// Merge the blur event observable with the valueChanges observable
		// so we only need to subscribe once.
		merge(this.productForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe((value) => {
			this.displayMessage = this.genericValidator.processMessages(this.productForm);
		});
	}

	saveAndNavigate(): void {
		this.productForm.reset();
		this.router.navigate([
			'/products'
		]);
	}
}
