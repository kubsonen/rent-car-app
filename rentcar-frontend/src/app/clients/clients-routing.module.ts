import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientsFormComponent} from './clients-form/clients-form.component';

const routes: Routes = [
  {path: '', component: ClientsListComponent},
  {path: 'add', component: ClientsFormComponent},
  {path: 'edit/:uid', component: ClientsFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {
}
