import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ModalService} from '../modal/modal.service';
import {Modal} from '../modal/modal.model';

export class ModalStructure {
  modal: Modal;
  zIndex: number;
}

@Component({
  selector: 'app-modal-multiple',
  templateUrl: './modal-multiple.component.html',
  styleUrls: ['./modal-multiple.component.css']
})
export class ModalMultipleComponent implements OnInit, OnDestroy {

  private zIndexEntry = 1050;
  modalSubscription: Subscription;
  modals: ModalStructure[] = [];

  constructor(private modalService: ModalService,
              private ngZone: NgZone) {
    this.modalSubscription = this.modalService.getModal().subscribe(m => {
      const modalStructure: ModalStructure = new ModalStructure();
      modalStructure.modal = m;
      modalStructure.zIndex = this.zIndexEntry + (this.modals.length * 2);
      this.ngZone.run(() => this.modals.push(modalStructure));
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  dropModal(modal: ModalStructure) {
    this.ngZone.run(() => this.modals = this.modals.filter(m => m !== modal));
  }

}
