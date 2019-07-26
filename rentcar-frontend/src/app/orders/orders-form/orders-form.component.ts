import {Component, OnInit} from '@angular/core';
import {FormMode} from '../../layout/form/form-mode.enum';
import {Order} from '../../core/model/order.model';
import {ClientsService} from '../../core/service/clients.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {FormLayout} from '../../core/abstract/form-layout';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {Modal} from '../../layout/modal/modal.model';
import {ModalService} from '../../layout/modal/modal.service';
import {OrdersServiceFormComponent} from '../orders-service-form/orders-service-form.component';
import {TableResponse} from '../../core/model/table-response.model';
import {OrderServiceService} from '../../core/service/order-service.service';
import {OrderServiceModel} from '../../core/model/order-service.model';
import {OrderService} from '../../core/service/order.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent extends FormLayout<Order> implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private orderServiceService: OrderServiceService,
              public topbarService: TopbarService,
              private clientService: ClientsService,
              private modalService: ModalService) {

    super(topbarService, orderService, () => {
      this.router.navigate(['orders']);
    });

    this.route.params.subscribe(p => {
      this.uid = p.uid;
      if (this.uid !== undefined) {
        this.orderService.getById(this.uid).subscribe(value => {
          this.model = value;
          this.showForm(FormMode.EDIT);
        });
      } else {
        this.model = new Order();
        this.showForm(FormMode.ADD);
      }
    });

  }

  iconMore = faEllipsisV;
  private captionsOrderService: String[] = ['Start rent', 'End rent', 'Start mileage', 'End mileage', 'Fuel'];
  private columnsOrderService: String[] = ['startRent', 'endRent', 'startMileage', 'endMileage', 'fuel'];
  private tableResponseOrderService: TableResponse<OrderServiceModel> = new TableResponse();

  ngOnInit() {
  }

  addOrderService() {
    this.modalService.setModal(Modal.modalFormLarge('Add order service', 'Add order service', OrdersServiceFormComponent, this.model.id));
  }

  refreshOrderServices() {
    this.orderServiceService.getForOrder(this.model.id).subscribe(items => this.tableResponseOrderService.data = items);
  }

}
