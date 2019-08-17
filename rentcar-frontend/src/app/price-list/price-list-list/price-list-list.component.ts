import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PriceListService} from '../../core/service/price-list.service';
import {Router} from '@angular/router';
import {ListComponent} from '../../layout/list/list.component';
import {Car} from '../../core/model/car.model';
import {Commons} from '../../core/model/commons.model';

@Component({
  selector: 'app-price-list-list',
  templateUrl: './price-list-list.component.html',
  styleUrls: ['./price-list-list.component.css']
})
export class PriceListListComponent implements OnInit, AfterViewInit {

  constructor(public priceListService: PriceListService,
              private router: Router) {
  }

  @ViewChild(ListComponent, {static: true}) listComponent: ListComponent;

  public addFunction: Function = () => this.router.navigate(['priceList/add']);
  public editFunction: Function = (c: Car) => this.router.navigate(['priceList/edit/' + c.id]);
  public deleteFunction: Function = (c: Commons) => this.deletePriceList(c);

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.listComponent.refreshTable();
  }

  deletePriceList(c: Commons) {
    this.priceListService.deleteMultiple(c).subscribe(value => this.listComponent.refreshTable());
  }

}
