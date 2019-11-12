import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({providedIn: 'root'})
export class ServerService {

}

export const selectedIntervals = ['econom', 'standart', 'lux'];

export class HotelData {
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
			};
		}
	}


// Здесь в случае реального взаимодействия с сервером, необходимо
// осуществлять все требуемые операции с api в таком ключе:

// export interface Data {
//   id: number
//   title: string
//   completed: boolean
//   date?: any
// }

// @Injectable({providedIn: 'root'})
// export class DataService {
//   public data: Data[] = []

//   constructor(private http: HttpClient) {}

//   fetchData(): Observable<Data[]> {
//     return this.http.get<Data[]>('https://jsonplaceholder.typicode.com/todos?_limit=30')
//       .pipe(tap(data => this.data = data))
//   }
// }
