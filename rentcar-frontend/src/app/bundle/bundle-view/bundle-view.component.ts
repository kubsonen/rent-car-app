import {Component, OnInit} from '@angular/core';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {TopbarActions} from '../../layout/topbar/topbar.component';
import {ModalService} from '../../layout/modal/modal.service';
import {Modal} from '../../layout/modal/modal.model';
import {BundleGroupFormComponent} from '../bundle-group-form/bundle-group-form.component';
import {BundleGroup} from '../../core/model/bundle-group.model';
import {BundleGroupService} from '../../core/service/bundle-group.service';
import {BundlePropertyFormComponent} from '../bundle-property-form/bundle-property-form.component';
import {BundleProperty} from '../../core/model/bundle-property.model';
import {BundlePropertyService} from '../../core/service/bundle-property.service';
import {Commons} from '../../core/model/commons.model';

@Component({
  selector: 'app-bundle-view',
  templateUrl: './bundle-view.component.html',
  styleUrls: ['./bundle-view.component.css']
})
export class BundleViewComponent implements OnInit {

  constructor(private topbarService: TopbarService,
              private modalService: ModalService,
              private bundleGroupService: BundleGroupService,
              private bundlePropertyService: BundlePropertyService) {

    topbarService.setAcions(TopbarActions.bundleActions(() => {
      this.refreshGroups();
    }, () => {
      this.modalService.setModal(Modal.modalForm(this.addBundleGroupTittle, this.addBundleGroupTittle, BundleGroupFormComponent,
        undefined, () => {
          this.refreshGroups();
        }));
    }, () => {
      this.deleteBundleGroup();
    }));

  }

  private addBundleGroupTittle = 'Add bundle group';
  private addBundlePropertyTittle = 'Add bundle property for group ';
  public selectedBundleGroup: BundleGroup;
  public bundleProperties: BundleProperty[];
  public bundleGroups: BundleGroup[];

  ngOnInit() {
    this.refreshGroups();
  }

  selectGroup() {
    this.refreshProperties();
  }

  refreshGroups() {
    this.bundleProperties = [];
    this.bundleGroupService.getAll().subscribe(bundles => this.bundleGroups = bundles);
  }

  refreshProperties() {
    if (this.selectedBundleGroup !== undefined) {
      this.bundlePropertyService.getForBundleGroup(this.selectedBundleGroup.id).subscribe(properties => {
        this.bundleProperties = properties;
      });
    } else {
      this.bundleProperties = [];
    }
  }

  getSelectedBundleGroupTittle(): string {
    return this.addBundlePropertyTittle + this.selectedBundleGroup.name.toLowerCase();
  }

  addBundleProperty() {
    this.modalService.setModal(Modal.modalForm(this.getSelectedBundleGroupTittle(), this.getSelectedBundleGroupTittle(),
      BundlePropertyFormComponent, this.selectedBundleGroup.id, () => {
        this.refreshProperties();
      }));
  }

  editProperty(p: BundleProperty) {
    p.inEdit = true;
  }

  saveProperty(p: BundleProperty) {
    p.inEdit = false;
    this.bundlePropertyService.put(p).subscribe(value => {
      p = value;
      this.refreshProperties();
    });
  }

  deleteBundleGroup(): void {
    if (this.selectedBundleGroup !== undefined) {
      this.bundleGroupService.delete(this.selectedBundleGroup.id).subscribe(() => this.refreshGroups());
    }
  }

  deleteProperties(): void {
    const c: Commons = new Commons();
    const ids: Array<string> = new Array<string>();
    this.bundleProperties.forEach(p => {
      if (p.selected === true) {
        ids.push(p.id);
      }
    });
    c.ids = ids;
    this.bundlePropertyService.deleteMultiple(c).subscribe(() => this.refreshProperties());
  }

}
