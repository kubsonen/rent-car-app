import {Common} from './common.model';

export class Refuelling extends Common {
  private _refuelCarId: string;
  private _refuellingDate: Date;
  private _mileage: number;
  private _currency: string;
  private _price: number;

  get refuelCarId(): string {
    return this._refuelCarId;
  }

  set refuelCarId(value: string) {
    this._refuelCarId = value;
  }

  get refuellingDate(): Date {
    return this._refuellingDate;
  }

  set refuellingDate(value: Date) {
    this._refuellingDate = value;
  }

  get mileage(): number {
    return this._mileage;
  }

  set mileage(value: number) {
    this._mileage = value;
  }

  get currency(): string {
    return this._currency;
  }

  set currency(value: string) {
    this._currency = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}
