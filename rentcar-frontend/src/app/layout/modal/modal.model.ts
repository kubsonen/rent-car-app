import {Type} from '@angular/core';

export enum ModalMode {
  ERROR, NOTIFICATION, DIALOG, FORM
}

export class Modal {

  private _mode: ModalMode;
  private _info: string;
  private _tittle: string;
  private _saveFunction: Function;
  private _formComponent: Type<any>;
  private _data: any;
  private _executeOnSave: Function;
  private _large: boolean;

  static modalError(error: string): Modal {
    const modal: Modal = new Modal();
    modal._mode = ModalMode.ERROR;
    modal._info = error;
    return modal;
  }

  static modalInfo(info: string): Modal {
    const modal: Modal = new Modal();
    modal._mode = ModalMode.NOTIFICATION;
    modal._info = info;
    return modal;
  }

  static modalDialog(info: string, agreeFunction: Function): Modal {
    const modal: Modal = new Modal();
    modal._mode = ModalMode.DIALOG;
    modal._info = info;
    modal._saveFunction = agreeFunction;
    return modal;
  }

  static modalFormLarge(info: string, tittle: string, formComponent: Type<any>, data?: any, executeOnSave?: Function): Modal {
    const modal: Modal = this.modalForm(info, tittle, formComponent, data, executeOnSave);
    modal.large = true;
    return modal;
  }

  static modalForm(info: string, tittle: string, formComponent: Type<any>, data?: any, executeOnSave?: Function): Modal {
    const modal: Modal = new Modal();
    modal._mode = ModalMode.FORM;
    modal._info = info;
    modal._tittle = tittle;
    modal._formComponent = formComponent;
    modal._data = data;
    modal._executeOnSave = executeOnSave;
    return modal;
  }

  get mode(): ModalMode {
    return this._mode;
  }

  get info(): string {
    return this._info;
  }

  get tittle(): string {
    return this._tittle;
  }

  get agreeFunction(): Function {
    return this._saveFunction;
  }

  get formComponent(): Type<any> {
    return this._formComponent;
  }

  get data(): any {
    return this._data;
  }

  get executeOnSave(): Function {
    return this._executeOnSave;
  }

  get large(): boolean {
    return this._large;
  }


  set mode(value: ModalMode) {
    this._mode = value;
  }

  set info(value: string) {
    this._info = value;
  }

  set tittle(value: string) {
    this._tittle = value;
  }

  set saveFunction(value: Function) {
    this._saveFunction = value;
  }

  set formComponent(value: Type<any>) {
    this._formComponent = value;
  }

  set data(value: any) {
    this._data = value;
  }

  set executeOnSave(value: Function) {
    this._executeOnSave = value;
  }

  set large(value: boolean) {
    this._large = value;
  }
}
