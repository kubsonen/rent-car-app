import {ErrorHandler, Injectable} from '@angular/core';
import {ModalService} from '../../layout/modal/modal.service';
import {Modal} from '../../layout/modal/modal.model';

@Injectable()
export class ErrorService implements ErrorHandler {

  constructor(private modalService: ModalService) { }

  handleError(error: any): void {
    if (error.name && error.name === 'HttpErrorResponse') {
      if (error.error && error.error.message) {
        this.modalService.setModal(Modal.modalError(error.error.message));
      } else {
        this.modalService.setModal(Modal.modalError('Undefined server error.'));
      }
    }
  }

}
