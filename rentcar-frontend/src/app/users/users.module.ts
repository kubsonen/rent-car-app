import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import {LayoutModule} from '../layout/layout.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [UsersFormComponent, UsersListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    LayoutModule,
    RouterModule,
    FormsModule
  ]
})
export class UsersModule { }
