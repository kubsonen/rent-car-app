import {Observable} from 'rxjs';
import {TableRequest} from '../model/table-request.model';
import {TableResponse} from '../model/table-response.model';

export interface PageService<T> {
  getPageData(tableRequest: TableRequest): Observable<TableResponse<T>>;
}
