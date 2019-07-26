import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BundleViewComponent} from './bundle-view/bundle-view.component';

const routes: Routes = [{path: '', component: BundleViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundleRoutingModule {
}
