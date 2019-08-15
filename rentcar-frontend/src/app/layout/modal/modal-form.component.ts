export interface ModalFormComponent {
  closeModal: Function;
  afterSave: Function;
  data: any;
  dataService: any;
  saveFunction(): void;
}
