import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'cars', loadChildren: () => import('./car/car.module').then(m => m.CarModule)},
  {path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)},
  {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  {path: 'authority', loadChildren: () => import('./authority/authority.module').then(m => m.AuthorityModule)},
  {path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
  {path: 'bundle', loadChildren: () => import('./bundle/bundle.module').then(m => m.BundleModule)},
  {path: 'priceList', loadChildren: () => import('./price-list/price-list.module').then(m => m.PriceListModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
