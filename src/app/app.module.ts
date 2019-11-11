import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelFormComponent } from './hotel-form/hotel-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule} from '@angular/material';

/* Angular material 8 */
import { AngularMaterialModule } from './angular-material.module';
import { SatDatepickerModule, SatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,  } from 'saturn-datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormService } from './shared/form.service';
import { ServerService } from './shared/server-interact.service';
import { UserFormComponent } from './hotel-form/user-form/user-form.component';
import { CardsComponent } from './cards/cards.component';


@NgModule({
	declarations: [
		AppComponent,
		HotelFormComponent,
		UserFormComponent,
		CardsComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AngularMaterialModule,
		SatDatepickerModule,
		SatNativeDateModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		SatDatepickerModule,
		SatNativeDateModule
	],
	providers: [
	{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
	{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
	FormService, ServerService
		],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }
