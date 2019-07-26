import {Component, Input, OnInit} from '@angular/core';
import {FormMode} from './form-mode.enum';
import {ResourceService} from '../../core/service/resource.service';
import {TopbarService} from '../topbar/topbar.service';
import {TopbarActions} from '../topbar/topbar.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() private modelName: string;
  @Input() private resourceService: ResourceService<any>;
  @Input() private editedModelId: string;
  @Input() private mode: FormMode;
  @Input() private error: any;
  @Input() private model: any;
  @Input() private onSuccess: Function;

  private formModes: any = FormMode;
  private formIsLoaded = false;

  constructor(private topbarService: TopbarService) {
    this.topbarService.setAcions(TopbarActions.formActions(() => {
      this.saveForm();
    }));
    this.initializeFormView();
  }

  ngOnInit() {
  }

  private initializeFormView() {
    console.log('Inicjalizacja form view.')
    switch (this.mode) {
      case FormMode.ADD:
        this.model = {};
        this.formIsLoaded = true;
        break;
      case FormMode.EDIT:
        this.resourceService.getById(this.editedModelId).subscribe(value => {
          this.model = value;
          this.formIsLoaded = true;
        });
        break;
      case FormMode.OVERVIEW:
        this.resourceService.getById(this.editedModelId).subscribe(value => {
          this.model = value;
          this.formIsLoaded = true;
        });
        break;
    }
  }

  private saveForm() {
    switch (this.mode) {
      case FormMode.ADD:
        this.resourceService.post(this.model, '').subscribe(model => {
          this.model = model;
          this.mode = FormMode.EDIT;
          this.successAction();
        }, error => {
          if (error.status === 406) {
            this.error = error.error;
          } else {
            throw error;
          }
        });
        break;
      case FormMode.EDIT:
        this.resourceService.put(this.model).subscribe(model => {
          this.model = model;
          this.successAction();
        }, error => {
          if (error.status === 406) {
            this.error = error.error;
          } else {
            throw error;
          }
        })
        break;
      case FormMode.OVERVIEW:
        break;
    }
  }

  private successAction() {
    if (this.onSuccess !== undefined) {
      this.onSuccess();
    }
  }

}
