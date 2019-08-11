import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PriceListListComponent} from './price-list-list/price-list-list.component';
import {PriceListFormComponent} from './price-list-form/price-list-form.component';

const routes: Routes = [{path: '', component: PriceListListComponent},
  {path: 'add', component: PriceListFormComponent},
  {path: 'edit/:uid', component: PriceListFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceListRoutingModule { }
