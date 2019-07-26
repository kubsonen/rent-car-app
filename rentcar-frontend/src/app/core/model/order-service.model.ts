import {Common} from './common.model';

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
