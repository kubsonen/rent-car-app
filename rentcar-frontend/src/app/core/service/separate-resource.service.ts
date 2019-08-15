import {Common} from '../model/common.model';
import {SeparateCrudService} from '../abstract/separate-crud-service';
import {Commons} from '../model/commons.model';
import {Observable} from 'rxjs';
import {TableResponse} from '../model/table-response.model';
import {Search} from '../model/search.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
import {TableConfig} from '../model/table-config.model';
import {TableColumn} from '../model/table-column.model';
import {map} from 'rxjs/operators';

export class HttpOptions {
  headers: HttpHeaders;
  body: any;

  constructor() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}

export abstract class SeparateResourceService<ADD extends Common, P>
  implements SeparateCrudService<ADD, P> {

  protected readonly resourceApiPrefix: string = 'http://localhost:8080/api/';

  protected constructor(protected httpClient: HttpClient, protected endpoint: string) {
  }

  abstract addInstance(): ADD;

  create(model: ADD, path?: string): Observable<P> {
    return this.httpClient.post<P>(this.resourceApiPrefix + this.endpoint +
      (typeof (path) !== 'undefined' ? '/' + path : ''), JSON.stringify(model), new HttpOptions());
  }

  delete(uuid: string): Observable<any> {
    return this.httpClient.delete(this.resourceApiPrefix + this.endpoint + '/' + uuid, new HttpOptions());
  }

  deleteMultiple(ids: Commons): Observable<any> {
    const headers: HttpOptions = new HttpOptions();
    headers.body = JSON.stringify(ids);
    return this.httpClient.delete(this.resourceApiPrefix + this.endpoint, headers);
  }

  update(model: P): Observable<P> {
    return this.httpClient.put<P>(this.resourceApiPrefix + this.endpoint, JSON.stringify(model), new HttpOptions());
  }

  find(search: Search): Observable<P[]> {
    return this.httpClient.get<P[]>(this.resourceApiPrefix + this.endpoint + '/search' + '?' + $.param(search), new HttpOptions());
  }

  getById(uuid: string): Observable<P> {
    return this.httpClient.get<P>(this.resourceApiPrefix + this.endpoint + '/' + uuid, new HttpOptions());
  }

  getPageData(params?: any): Observable<TableResponse<P>> {
    return this.httpClient.get<TableResponse<P>>(this.resourceApiPrefix + this.endpoint +
      (typeof (params) !== 'undefined' ? '?' + $.param(params) : ''), new HttpOptions());
  }

  getTableConfig(tableId: string) {
    return this.httpClient.get<TableConfig[]>(this.resourceApiPrefix + this.endpoint + '/tableColumnConfig/' + tableId, new HttpOptions())
      .pipe(map(tcs => tcs.map(tc => {
        tc.caption = TableColumn.defaultCaption(tc.field);
        return tc;
      })));

  }

  saveTableConfig(tableId: string, items: TableConfig[]): Observable<any> {
    return this.httpClient.post<any>(this.resourceApiPrefix + this.endpoint +
      '/tableColumnConfig/' + tableId, JSON.stringify(items), new HttpOptions());
  }

  getTableFields(tableId: string): Observable<TableColumn[]> {
    return this.httpClient.get<string[]>(this.resourceApiPrefix + this.endpoint + '/tableFields/' + tableId, new HttpOptions())
      .pipe(map(ss => ss.map(s => new TableColumn(TableColumn.defaultCaption(s), s))));
  }


}
