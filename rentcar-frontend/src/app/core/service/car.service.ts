import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {Car} from '../model/car.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService extends ResourceService<Car> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'car');
  }
}
