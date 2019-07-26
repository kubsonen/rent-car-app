import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Client} from '../model/client.model';
import {Search} from '../model/search.model';
import {ComboBoxService} from '../abstract/combo-box-service';
import {ResourceService} from './resource.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ClientsService extends ResourceService<Client> implements ComboBoxService<Client> {

  private readonly clientsUrl: string = 'client';

  constructor(private api: ApiService,
              protected httpClient: HttpClient) {
    super(httpClient, 'client');
  }

  search(search: Search): Observable<Client[]> {
    return this.searchClients(search);
  }

  searchClients(search: Search): Observable<Client[]> {
    return this.api.get(this.clientsUrl + '/search', search);
  }
}
