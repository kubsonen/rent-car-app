import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from './service/api.service';
import {ClientsService} from './service/clients.service';
import {HttpClientModule} from '@angular/common/http';
import {LayoutModule} from '../layout/layout.module';
import {ErrorService} from './service/error.service';
import {AuthorityService} from './service/authority.service';
import {PrivilegeService} from './service/privilege.service';
import {BundleGroupService} from './service/bundle-group.service';
import {BundlePropertyService} from './service/bundle-property.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    LayoutModule
  ],
  providers: [
    ApiService,
    ClientsService,
    AuthorityService,
    PrivilegeService,
    HttpClientModule,
    ErrorService,
    BundleGroupService,
    BundlePropertyService
  ]
})
export class CoreModule { }
