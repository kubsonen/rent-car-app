import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild} from '@angular/core';
import {ModalService} from './modal.service';
import {Subscription} from 'rxjs';
import {Modal, ModalMode} from './modal.model';
import {ModalDirective} from './modal.directive';
import {ModalFormComponent} from './modal-form.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @ViewChild(ModalDirective, {static: false}) modalDirective: ModalDirective;
  modalSubscription: Subscription;
  mode: any = ModalMode;
  active: boolean;
  kind: string;
  modal: Modal;
  tittle: String;
  saveForm: Function;
  larger;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private modalService: ModalService,
              private changeDetector: ChangeDetectorRef,
              private ngZone: NgZone) {


    this.modalSubscription = this.modalService.getModal().subscribe(m => {
      this.ngZone.run(() => {
        this.setModal(m);
      });
    });
  }

  closeModal() {
    this.active = false;
    this.kind = 'close';
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  setModal(modal: Modal) {
    this.modal = modal;
    this.active = true;
    this.larger = modal.large;
    this.changeDetector.detectChanges();
    this.clearComponent();
    switch (this.modal.mode) {
      case ModalMode.ERROR:
        this.tittle = 'ERROR';
        break;
      case ModalMode.NOTIFICATION:
        this.tittle = 'INFO';
        break;
      case ModalMode.DIALOG:
        this.tittle = 'QUESTION';
        break;
      case ModalMode.FORM:
        this.tittle = modal.tittle;
        this.loadComponent();
        break;
    }
  }

  clearComponent() {
    this.modalDirective.viewContainerRef.clear();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.modal.formComponent);
    const componentRef = this.modalDirective.viewContainerRef.createComponent(componentFactory);
    (<ModalFormComponent>componentRef.instance).closeModal = () => this.closeModal();
    (<ModalFormComponent>componentRef.instance).afterSave = this.modal.executeOnSave;
    (<ModalFormComponent>componentRef.instance).data = this.modal.data;
    this.saveForm = () => {
      (<ModalFormComponent>componentRef.instance).saveFunction();
    };

  }

}
