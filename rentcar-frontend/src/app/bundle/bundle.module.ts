import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BundleRoutingModule} from './bundle-routing.module';
import {BundleViewComponent} from './bundle-view/bundle-view.component';
import {CoreModule} from '../core/core.module';
import {LayoutModule} from '../layout/layout.module';
import { BundleGroupFormComponent } from './bundle-group-form/bundle-group-form.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { BundlePropertyFormComponent } from './bundle-property-form/bundle-property-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  entryComponents: [BundleGroupFormComponent, BundlePropertyFormComponent],
  declarations: [BundleViewComponent, BundleGroupFormComponent, BundlePropertyFormComponent],
  imports: [
    CommonModule,
    BundleRoutingModule,
    CoreModule,
    LayoutModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BundleModule {
}
