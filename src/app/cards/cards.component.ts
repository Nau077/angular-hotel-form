import { Component, OnInit } from '@angular/core';
import { HotelData } from '../shared/server-interact.service';
import { trigger, transition, animate, style } from '@angular/animations';
import {IserverData} from '../shared/form.service';
import * as _ from 'underscore';

@Component({
	selector: 'app-hotel-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.scss'],
	animations: [
	trigger('slideInOut', [
		transition(':enter', [
		style({transform: 'translateY(-100%)'}),
		animate('200ms ease-in', style({transform: 'translateY(0%)'}))
		]),
		transition(':leave', [
		animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
		])
	])
]
})

export class CardsComponent implements OnInit {
	constructor() {

	}
	hotelData: IserverData = new HotelData;
	data = [];
	ngOnInit() {
		this.normalizeData();
	}

 normalizeData() {
	 this.data = _.toArray(this.hotelData).map(el => ({...el, isReading: false}));
	}
	seeDiscard(i) {
	 this.data[i].isReading = !this.data[i].isReading;
	}
}
