import {Common} from './common.model';

export class Client extends Common {

  public uniqueName: string;
  public fullName: string;
  public email: string;
  public nip: string;
  public phoneNumber: string;
  public address: string;
  public country: string;
  public postalCode: string;
  public language: string;

  getItemCaption(): string {
    return this.fullName;
  }
}

