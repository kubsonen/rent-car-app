import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {Car} from '../model/car.model';
import {HttpClient} from '@angular/common/http';
import {ComboBoxService} from '../abstract/combo-box-service';
import {Observable} from 'rxjs';
import {InputComboItem} from '../../layout/input-field/input-field.component';
import {Search} from '../model/search.model';
import {map} from 'rxjs/operators';
import {canReportError} from 'rxjs/internal/util/canReportError';
import {Client} from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class CarService extends ResourceService<Car> implements ComboBoxService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'car');
  }

  getAllComboItem(data?: any): Observable<InputComboItem[]> {
    return undefined;
  }

  getByIdComboItem(uuid: string): Observable<InputComboItem> {
    return this.getById(uuid).pipe(map(car => new InputComboItem(this.carCaption(car), car.id)));
  }

  searchComboItem(search: Search): Observable<InputComboItem[]> {
    return this.find(search).pipe(map(cars => cars.map(car =>
      new InputComboItem(this.carCaption(car), car.id))));
  }

  private carCaption(car: Car): string {
    let caption = '';

    if (car.brand) {
      caption += car.brand;
    }

    if (car.model) {
      if (caption.localeCompare('') !== 0) {
        caption += ' ';
      }
      caption += car.model;
    }

    if (car.plateNumber) {
      if (caption.localeCompare('') !== 0) {
        caption += ' - ';
      }
      caption += car.plateNumber;
    }

    return caption;
  }

}
