export interface Product {
	// tslint:disable-next-line: indent
	id: number;
	productName: string;
	productCode: string;
	tags?: string[];
	releaseDate: string;
	price: number;
	description: string;
	starRating: number;
	imageUrl: string;
}
