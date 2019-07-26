import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalFormComponent} from '../../layout/modal/modal-form.component';
import {BundlePropertyService} from '../../core/service/bundle-property.service';
import {BundlePropertyAdd} from '../../core/model/bundle-property-add.model';
import {ValidInputComponent} from '../../layout/valid-input/valid-input.component';

@Component({
  selector: 'app-bundle-value-form',
  templateUrl: './bundle-property-form.component.html',
  styleUrls: ['./bundle-property-form.component.css']
})
export class BundlePropertyFormComponent implements OnInit, ModalFormComponent {

  constructor(private bundlePropertyService: BundlePropertyService) { }

  @ViewChild('propertyInput', {static: true, read: ValidInputComponent}) validInput: ValidInputComponent;
  private bundlePropertyAdd: BundlePropertyAdd;
  private error: any;
  closeModal: Function;
  afterSave: Function;
  data: any;


  ngOnInit() {
    this.bundlePropertyAdd = new BundlePropertyAdd();
    this.bundlePropertyAdd.bundleGroupId = this.data;
  }

  saveFunction(): void {
    this.bundlePropertyService.addBundleProperty(this.bundlePropertyAdd).subscribe(bundleProperty => {
      this.bundlePropertyAdd.propertyName = bundleProperty.propertyName;
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
