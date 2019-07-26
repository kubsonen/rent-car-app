import {Observable} from 'rxjs';
import {TableRequest} from '../model/table-request.model';
import {TableResponse} from '../model/table-response.model';
import {Commons} from '../model/commons.model';

export interface CrudService<T> {
  getById(uuid: string): Observable<T>;
  getPageData(tableRequest: TableRequest): Observable<TableResponse<T>>;
  post(model: T): Observable<T>;
  put(model: T): Observable<T>;
  delete(uuid: string): void;
  deleteMultiple(ids: Commons): void;
}
