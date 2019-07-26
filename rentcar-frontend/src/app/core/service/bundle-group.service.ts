import {Injectable} from '@angular/core';
import {HttpOptions, ResourceService} from './resource.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BundleGroup} from '../model/bundle-group.model';

@Injectable()
export class BundleGroupService extends ResourceService<BundleGroup> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'bundleGroup');
  }

  getAll(): Observable<BundleGroup[]> {
    return this.httpClient.get<BundleGroup[]>(this.resourceApiPrefix + this.endpoint + '/getAll', new HttpOptions());
  }

}
