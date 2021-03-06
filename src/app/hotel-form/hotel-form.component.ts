import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';
import {Form, FormService} from '../shared/form.service';
import { HotelData,  selectedIntervals } from '../shared/server-interact.service';
import * as moment from 'moment';

@Component({
	selector: 'app-hotel-form',
	templateUrl: './hotel-form.component.html',
	styleUrls: ['./hotel-form.component.scss'],
	animations: [
		trigger('slideInLeft', [
		transition(':enter', [
			style({transform: 'translateX(-100%)'}),
			animate('200ms ease-in', style({transform: 'translateX(0%)'}))
		]),
		transition(':leave', [
			animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
		])
		])
	]
})
export class HotelFormComponent implements OnInit {
	hotelCalcForm: FormGroup;
	selectedIntervals = selectedIntervals;
	titlePrice: string | number = '';
	isCalculated = false;
	adultCount = '';
	middleChildCount = '';
	littleChildCount = '';
	isChildChecked = true;
	period = '';
	date = '';

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
	 this.date = timeBegin + ':' + timeEnd;
	 const form: Form = {
		period: this.hotelCalcForm.value.selectedPeriod,
		adultsCount: this.hotelCalcForm.value.adultsCount,
		childMiddleAgeCount: this.hotelCalcForm.value.childMiddleAgeCount,
		childSmallAgeCount:  this.hotelCalcForm.value.childSmallAgeCount,
		begin: timeBegin,
		end: timeEnd
	};

	// tslint:disable-next-line: align
	const checkChild = this.formService.checkSmallAgeCount(form);
		if (!checkChild) {
		this.isChildChecked = false;
		this.isCalculated = false;
		return;
	}
	 // tslint:disable-next-line: new-parens
	 const price = this.formService.calculateForm(form, new HotelData);
	 this.titlePrice = price;

	 this.adultCount = this.hotelCalcForm.value.adultsCount;
	 this.middleChildCount = this.hotelCalcForm.value.childMiddleAgeCount;
	 this.littleChildCount = this.hotelCalcForm.value.childSmallAgeCount;
	 this.period = this.hotelCalcForm.value.selectedPeriod;

	 if ((typeof this.titlePrice) == 'number') {
		this.isCalculated = true;
	} else {
	this.isCalculated = false;
		}
	}
}

