import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Modal} from './modal.model';

@Injectable({providedIn: 'root'})
export class ModalService {

  private modal = new Subject<Modal>();

  constructor() {
  }

  setModal(modal: Modal) {
    this.modal.next(modal);
  }

  getModal() {
    return this.modal.asObservable();
  }


}
