import {Injectable} from '@angular/core';
import * as moment from 'moment';
import * as MomentRange from 'moment-range';
import * as _ from 'underscore';


import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export interface IserverData {
  readonly low: {
    readonly date_from: string,
    readonly date_to: string,
    readonly econom: number,
    readonly standart?: number,
    readonly lux?: number,
    readonly child_discount_perc?: number
  };
  readonly high: {
    readonly date_from: string,
    readonly date_to: string,
    readonly econom: number,
    readonly standart: number,
    readonly lux: number,
    readonly child_discount_perc: number
  };
  readonly low2: {
    readonly date_from: string,
    readonly date_to: string,
    readonly econom: number,
    readonly standart: number,
    readonly lux: number,
    readonly child_discount_perc: number
  };
}

export interface Form {
  adultsCount: number;
  childMiddleAgeCount: number;
  childSmallAgeCount: number;
  begin: string;
  end: string;
  period: string;
}

@Injectable({providedIn: 'root'})
export class FormService {

// tslint:disable

  // сложить в массив range все дни одного интервала
  // сложить в массив rangeLow все дни в массивы интервалов data.low.date_from, data.low.date_to и т.д
  // написать функцию, которая находит количество одинаковых элементов (дней) в этих двух массивах
  // вычислить количество дней из каждого промежутка, которые оплатил пользователь - посчитать деньги на каждый день из каждого промежутка
  // сложить сумму


  static getRangeDays(begin:string, end: string, data:object, form:object){
    const Moment = MomentRange.extendMoment(moment);

    const getBaseInterval = () => {
      const dataArray = Object.entries(data)
      const start = moment(new Date((dataArray[0] as any)[1].date_from))
      const end = moment(new Date (dataArray[dataArray.length - 1][1].date_to))
      const range = Moment.range(Moment(start), Moment(end));
      const momentArray = Array.from(range.by('day'))
      const days = momentArray.map(el => moment((el as any)._d).format('MM-DD-YYYY'))
      return days
    }

    const getFormDaysInterval = ((begin, end) => {
      const Start = moment((new Date(begin))), End = moment(new Date(end))
      const range = Moment.range(moment(Start), moment(End));
      const momentArray = Array.from(range.by('day'))
      return momentArray.map(el => moment((el as any)._d).format('MM-DD-YYYY'))
    })(begin, end);

    const checkDifference = _.difference(getFormDaysInterval, getBaseInterval())

    if (checkDifference.length) {
      console.error('Неверно выбран интервал дат!')
      return
    }


    const getDataDaysInterval = Object.entries(data).map((el) => {
      const start = new Date(el[1].date_from)
      const end = new Date(el[1].date_to)
      const range = Moment.range(Moment(start), Moment(end));
      const momentArray = Array.from(range.by('day'))
      const days = momentArray.map(el => moment((el as any)._d).format('MM-DD-YYYY'))
      el[1].daysInterval = days
      return el;
        }, {});


      const calculateDays = ((dataDays, formInterval, form ) => {
         const  priceFactoryFn = (dataDays) => {
           dataDays.map(el => {
            const countSameDays  =_.intersection(formInterval, el[1].daysInterval)
           })

         }
         priceFactoryFn(dataDays)
        })( getDataDaysInterval, getFormDaysInterval, form)

 }

 static normalizeDataDate(data: object) {

  return Object.entries(data).reduce((acc, [k, v]) => {
      function normalize (date:string) {
        const pointDate:string = date.toString().split('.').join("-")
        const year:string = new Date().getFullYear().toString()
        const dateNormalized = (pointDate:string) => pointDate.split('-').reverse().join("-")
        const finalDate = dateNormalized(pointDate) + "-" + year
        return finalDate
      }

      v.date_from = (moment(normalize(v.date_from), "MM-DD-YYYY") as any)._d.toString()
      v.date_to = (moment(normalize(v.date_to), "MM-DD-YYYY") as any)._d.toString()
      return { ...acc, [k]: v };
        }, {});
   }

calculateForm(form: Form, dataServer:IserverData) {
    let data = dataServer
    console.log(data)
    const normalizeData = FormService.normalizeDataDate(data);
    FormService.getRangeDays(form.begin, form.end, normalizeData, form)
  }
}
