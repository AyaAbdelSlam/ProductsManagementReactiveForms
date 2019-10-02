import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-star-rating',
	templateUrl: './star-rating.component.html',
	styleUrls: [
		'./star-rating.component.css'
	]
})
export class StarRatingComponent implements OnChanges {
	@Input() rating = 0;
	starWidth = 0;
	@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

	ngOnChanges(): void {
		this.starWidth = this.rating * 75 / 5;
	}

	onClick(): void {
		this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
	}
}
