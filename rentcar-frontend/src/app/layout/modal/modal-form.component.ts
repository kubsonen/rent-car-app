export interface ModalFormComponent {
  closeModal: Function;
  afterSave: Function;
  data: any;
  saveFunction(): void;
}
