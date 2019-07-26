import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorityListComponent} from './authority-list/authority-list.component';
import {AuthorityPrivilegeListComponent} from './authority-privilege-list/authority-privilege-list.component';
import {AuthoritySetupComponent} from './authority-setup/authority-setup.component';

const routes: Routes =
  [{path: '', component: AuthorityListComponent},
    {path: 'privileges', component: AuthorityPrivilegeListComponent},
    {path: 'setup', component: AuthoritySetupComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorityRoutingModule {
}
