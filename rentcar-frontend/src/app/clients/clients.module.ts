import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ClientsListComponent, ClientsFormComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    LayoutModule,
    FormsModule,
    NgbModule
  ]
})
export class ClientsModule { }
