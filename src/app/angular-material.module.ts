import { NgModule } from '@angular/core';
import {
   MatDatepickerModule,
   MatNativeDateModule,
   MatFormFieldModule,
   MatInputModule
} from '@angular/material';

@NgModule({
   imports: [
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule
   ],
   exports: [
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule
   ]
})

export class AngularMaterialModule { }
