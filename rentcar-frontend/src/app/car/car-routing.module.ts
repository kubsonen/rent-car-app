import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarListComponent} from './car-list/car-list.component';
import {CarFormComponent} from './car-form/car-form.component';

const routes: Routes = [{path: '', component: CarListComponent},
  {path: 'add', component: CarFormComponent},
  {path: 'edit/:uid', component: CarFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
