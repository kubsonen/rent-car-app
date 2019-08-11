import {Common} from './common.model';

export class PriceList extends Common {

  private _name: string;
  private _description: string;
  private _currency: string;
  private _pricePerHour: number;
  private _pricePerDay: number;
  private _pricePerWeek: number;
  private _pricePerMonth: number;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get currency(): string {
    return this._currency;
  }

  set currency(value: string) {
    this._currency = value;
  }

  get pricePerHour(): number {
    return this._pricePerHour;
  }

  set pricePerHour(value: number) {
    this._pricePerHour = value;
  }

  get pricePerDay(): number {
    return this._pricePerDay;
  }

  set pricePerDay(value: number) {
    this._pricePerDay = value;
  }

  get pricePerWeek(): number {
    return this._pricePerWeek;
  }

  set pricePerWeek(value: number) {
    this._pricePerWeek = value;
  }

  get pricePerMonth(): number {
    return this._pricePerMonth;
  }

  set pricePerMonth(value: number) {
    this._pricePerMonth = value;
  }
}
