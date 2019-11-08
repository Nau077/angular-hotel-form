	import {Injectable} from '@angular/core';
	import * as moment from 'moment';
	import * as MomentRange from 'moment-range';
	import * as _ from 'underscore';
	const Moment = MomentRange.extendMoment(moment);

	export interface IserverData {
	low: {
		date_from: string,
		date_to: string,
		econom: number,
		standart: number,
		lux?: number,
		child_discount_perc: number
	};
	readonly high: {
		date_from: string,
		date_to: string,
		econom: number,
		standart: number,
		lux: number,
		child_discount_perc: number
	};
	low2: {
		date_from: string,
		date_to: string,
		econom: number,
		standart: number,
		lux: number,
		child_discount_perc: number
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

	function getFormDays(begin:string, end: string) {
		const startMoment = moment((new Date(begin))), 
				endMoment = moment(new Date(end)),
				range = Moment.range(moment(startMoment), moment(endMoment)),
				momentArray = Array.from(range.by('day'))
		return momentArray.map(el => moment((el as any)._d).format('MM-DD-YYYY'))
	};

	function getBaseDays(data:object) {
		const dataArray = Object.entries(data),
			start = moment(new Date((dataArray[0] as any)[1].date_from)),
			end = moment(new Date (dataArray[dataArray.length - 1][1].date_to)),
			range = Moment.range(Moment(start), Moment(end)),
			momentArray = Array.from(range.by('day')),
			days = momentArray.map(el => moment((el as any)._d).format('MM-DD-YYYY'))
		return days
	}

	function getDataDays (data:object) {
		return Object.entries(data).map((el) => {
			const start = new Date(el[1].date_from),
				end = new Date(el[1].date_to),
				range = Moment.range(Moment(start), Moment(end)),
				momentArray = Array.from(range.by('day')),
				days = momentArray.map(el => moment((el as any)._d).format('MM-DD-YYYY'))
			el[1].daysInterval = days
			return el;
		});
	}
	
	function calculatePrice (dataDays, formInterval, form) {
		const  priceFactoryFn = ((dataDays) => {
			return dataDays.reduce((acc, el) => {
			let countSameDays  =_.intersection(formInterval, el[1].daysInterval)
			if (formInterval.length > 1) countSameDays.pop();
			const adultCount = (form as any).adultsCount,
				childCount = (form as any).childMiddleAgeCount,
				formPeriod = (form as any).period,
				elPeriodPrice = el[1][formPeriod],
				discount_perc = el[1].child_discount_perc / 100
			let price = countSameDays.length * elPeriodPrice * adultCount
			let priceForCount = countSameDays.length * elPeriodPrice * childCount
			if (countSameDays.length == 0) {
				price = 0
				priceForCount = 0
			}
			if (childCount>0) {
			const childPerc = childCount * countSameDays.length * elPeriodPrice * discount_perc
			const priceChild = priceForCount - childPerc
			return acc + price + priceChild
			}
			return acc + price
			}, 0)
		})(dataDays)
		return priceFactoryFn
	}

	@Injectable({providedIn: 'root'})
	export class FormService {

	static getPrice(begin:string, end: string, data:object, form:object){
		const getBaseInterval:Array<string> = getBaseDays(data)
		const getFormDaysInterval:Array<string> = getFormDays(begin, end);
		const checkDifference:Array<string | []> = _.difference(getFormDaysInterval, getBaseInterval);

	if (checkDifference.length) {
		throw "Некорректный интервал между датами, выберите между 15 мая и 15 сентября";
	}

	const getDataDaysInterval:Array<any> = getDataDays(data);
	const finalPrice = calculatePrice( getDataDaysInterval, getFormDaysInterval, form);
		return finalPrice
	}

	static normalizeDataDate(data: object) {

	return Object.entries(data).reduce((acc, [k, v]) => {
		function normalize (date:string) {
			const pointDate:string = date.toString().split('.').join("-"),
				year:string = new Date().getFullYear().toString(),
				dateNormalized = (pointDate:string) => pointDate.split('-').reverse().join("-"),
				finalDate = dateNormalized(pointDate) + "-" + year
		return finalDate
		}

	v.date_from = (moment(normalize(v.date_from), "MM-DD-YYYY") as any)._d.toString()
	v.date_to = (moment(normalize(v.date_to), "MM-DD-YYYY") as any)._d.toString()
		return { ...acc, [k]: v };
		}, {});
	}
	
	calculateForm(form: Form, dataServer:IserverData) {
		const normalizeData = FormService.normalizeDataDate(dataServer);
		try {
			return FormService.getPrice(form.begin, form.end, normalizeData, form)
		} catch (e) {
			return e
		}
	}
	checkSmallAgeCount(form:Form) {
		const child = form.childSmallAgeCount,
			adult = form.adultsCount
		if (child/adult > 3) return false
			return true	
		}
	}
