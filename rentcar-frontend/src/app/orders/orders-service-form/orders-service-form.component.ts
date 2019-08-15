import {Component, OnInit} from '@angular/core';
import {OrderOrderServiceLink, OrderServiceModel} from '../../core/model/order-service.model';
import {ModalFormComponent} from '../../layout/modal/modal-form.component';
import {TranslateService} from '@ngx-translate/core';
import {BundlePropertyService} from '../../core/service/bundle-property.service';
import {OrderServiceService} from '../../core/service/order-service.service';
import {InputField} from '../../layout/input-field/input-field.component';
import {CarService} from '../../core/service/car.service';
import {FormMode} from '../../layout/form/form-mode.enum';
import {PriceListService} from '../../core/service/price-list.service';

@Component({
  selector: 'app-orders-service-form',
  templateUrl: './orders-service-form.component.html',
  styleUrls: ['./orders-service-form.component.css']
})
export class OrdersServiceFormComponent implements OnInit, ModalFormComponent {

  private startRentInput: InputField = InputField.inputDate('Start rent', 'startRent');
  private endRentInput: InputField = InputField.inputDate('End rent', 'endRent');
  private startMileageInput: InputField = InputField.inputText('Start mileage', 'startMileage');
  private endMileageInput: InputField = InputField.inputText('End mileage', 'endMileage');
  private priceInput: InputField = InputField.inputText('Price', 'price');
  private fuelInput: InputField = InputField.inputText('Fuel', 'fuel');
  private carInput: InputField;
  private currencyInput: InputField;
  private priceListInput: InputField;

  constructor(private translateService: TranslateService,
              private bundlePropertyService: BundlePropertyService,
              private orderServiceService: OrderServiceService,
              private carService: CarService,
              private priceListService: PriceListService) {

    this.carInput = InputField.inputCombo('Car', 'carId', carService);
    this.currencyInput = InputField.inputComboConst('Currency', 'currency', bundlePropertyService, 'Currency');
    this.priceListInput = InputField.inputCombo('Price list', 'priceListId', priceListService);

  }

  loaded = false;
  orderService: OrderServiceModel;
  data: OrderOrderServiceLink;
  dataService: any;
  afterSave: Function;
  closeModal: Function;
  error: any;


  ngOnInit() {
    if (this.data.mode === FormMode.ADD) {
      this.orderService = new OrderServiceModel();
      this.orderService.rentOrderId = this.data.orderId;
      this.loaded = true;
    } else if (this.data.mode === FormMode.EDIT) {
      this.orderServiceService.getById(this.data.orderServiceId).subscribe(orderServiceModel => {
        this.orderService = orderServiceModel;
        this.loaded = true;
      });
    }
  }

  saveFunction(): void {
    if (this.data.mode === FormMode.ADD) {
      this.orderServiceService.post(this.orderService).subscribe(value => {
        if (this.afterSave !== undefined) {
          this.afterSave();
        }
        this.closeModal();
      }, error => {
        if (error.status === 406) {
          this.error = error.error;
        } else {
          throw error;
        }
      });
    } else if (this.data.mode === FormMode.EDIT) {
      this.orderServiceService.put(this.orderService).subscribe(value => {
        if (this.afterSave !== undefined) {
          this.afterSave();
        }
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

}
