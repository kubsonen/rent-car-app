import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {HttpClient} from '@angular/common/http';
import {Refuelling} from '../model/refuelling.model';

@Injectable({
  providedIn: 'root'
})
export class RefuellingService extends ResourceService<Refuelling> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'refuelling');
  }
}
