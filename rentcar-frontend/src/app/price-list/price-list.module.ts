import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceListRoutingModule } from './price-list-routing.module';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { PriceListListComponent } from './price-list-list/price-list-list.component';
import {LayoutModule} from '../layout/layout.module';

@NgModule({
  declarations: [PriceListFormComponent, PriceListListComponent],
  imports: [
    CommonModule,
    PriceListRoutingModule,
    LayoutModule
  ]
})
export class PriceListModule { }
