import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import {Form, FormService} from '../shared/form.service';
import * as moment from 'moment';


class HotelData {
	low: { date_from: string; date_to: string; econom: number; standart: number; lux: number; child_discount_perc: number; };
	high: { date_from: string; date_to: string; econom: number; standart: number; lux: number; child_discount_perc: number; };
	low2: { date_from: string; date_to: string; econom: number; standart: number; lux: number; child_discount_perc: number; };

	constructor() {
			this.low = {
				date_from: '15.05',
				date_to: '20.06',
				econom: 1000,
				standart: 1500,
				lux: 2000,
				child_discount_perc: 50
			};
			this.high = {
				date_from: '21.06',
				date_to: '20.08',
				econom: 1800,
				standart: 2800,
				lux: 4000,
				child_discount_perc: 25
			};
		this.low2 = {
				date_from: '21.08',
				date_to: '15.09',
				econom: 1200,
				standart: 1800,
				lux: 2300,
				child_discount_perc: 25
			}
		}
	}

function getDataInsts () {
	const dataInstance = new HotelData()
	return dataInstance
}

const selectedIntervals = ['econom', 'standart', 'lux']


@Component({
selector: 'app-hotel-form',
templateUrl: './hotel-form.component.html',
styleUrls: ['./hotel-form.component.scss']
})
export class HotelFormComponent implements OnInit {
	hotelCalcForm: FormGroup;
	selectedIntervals = selectedIntervals;
	titlePrice: string | number = '';
	isCalculated: boolean = false;
	adultCount = '';
	middleChildCount = '';
	littleChildCount = '';
	isChildChecked = true;
	period = '';

	constructor(private fb: FormBuilder, private formService: FormService) {
	}

	ngOnInit() {
		this.initForm();
	}

	// Инициализация формы
	initForm() {
		this.hotelCalcForm = this.fb.group({
		date: [{begin: new Date(2019, 4, 15), end: new Date(2019, 8, 15)}
		],
		adultsCount: [0, [
		Validators.required,
		Validators.pattern(/^[1-9]\d*$/)
		]],
		childMiddleAgeCount:  [0, [
		Validators.required,
		Validators.pattern(/^[0-9]\d*$/)
		]],
		childSmallAgeCount:  [0, [
		Validators.required,
		Validators.pattern(/^[0-9]\d*$/)
		]],
		selectedPeriod: [selectedIntervals[0],
		[
		Validators.required
		]],
		});
	}

	isControlInvalid(controlName: string): boolean {
		const control = this.hotelCalcForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	calculate() {
		this.isChildChecked = true;
		const controls = this.hotelCalcForm.controls;
		// Проверяем форму на валидность
		if (this.hotelCalcForm.invalid) {
		// Если форма не валидна, то помечаем все контролы как touched
		Object.keys(controls)
		.forEach(controlName => controls[controlName].markAsTouched());
		// Прерываем выполнение метода
		return;
	}

	const timeBegin = moment(this.hotelCalcForm.value.date.begin).format('MM-DD-YYYY');
	const timeEnd = moment(this.hotelCalcForm.value.date.end).format('MM-DD-YYYY');

	const form: Form = {
	period: this.hotelCalcForm.value.selectedPeriod,
	adultsCount: this.hotelCalcForm.value.adultsCount,
	childMiddleAgeCount: this.hotelCalcForm.value.childMiddleAgeCount,
	childSmallAgeCount:  this.hotelCalcForm.value.childSmallAgeCount,
	begin: timeBegin,
	end: timeEnd
	};

	// tslint:disable-next-line: align
	const checkChild = this.formService.checkSmallAgeCount(form)
		if (!checkChild) {
		this.isChildChecked = false
		this.isCalculated = false
	return
	}
	const price = this.formService.calculateForm(form, getDataInsts ());
	this.titlePrice = price

	this.adultCount = this.hotelCalcForm.value.adultsCount;
	this.middleChildCount = this.hotelCalcForm.value.childMiddleAgeCount;
	this.littleChildCount = this.hotelCalcForm.value.childSmallAgeCount;
	this.period = this.hotelCalcForm.value.selectedPeriod;

	if ((typeof this.titlePrice)=='number') {
		this.isCalculated = true
	} else {
	this.isCalculated = false
		}
	}
}

