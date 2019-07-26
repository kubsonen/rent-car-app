import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarListComponent } from './car-list/car-list.component';
import { CarFormComponent } from './car-form/car-form.component';
import {LayoutModule} from '../layout/layout.module';

@NgModule({
  declarations: [CarListComponent, CarFormComponent],
  imports: [
    CommonModule,
    CarRoutingModule,
    LayoutModule
  ]
})
export class CarModule { }
