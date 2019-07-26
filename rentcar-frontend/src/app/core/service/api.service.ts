import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as $ from 'jquery';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ApiService {

  private readonly apiPrefix: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  post(path: String, body: Object): Observable<any> {
    return this.http.post(this.apiPrefix + path, JSON.stringify(body), httpOptions);
  }

  put(path: String, body: Object): Observable<any> {
    return this.http.put(this.apiPrefix + path, JSON.stringify(body), httpOptions);
  }

  get(path: String, params: any): Observable<any> {
    return this.http.get(this.apiPrefix + path + '?' + $.param(params), httpOptions);
  }

  getById(path: String, uuid: String): Observable<any> {
    return this.http.get(this.apiPrefix + path + '/' + uuid, httpOptions);
  }

  delete(path: String, uuid: String) {
    return this.http.delete(this.apiPrefix + path + '/' + uuid, httpOptions);
  }
}
