import {FormMode} from '../../layout/form/form-mode.enum';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {TopbarActions} from '../../layout/topbar/topbar.component';
import {ResourceService} from '../service/resource.service';
import {Common} from '../model/common.model';

export abstract class FormLayout<M extends Common> {

  public uid: string;
  public error: any;
  public mode: FormMode;
  public formMode: any = FormMode;
  public isLoaded = false;
  public model: M;

  protected constructor(protected topbarService: TopbarService,
                        protected resourceService: ResourceService<M>,
                        protected onSuccess: Function) {
    this.initTopbarActions();
  }

  protected initForm(model: M) {
    this.model = model;
  }

  protected initTopbarActions() {
    this.topbarService.setAcions(TopbarActions.formActions(() => {
      if (this.mode === FormMode.ADD) {
        this.resourceService.post(this.model, '').subscribe(model => {
          this.model = model;
          this.mode = FormMode.EDIT;
          this.onSuccess();
        }, error => {
          if (error.status === 406) {
            this.error = error.error;
          } else {
            throw error;
          }
        });
      } else if (this.mode === FormMode.EDIT) {
        this.resourceService.put(this.model).subscribe(model => {
          this.model = model;
          this.onSuccess();
        }, error => {
          if (error.status === 406) {
            this.error = error.error;
          } else {
            throw error;
          }
        });
      }
    }));
  }

  protected showForm(mode: FormMode) {
    this.mode = mode;
    this.initForm(this.model);
    this.isLoaded = true;
  }

}
