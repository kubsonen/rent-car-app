import { Injectable } from '@angular/core';
import {HttpOptions, ResourceService} from './resource.service';
import {OrderServiceModel} from '../model/order-service.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService extends ResourceService<OrderServiceModel>{
  constructor(httpClient: HttpClient) {
    super(httpClient, 'orderService');
  }

  getForOrder(uuid: string): Observable<OrderServiceModel[]> {
    return this.httpClient.get<OrderServiceModel[]>(this.resourceApiPrefix + this.endpoint + '/servicesForOrder/' + uuid, new HttpOptions());
  }

}
