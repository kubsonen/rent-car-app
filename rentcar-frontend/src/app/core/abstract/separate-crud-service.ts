import {Observable} from 'rxjs';
import {Commons} from '../model/commons.model';
import {Search} from '../model/search.model';
import {PageService} from './page-service';

export interface SeparateCrudService<ADD, P> extends PageService<P> {
  find(search: Search): Observable<P[]>;

  getById(uuid: string): Observable<P>;

  addInstance(): ADD;

  create(model: ADD, path?: string): Observable<P>;

  update(model: P): Observable<P>;

  delete(uuid: string): Observable<any>;

  deleteMultiple(ids: Commons): Observable<any>;
}
