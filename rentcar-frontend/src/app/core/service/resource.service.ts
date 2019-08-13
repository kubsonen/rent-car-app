import {Common} from '../model/common.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as $ from 'jquery';
import {TableResponse} from '../model/table-response.model';
import {Commons} from '../model/commons.model';
import {CrudService} from '../abstract/crud-service';
import {Search} from '../model/search.model';

export class HttpOptions {
  headers: HttpHeaders;
  body: any;

  constructor() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

}

export class ResourceService<R extends Common> implements CrudService<R> {

  protected readonly resourceApiPrefix: string = 'http://localhost:8080/api/';

  constructor(protected httpClient: HttpClient, protected endpoint: string) {
  }

  find(search: Search): Observable<R[]> {
    return this.httpClient.get<R[]>(this.resourceApiPrefix + this.endpoint + '/search' + '?' + $.param(search), new HttpOptions());
  }

  post(body: R, path?: string): Observable<R> {
    return this.httpClient.post<R>(this.resourceApiPrefix + this.endpoint +
      (typeof (path) !== 'undefined' ? '/' + path : ''), JSON.stringify(body), new HttpOptions());
  }

  put(body: R): Observable<R> {
    return this.httpClient.put<R>(this.resourceApiPrefix + this.endpoint, JSON.stringify(body), new HttpOptions());
  }

  getPageData(params?: any): Observable<TableResponse<R>> {
    return this.httpClient.get<TableResponse<R>>(this.resourceApiPrefix + this.endpoint +
      (typeof (params) !== 'undefined' ? '?' + $.param(params) : ''), new HttpOptions());
  }

  getById(uuid: String): Observable<R> {
    return this.httpClient.get<R>(this.resourceApiPrefix + this.endpoint + '/' + uuid, new HttpOptions());
  }

  delete(uuid: String) {
    return this.httpClient.delete(this.resourceApiPrefix + this.endpoint + '/' + uuid, new HttpOptions());
  }

  deleteMultiple(ids: Commons) {
    const headers: HttpOptions = new HttpOptions();
    headers.body = JSON.stringify(ids);
    return this.httpClient.delete(this.resourceApiPrefix + this.endpoint, headers);
  }

}
