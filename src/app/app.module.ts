import { NavbarComponent } from './navbar/navbar.component';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent,
		NavbarComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		ProductsModule,
		HttpClientModule,
		FormsModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
