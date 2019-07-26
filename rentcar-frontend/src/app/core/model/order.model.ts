import {Common} from './common.model';

export class Order extends Common {
  private clientId: string;
  private clientUniqueName: string;
  private orderDate: Date;
}
