import {Component, OnInit} from '@angular/core';
import {ModalFormComponent} from '../modal/modal-form.component';
import {PageService} from '../../core/abstract/page-service';
import {TableConfig} from '../../core/model/table-config.model';

@Component({
  selector: 'app-table-column-config',
  templateUrl: './table-column-config.component.html',
  styleUrls: ['./table-column-config.component.css']
})
export class TableColumnConfigComponent implements OnInit, ModalFormComponent {

  constructor() {
  }

  afterSave: Function;
  closeModal: Function;
  data: string; // Table id
  dataService: PageService<any>; // Service to save and get configurations

  private items: TableConfig[];
  private dragItem: TableConfig;

  ngOnInit() {
    this.dataService.getTableConfig(this.data).subscribe(value => {
      this.items = value.sort((a, b) => {
        return a.index - b.index;
      });
    });
  }

  saveFunction(): void {
    this.dataService.saveTableConfig(this.data, this.items).subscribe(() => {
      if (this.afterSave !== undefined) {
        this.afterSave();
      }
      this.closeModal();
    });
  }

  startDrag(tableConfig: TableConfig) {
    this.dragItem = tableConfig;
  }

  drop(tableConfig: TableConfig) {
    this.removeActive();
    if (tableConfig !== this.dragItem) {
      this.items = this.items.filter(value => value !== this.dragItem);
      if (tableConfig.index < this.dragItem.index) {
        this.items.splice(this.items.indexOf(tableConfig), 0, this.dragItem);
      } else {
        this.items.splice(this.items.indexOf(tableConfig) + 1, 0, this.dragItem);
      }
      let i = 0;
      this.items.forEach(value => value.index = ++i);
    }
  }

  dragOver(e: Event, tableConfig: TableConfig) {
    e.preventDefault();
    this.removeActive();
    if (tableConfig !== this.dragItem) {
      tableConfig.dragOver = true;
    }
  }

  private removeActive() {
    this.items.forEach(value => value.dragOver = false);
  }

}
