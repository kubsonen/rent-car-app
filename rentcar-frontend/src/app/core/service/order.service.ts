import {Injectable} from '@angular/core';
import {Order} from '../model/order.model';
import {ResourceService} from './resource.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ResourceService<Order> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'order');
  }
}
