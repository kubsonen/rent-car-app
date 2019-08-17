import {Component, OnInit} from '@angular/core';
import {BundleGroup} from '../../core/model/bundle-group.model';
import {FormMode} from '../../layout/form/form-mode.enum';
import {ModalFormComponent} from '../../layout/modal/modal-form.component';
import {BundleGroupService} from '../../core/service/bundle-group.service';

@Component({
  selector: 'app-bundle-group-form',
  templateUrl: './bundle-group-form.component.html',
  styleUrls: ['./bundle-group-form.component.css']
})
export class BundleGroupFormComponent implements OnInit, ModalFormComponent {

  constructor(private bundleGroupService: BundleGroupService) {
  }

  public bundleGroup: BundleGroup;
  public error: any;
  closeModal: Function;
  afterSave: Function;
  mode: FormMode;
  data: any;
  dataService: any;

  ngOnInit() {
    this.bundleGroup = new BundleGroup();
  }

  saveFunction(): void {
    this.bundleGroupService.post(this.bundleGroup).subscribe(bundleGroup => {
      this.bundleGroup = bundleGroup;
      if (this.afterSave !== undefined) {
        this.afterSave();
      }
      this.closeModal();
    }, error => {
      if (error.status === 406) {
        this.error = error.error;
      } else {
        throw error;
      }
    });
  }

}
