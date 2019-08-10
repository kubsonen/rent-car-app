import {Injectable} from '@angular/core';
import {HttpOptions, ResourceService} from './resource.service';
import {BundleProperty} from '../model/bundle-property.model';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {BundlePropertyAdd} from '../model/bundle-property-add.model';
import {ConstantValuesService} from '../abstract/constant-values-service';
import {ComboBoxService} from '../abstract/combo-box-service';
import {InputComboItem} from '../../layout/input-field/input-field.component';
import {Search} from '../model/search.model';
import {TranslateService} from '@ngx-translate/core';
import {concatMap, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class BundlePropertyService extends ResourceService<BundleProperty> implements ConstantValuesService, ComboBoxService {

  constructor(httpClient: HttpClient,
              private translateService: TranslateService) {
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

  getByIdComboItem(uuid: string): Observable<InputComboItem> {
    return undefined;
  }

  searchComboItem(search: Search): Observable<InputComboItem[]> {
    return undefined;
  }

  getAllComboItem(data?: any): Observable<InputComboItem[]> {
    return this.getByGroupName(data).pipe(
      map(values => values.map(value => new InputComboItem('', value))),
      concatMap(values => {
        const apiArray: Observable<string>[] = values.map((eachValue) => {
          return this.translateService.get(eachValue.value);
        });
        return forkJoin(...apiArray).pipe(
          map(apiData => {
            values.forEach((eachOriginalValue, index) => eachOriginalValue.label = apiData[index]);
            return values;
          })
        );
      })
    );
  }

}
