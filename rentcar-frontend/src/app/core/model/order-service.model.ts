import {Common} from './common.model';
import {FormMode} from '../../layout/form/form-mode.enum';

export class OrderOrderServiceLink {
  private _mode: FormMode;
  private _orderId: string;
  private _orderServiceId: string;

  public static addService(orderId: string): OrderOrderServiceLink {
    const o: OrderOrderServiceLink = new OrderOrderServiceLink();
    o._mode = FormMode.ADD;
    o._orderId = orderId;
    return o;
  }

  public static editService(orderId: string, orderServiceId: string): OrderOrderServiceLink {
    const o: OrderOrderServiceLink = new OrderOrderServiceLink();
    o._mode = FormMode.EDIT;
    o._orderServiceId = orderServiceId;
    o._orderId = orderId;
    return o;
  }

  get mode(): FormMode {
    return this._mode;
  }

  get orderId(): string {
    return this._orderId;
  }

  get orderServiceId(): string {
    return this._orderServiceId;
  }
}

export class OrderServiceModel extends Common {
  rentOrderId: string;
  carId: string;
  startRent: Date;
  endRent: Date;
  startMileage: number;
  endMileage: number;
  fuel: number;
  price: number;
  currency: string;
}
