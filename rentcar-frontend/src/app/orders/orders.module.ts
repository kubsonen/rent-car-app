import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersListComponent} from './orders-list/orders-list.component';
import {LayoutModule} from '../layout/layout.module';
import {OrdersFormComponent} from './orders-form/orders-form.component';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { OrdersServiceFormComponent } from './orders-service-form/orders-service-form.component';

@NgModule({
  entryComponents: [OrdersServiceFormComponent],
  declarations: [OrdersListComponent, OrdersFormComponent, OrdersServiceFormComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    LayoutModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    FontAwesomeModule,
  ]
})
export class OrdersModule {
}
