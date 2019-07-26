import { Injectable } from '@angular/core';
import {HttpOptions, ResourceService} from './resource.service';
import {Privilege} from '../model/privilege.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Common} from '../model/common.model';

@Injectable()
export class PrivilegeService extends ResourceService<Privilege> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'privilege');
  }

  getAll(): Observable<Privilege[]> {
    return this.httpClient.get<Privilege[]>(this.resourceApiPrefix + this.endpoint + '/getAll', new HttpOptions());
  }

  getForAuthority(uuid: string): Observable<Common[]> {
    return this.httpClient.get<Common[]>(this.resourceApiPrefix + this.endpoint + '/privilegeForAuthority/' + uuid, new HttpOptions());
  }

}
