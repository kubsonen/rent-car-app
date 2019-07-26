import {Observable} from 'rxjs';
import {ComboBoxItem} from './combo-box-item';
import {Search} from '../model/search.model';

export interface ComboBoxService<R extends ComboBoxItem> {
  getById(uuid: string): Observable<R>;
  search(search: Search): Observable<R[]>;
}
