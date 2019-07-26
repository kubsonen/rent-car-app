import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userUrl: string = 'user';

  constructor(private api: ApiService) {
  }

  createUser(client: User): Observable<User> {
    return this.api.post(this.userUrl, client);
  }

  updateUser(client: User): Observable<User> {
    return this.api.put(this.userUrl, client);
  }

}
