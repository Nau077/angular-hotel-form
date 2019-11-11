import { Component, OnInit } from '@angular/core';
import { HotelData,  selectedIntervals } from '../shared/server-interact.service';
import { trigger, transition, animate, style } from '@angular/animations'
import {IserverData} from '../shared/form.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-hotel-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {
	ngOnInit(){
		this.normalizeData()
	}
	hotelData:IserverData = new HotelData
	data = []
	constructor() {
		
	}

 normalizeData() {
	 this.data =_.toArray(this.hotelData).map(el => ({...el, isReading: false}))
  }
  seeDiscard(i) {
	 this.data[i].isReading = !this.data[i].isReading
  }
}
