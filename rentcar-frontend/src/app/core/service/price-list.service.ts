import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceService} from './resource.service';
import {PriceList} from '../model/price-list.model';
import {ComboBoxService} from '../abstract/combo-box-service';
import {Observable} from 'rxjs';
import {InputComboItem} from '../../layout/input-field/input-field.component';
import {Search} from '../model/search.model';
import {Car} from '../model/car.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceListService extends ResourceService<PriceList> implements ComboBoxService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'priceList');
  }

  getAllComboItem(data?: any): Observable<InputComboItem[]> {
    return undefined;
  }

  getByIdComboItem(uuid: string): Observable<InputComboItem> {
    return this.getById(uuid).pipe(map(pl => new InputComboItem(this.priceListCaption(pl), pl.id)));
  }

  searchComboItem(search: Search): Observable<InputComboItem[]> {
    return this.find(search).pipe(map(pls => pls.map(pl =>
      new InputComboItem(this.priceListCaption(pl), pl.id))));
  }

  private priceListCaption(pl: PriceList): string {
    let caption = '';

    if (pl.name) {
      caption += pl.name;
    } else {
      caption += 'No name';
    }

    return caption;
  }


}
