import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsData } from './products-data';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { ProductsService } from './products.service';
import { SearchFilter } from '../shared/searchFilter.pipe';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
	declarations: [
		ProductListComponent,
		SearchFilter,
		ProductEditComponent,
		ProductDetailsComponent
	],
	imports: [
		CommonModule,
		InMemoryWebApiModule.forRoot(ProductsData),
		RouterModule.forChild([
			{ path: 'products', component: ProductListComponent },
			{ path: 'products/:id', component: ProductDetailsComponent },
			{
				path: 'products/:id/edit',
				// 	canDeactivate: [
				// ProductEditGuard
				// 	]
				component: ProductEditComponent
			}
		]),
		FormsModule,
		SharedModule,
		ReactiveFormsModule
	],
	exports: [
		ProductListComponent
	],
	providers: [
		ProductsService
	]
})
export class ProductsModule {}
