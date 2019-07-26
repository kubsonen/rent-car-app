import {Observable} from 'rxjs';

export interface ConstantValuesService {
  getByGroupName(groupName: string): Observable<string[]>;
}
