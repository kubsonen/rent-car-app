import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RefuellingListComponent} from './refuelling-list/refuelling-list.component';
import {RefuellingFormComponent} from './refuelling-form/refuelling-form.component';

const routes: Routes = [{path: '', component: RefuellingListComponent},
  {path: 'add', component: RefuellingFormComponent},
  {path: 'edit/:uid', component: RefuellingFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefuellingRoutingModule { }
