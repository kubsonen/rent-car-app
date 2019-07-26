import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TopbarActions} from './topbar.component';
import {PaginationInfo} from '../../core/model/pagination-info.model';


@Injectable({
  providedIn: 'root'
})
export class TopbarService {
  private actions = new Subject<TopbarActions>();
  private info = new Subject<PaginationInfo>();

  constructor() {
  }

  setAcions(actions: TopbarActions) {
    this.actions.next(actions);
  }

  getActions(): Observable<TopbarActions> {
    return this.actions.asObservable();
  }

  setPaginationInfo(info: PaginationInfo){
    this.info.next(info);
  }

  getPaginationInfo(): Observable<PaginationInfo> {
    return this.info.asObservable();
  }

}
