import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthorityRoutingModule} from './authority-routing.module';
import {AuthorityListComponent} from './authority-list/authority-list.component';
import {LayoutModule} from '../layout/layout.module';
import {AuthorityTabsComponent} from './authority-tabs/authority-tabs.component';
import {RouterModule} from '@angular/router';
import {AuthorityPrivilegeListComponent} from './authority-privilege-list/authority-privilege-list.component';
import {AuthoritySetupComponent} from './authority-setup/authority-setup.component';
import {AuthorityFormComponent} from './authority-form/authority-form.component';
import { AuthorityPrivilegeFormComponent } from './authority-privilege-form/authority-privilege-form.component';

@NgModule({
  entryComponents: [AuthorityFormComponent, AuthorityPrivilegeFormComponent],
  declarations: [AuthorityListComponent, AuthorityTabsComponent, AuthorityPrivilegeListComponent, AuthoritySetupComponent,
    AuthorityFormComponent,
    AuthorityPrivilegeFormComponent],
  imports: [
    CommonModule,
    AuthorityRoutingModule,
    LayoutModule,
    RouterModule
  ]
})
export class AuthorityModule {
}
