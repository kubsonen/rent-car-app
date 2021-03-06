import {FormMode} from '../../layout/form/form-mode.enum';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {TopbarActions} from '../../layout/topbar/topbar.component';
import {Common} from '../model/common.model';
import {SeparateCrudService} from './separate-crud-service';

export abstract class SeparateFormLayout<ADD extends Common, P extends Common> {

  public uid: string;
  public error: any;
  public mode: FormMode;
  public formMode: any = FormMode;
  public isLoaded = false;
  public modelAdd: ADD;
  public model: P;

  public onAddSuccess: () => void;
  public onEditSuccess: () => void;

  protected constructor(protected separateCrudService: SeparateCrudService<ADD, P>) {
  }

  protected initTopbarActions(topbarService: TopbarService) {
    topbarService.setAcions(TopbarActions.formActions(() => {
      this.saveForm();
    }));
  }

  protected initForm(uuid: string) {
    if (uuid) {
      this.separateCrudService.getById(this.uid).subscribe(value => {
        this.showFormEditForm(value);
      });
    } else {
      this.showFormAddForm(this.separateCrudService.addInstance());
    }
  }

  private showFormAddForm(model: ADD) {
    this.modelAdd = model;
    this.mode = FormMode.ADD;
    this.isLoaded = true;
  }

  private showFormEditForm(model: P) {
    this.model = model;
    this.mode = FormMode.EDIT;
    this.isLoaded = true;
  }

  protected onAddSuccessAction(action: () => void) {
    this.onAddSuccess = action;
  }

  protected onEditSuccessAction(action: () => void) {
    this.onEditSuccess = action;
  }

  protected saveForm(): void {
    if (this.mode === FormMode.ADD) {
      console.log(this.modelAdd);
      this.separateCrudService.create(this.modelAdd, '').subscribe(model => {
        this.model = model;
        this.mode = FormMode.EDIT;

        if (this.onAddSuccess) {
          this.onAddSuccess();
        }
      }, error => {
        if (error.status === 406) {
          this.error = error.error;
        } else {
          throw error;
        }
      });
    } else if (this.mode === FormMode.EDIT) {
      this.separateCrudService.update(this.model).subscribe(model => {
        this.model = model;
        if (this.onEditSuccess) {
          this.onEditSuccess();
        }
      }, error => {
        if (error.status === 406) {
          this.error = error.error;
        } else {
          throw error;
        }
      });
    }
  }

}
