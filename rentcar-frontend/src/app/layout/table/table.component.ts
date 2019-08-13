import {Component, Input, OnInit} from '@angular/core';
import {TableResponse} from '../../core/model/table-response.model';
import {Common} from '../../core/model/common.model';
import {Commons} from '../../core/model/commons.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() tableHeightStyle: string;
  @Input() captions: string[];
  @Input() columns: string[];
  @Input() dataTable: TableResponse<Common>;
  @Input() doubleClickAction: Function;
  @Input() singleSelect = false;
  @Input() dblClick: () => void;

  private multipleLock = false;
  private isAllSelectionActive = false;

  constructor() {
  }

  ngOnInit() {
  }

  unselectAll() {
    this.dataTable.data.forEach(value => value.selected = false);
  }

  selectAll() {
    if (this.isAllSelectionActive === true) {
      this.unselectAll();
    } else {
      let i;
      const data: Common[] = this.dataTable.data;
      for (i = 0; i < this.dataTable.data.length; i++) {
        data[i].selected = true;
      }
    }
    this.checkAllSelection();
  }

  checkAllSelection() {
    if (this.isAllSelected()) {
      this.isAllSelectionActive = true;
    } else {
      this.isAllSelectionActive = false;
    }
  }

  isAllSelected(): boolean {
    let i;
    const data: Common[] = this.dataTable.data;
    for (i = 0; i < this.dataTable.data.length; i++) {
      if (data[i].selected === false) {
        return false;
      }
    }
    return true;
  }

  getSelectedObject() {
    let val: Common;
    let found = false;
    for (let i = 0; i < this.dataTable.data.length; i++) {
      val = this.dataTable.data[i];
      if (val.selected === true) {
        found = true;
        break;
      }
    }
    if (found) {
      return val;
    } else {
      throw new Error('Object was not selected.');
    }
  }


  getSelectedCommons(): Commons {

    const c: Commons = new Commons();
    const ids: Array<string> = new Array<string>();

    this.dataTable.data.forEach(model => {
      if (model.selected) {
        ids.push(model.id);
      }
    });

    c.ids = ids;
    return c;
  }

  selectMultiple(c: Common) {
    if (this.singleSelect) {
      this.unselectAll();
    }
    this.multipleLock = true;
    if (c.selected === true) {
      c.selected = false;
    } else {
      c.selected = true;
    }
    this.checkAllSelection();
  }

  selectSingle(c: Common) {
    if (this.multipleLock) {
      this.multipleLock = false;
      return;
    }
    this.unselectAll();
    if (c.selected === true) {
      c.selected = false;
    } else {
      c.selected = true;
    }
    this.checkAllSelection();
  }

  doubleClick() {
    if (this.doubleClickAction !== undefined) {
      this.doubleClickAction();
    }
    if (this.dblClick !== undefined) {
      this.dblClick();
    }
  }

}
