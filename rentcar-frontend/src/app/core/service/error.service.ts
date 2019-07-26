import {ErrorHandler, Injectable} from '@angular/core';
import {ModalService} from '../../layout/modal/modal.service';
import {Modal} from '../../layout/modal/modal.model';

@Injectable()
export class ErrorService implements ErrorHandler {

  constructor(private modalService: ModalService) { }

  handleError(error: any): void {
    console.log('Wystapił błąd.');
    console.log(error);
    this.modalService.setModal(Modal.modalError('Undefined error.'));
  }

}
