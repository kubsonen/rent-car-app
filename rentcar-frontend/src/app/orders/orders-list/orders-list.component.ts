import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../core/model/order.model';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {Router} from '@angular/router';
import {ListComponent} from '../../layout/list/list.component';
import {OrderService} from '../../core/service/order.service';
import {Commons} from '../../core/model/commons.model';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, AfterViewInit {

  @ViewChild(ListComponent, {static: true}) listComponent: ListComponent;

  public addFunction: Function = () => this.addOrder();
  public editFunction: Function = (o: Order) => this.editOrder(o);
  public deleteFunction: Function = (c: Commons) => this.deleteOrder(c);

  constructor(public orderService: OrderService,
              private topbarService: TopbarService,
              private router: Router) {
  }

  ngOnInit() {

  }

  private addOrder() {
    this.router.navigate(['orders/add']);
  }

  private editOrder(o: Order) {
    this.router.navigate(['orders/edit/' + o.id]);
  }

  private deleteOrder(c: Commons) {
    this.orderService.deleteMultiple(c).subscribe(value => {
      this.listComponent.refreshTable();
    });
  }

  ngAfterViewInit(): void {
    this.listComponent.refreshTable();
  }


}
