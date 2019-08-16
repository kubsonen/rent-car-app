import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, EventEmitter, Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {ModalMode} from './modal.model';
import {ModalDirective} from './modal.directive';
import {ModalFormComponent} from './modal-form.component';
import {ModalStructure} from '../modal-multiple/modal-multiple.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild(ModalDirective, {static: false}) modalDirective: ModalDirective;
  @Input() modalStructure: ModalStructure;
  @Output() closeModalAction: EventEmitter<ModalStructure> = new EventEmitter();

  // Fields
  mode: any = ModalMode;
  active: boolean;
  kind: string;
  tittle: String;
  saveForm: Function;
  larger;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private changeDetector: ChangeDetectorRef) {
  }

  closeModal() {
    this.closeModalAction.emit(this.modalStructure);
  }

  ngOnInit() {
    this.setModal(this.modalStructure);
  }

  setModal(modalStructure: ModalStructure) {
    const modal = modalStructure.modal;
    this.active = true;
    this.larger = modal.large;
    this.changeDetector.detectChanges();
    switch (modal.mode) {
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

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.modalStructure.modal.formComponent);
    const componentRef = this.modalDirective.viewContainerRef.createComponent(componentFactory);
    (<ModalFormComponent>componentRef.instance).closeModal = () => this.closeModal();
    (<ModalFormComponent>componentRef.instance).afterSave = this.modalStructure.modal.executeOnSave;
    (<ModalFormComponent>componentRef.instance).data = this.modalStructure.modal.data;
    (<ModalFormComponent>componentRef.instance).dataService = this.modalStructure.modal.dataService;
    this.saveForm = () => {
      (<ModalFormComponent>componentRef.instance).saveFunction();
    };

  }

}
