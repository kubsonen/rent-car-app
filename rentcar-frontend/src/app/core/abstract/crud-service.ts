import {Observable} from 'rxjs';
import {Commons} from '../model/commons.model';
import {PageService} from './page-service';

export interface CrudService<T> extends PageService<T> {
  getById(uuid: string): Observable<T>;

  post(model: T): Observable<T>;

  put(model: T): Observable<T>;

  delete(uuid: string): void;

  deleteMultiple(ids: Commons): void;
}
