import {Injectable} from '@angular/core';
import {HttpOptions, ResourceService} from './resource.service';
import {Authority} from '../model/authority.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuhorityPrivilege} from '../model/auhority-privilege.model';

@Injectable()
export class AuthorityService extends ResourceService<Authority> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'authority');
  }

  getAll(): Observable<Authority[]> {
    return this.httpClient.get<Authority[]>(this.resourceApiPrefix + this.endpoint + '/getAll', new HttpOptions());
  }

  performPrivilege(body: AuhorityPrivilege): Observable<any> {
    return this.httpClient.post(this.resourceApiPrefix + this.endpoint + '/performPrivilege', JSON.stringify(body), new HttpOptions());
  }

}
