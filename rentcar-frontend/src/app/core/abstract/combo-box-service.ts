import {Observable} from 'rxjs';
import {Search} from '../model/search.model';
import {InputComboItem} from '../../layout/input-field/input-field.component';

export interface ComboBoxService {
  getByIdComboItem(uuid: string): Observable<InputComboItem>;
  searchComboItem(search: Search): Observable<InputComboItem[]>;
  getAllComboItem(data?: any): Observable<InputComboItem[]>;
}
