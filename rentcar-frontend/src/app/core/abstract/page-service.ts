import {Observable} from 'rxjs';
import {TableRequest} from '../model/table-request.model';
import {TableResponse} from '../model/table-response.model';
import {TableConfig} from '../model/table-config.model';
import {TableColumn} from '../model/table-column.model';

export interface PageService<T> {
  getPageData(tableRequest: TableRequest): Observable<TableResponse<T>>;

  getTableConfig(tableId: string): Observable<TableConfig[]>;

  saveTableConfig(tableId: string, items: TableConfig[]): Observable<any>;

  getTableFields(tableId: string): Observable<TableColumn[]>;
}
