import { Component, OnInit } from '@angular/core';
import {OrderServiceModel} from '../../core/model/order-service.model';
import {ModalFormComponent} from '../../layout/modal/modal-form.component';
import {TranslateService} from '@ngx-translate/core';
import {BundlePropertyService} from '../../core/service/bundle-property.service';
import {OrderServiceService} from '../../core/service/order-service.service';

@Component({
  selector: 'app-orders-service-form',
  templateUrl: './orders-service-form.component.html',
  styleUrls: ['./orders-service-form.component.css']
})
export class OrdersServiceFormComponent implements OnInit, ModalFormComponent {

  constructor(private translateService: TranslateService,
              private bundlePropertyService: BundlePropertyService,
              private orderServiceService: OrderServiceService) {
  }

  loaded = false;
  orderService: OrderServiceModel;
  data: any;
  afterSave: Function;
  closeModal: Function;
  error: any;


  ngOnInit() {
    this.orderService = new OrderServiceModel();
    this.orderService.rentOrderId = this.data;
    this.loaded = true;
  }

  saveFunction(): void {
    this.orderServiceService.post(this.orderService).subscribe(value => {
      this.closeModal();
    }, error => {
      if (error.status === 406) {
        this.error = error.error;
      } else {
        throw error;
      }
    });
  }

}
