import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {ResourceService} from './resource.service';
import {PriceList} from '../model/price-list.model';
import {HttpClient} from '@angular/common/http';
import {SeparateResourceService} from './separate-resource.service';
import {UserAdd} from '../model/user-add.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SeparateResourceService<UserAdd, User> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'user');
  }

  addInstance(): UserAdd {
    return new UserAdd();
  }

}
