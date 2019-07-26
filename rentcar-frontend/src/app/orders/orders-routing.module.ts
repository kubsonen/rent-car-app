import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrdersListComponent} from './orders-list/orders-list.component';
import {OrdersFormComponent} from './orders-form/orders-form.component';

const routes: Routes = [
  {path: '', component: OrdersListComponent},
  {path: 'add', component: OrdersFormComponent},
  {path: 'edit/:uid', component: OrdersFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
