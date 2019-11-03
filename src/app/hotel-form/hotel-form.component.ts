import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import {Form, FormService, IserverData} from '../shared/form.service';
import * as moment from 'moment';

const dataServer: IserverData = {
  low: {
    date_from: '15.05',
    date_to: '20.06',
    econom: 1000,
    standart: 1500,
    lux: 2000,
    child_discount_perc: 50
},
high: {
    date_from: '21.06',
    date_to: '20.08',
    econom: 1800,
    standart: 2800,
    lux: 4000,
    child_discount_perc: 25
},
low2: {
    date_from: '21.08',
    date_to: '15.09',
    econom: 1200,
    standart: 1800,
    lux: 2300,
    child_discount_perc: 25
  }
};

const selectedIntervals = Object.entries(dataServer).map(el => el[0]);


@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss']
})
export class HotelFormComponent implements OnInit {
  hotelCalcForm: FormGroup;
  selectedIntervals = selectedIntervals;

  constructor(private fb: FormBuilder, private formService: FormService) {

  }

ngOnInit() {
  this.initForm();
}

  // Инициализация формы
 initForm() {
  this.hotelCalcForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.pattern(/[А-я]/)
     ]
    ],
    email: ['', [
      Validators.required, Validators.email
     ]
    ],
    date: [{begin: new Date(2019, 5, 5), end: new Date(2018, 9, 25)}],
    adultsCount: Number,
    childMiddleAgeCount: Number,
    childSmallAgeCount: Number,
    selectedPeriod: String
  });
 }

 isControlInvalid(controlName: string): boolean {
  const control = this.hotelCalcForm.controls[controlName];
  const result = control.invalid && control.touched;
  return result;
  }
  calculate() {
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
    const data = dataServer;
    this.formService.calculateForm(form, data);
  }


  onSubmit() {
    const controls = this.hotelCalcForm.controls;
    // Проверяем форму на валидность
    if (this.hotelCalcForm.invalid) {
       // Если форма не валидна, то помечаем все контролы как touched
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
       // Прерываем выполнение метода
      return;
      }
     // Todo: Обработка данных формы
    }
}

