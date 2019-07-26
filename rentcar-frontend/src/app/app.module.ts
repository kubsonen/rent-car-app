import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './layout/layout.module';
import {CoreModule} from './core/core.module';
import {ErrorService} from './core/service/error.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CustomHttpInterceptor} from './core/interceptor/custom-http-interceptor';
import {AppComponent} from './app.component';
import {AuthorityModule} from './authority/authority.module';
import {BundleModule} from './bundle/bundle.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OrdersModule} from './orders/orders.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    CoreModule,
    AuthorityModule,
    OrdersModule,
    BundleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: ErrorHandler, useClass: ErrorService},
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://localhost:8080/api/bundleProperty/translate/', '');
}
