import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Client} from '../model/client.model';
import {Search} from '../model/search.model';
import {ComboBoxService} from '../abstract/combo-box-service';
import {HttpOptions, ResourceService} from './resource.service';
import {HttpClient} from '@angular/common/http';
import {InputComboItem} from '../../layout/input-field/input-field.component';
import {map} from 'rxjs/operators';

@Injectable()
export class ClientsService extends ResourceService<Client> implements ComboBoxService {

  private readonly clientsUrl: string = 'client';

  constructor(private api: ApiService,
              protected httpClient: HttpClient) {
    super(httpClient, 'client');
  }

  searchComboItem(search: Search): Observable<InputComboItem[]> {
    return this.searchClients(search);
  }

  searchClients(search: Search): Observable<InputComboItem[]> {
    return this.api.get(this.clientsUrl + '/search', search)
      .pipe(map((clients: Client[]) => clients.map(client => new InputComboItem(client.fullName, client.id))));
  }

  getByIdComboItem(uuid: string): Observable<InputComboItem> {
    return this.getById(uuid).pipe(map(client => new InputComboItem(client.fullName, client.id)));
  }

  getAllComboItem(): Observable<InputComboItem[]> {
    return undefined;
  }

}
