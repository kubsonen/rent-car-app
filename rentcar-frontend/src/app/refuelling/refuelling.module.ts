import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefuellingRoutingModule } from './refuelling-routing.module';
import { RefuellingFormComponent } from './refuelling-form/refuelling-form.component';
import { RefuellingListComponent } from './refuelling-list/refuelling-list.component';
import {LayoutModule} from '../layout/layout.module';

@NgModule({
  declarations: [RefuellingFormComponent, RefuellingListComponent],
  imports: [
    CommonModule,
    RefuellingRoutingModule,
    LayoutModule
  ]
})
export class RefuellingModule { }
