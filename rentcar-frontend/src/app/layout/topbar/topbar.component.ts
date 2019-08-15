import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TopbarService} from './topbar.service';
import {PaginationInfo} from '../../core/model/pagination-info.model';

export class TopbarActions {
  refresh: Function;
  save: Function;
  add: Function;
  edit: Function;
  delete: Function;
  previous: Function;
  next: Function;
  filter: Function;
  tablePreferences: () => void;

  static formActions(save: Function): TopbarActions {
    const ta: TopbarActions = new TopbarActions();
    ta.save = save;
    return ta;
  }

  static tabActions(refresh: Function, add: Function, del: Function): TopbarActions {
    const  ta: TopbarActions = new TopbarActions();
    ta.add = add;
    ta.delete = del;
    ta.refresh = refresh;
    return ta;
  }

  static onlyRefresh(refresh: Function): TopbarActions {
    const  ta: TopbarActions = new TopbarActions();
    ta.refresh = refresh;
    return ta;
  }

  static bundleActions(refresh: Function, add: Function, del: Function): TopbarActions {
    const ta: TopbarActions = new TopbarActions();
    ta.refresh = refresh;
    ta.add = add;
    ta.delete = del;
    return ta;
  }

  public setTablePreferences(action: () => void): void {
    this.tablePreferences = action;
  }

}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, AfterViewInit, OnDestroy {

  tittle = 'Rent Car App';
  tittleShort = 'RCA';

  paginationInfo: PaginationInfo;
  topbarActions: TopbarActions;
  subscription: Subscription;
  subscriptionPi: Subscription;

  constructor(topbarService: TopbarService) {
    this.subscription = topbarService.getActions().subscribe(topbarActions => {
      this.topbarActions = topbarActions;
    });
    this.subscriptionPi = topbarService.getPaginationInfo().subscribe(pi => {
      this.paginationInfo = pi;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionPi.unsubscribe();
  }
}
