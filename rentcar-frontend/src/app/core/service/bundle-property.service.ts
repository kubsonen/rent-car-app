import {Injectable} from '@angular/core';
import {HttpOptions, ResourceService} from './resource.service';
import {BundleProperty} from '../model/bundle-property.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BundlePropertyAdd} from '../model/bundle-property-add.model';
import {ConstantValuesService} from '../abstract/constant-values-service';

@Injectable()
export class BundlePropertyService extends ResourceService<BundleProperty> implements ConstantValuesService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'bundleProperty');
  }

  addBundleProperty(bundlePropertyAdd: BundlePropertyAdd): Observable<BundleProperty> {
    return this.httpClient.post<BundleProperty>
    (this.resourceApiPrefix + this.endpoint, JSON.stringify(bundlePropertyAdd), new HttpOptions());
  }

  getForBundleGroup(uuid: string): Observable<BundleProperty[]> {
    return this.httpClient.get<BundleProperty[]>(this.resourceApiPrefix + this.endpoint + '/propertiesForGroup/' + uuid, new HttpOptions());
  }

  getByGroupName(groupName: string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.resourceApiPrefix + this.endpoint + '/constants/' + groupName, new HttpOptions());
  }

}
