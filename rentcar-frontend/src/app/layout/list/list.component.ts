import {Component, Input, OnInit, Output} from '@angular/core';
import {TableRequest} from '../../core/model/table-request.model';
import {TableResponse} from '../../core/model/table-response.model';
import {TopbarActions} from '../topbar/topbar.component';
import {PaginationInfo} from '../../core/model/pagination-info.model';
import {CrudService} from '../../core/abstract/crud-service';
import {TopbarService} from '../topbar/topbar.service';
import {Common} from '../../core/model/common.model';
import {ModalService} from '../modal/modal.service';
import {Modal} from '../modal/modal.model';
import {Commons} from '../../core/model/commons.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() addFunction: Function;
  @Input() crudService: CrudService<any>;
  @Input() crudEdit: Function;
  @Input() crudDelete: Function;
  @Input() captions: string[];
  @Input() columns: string[];

  private tableRequest: TableRequest;
  private tableResponse: TableResponse<Common>;
  editFunction: Function;

  @Output() refreshList: Function = () => this.refreshTable();

  constructor(private topbarService: TopbarService,
              private modal: ModalService) {
  }

  ngOnInit() {
    this.tableRequest = new TableRequest();
    this.tableRequest.page = 0;
    this.tableRequest.size = 50;
    this.initTopbarActions();

    this.editFunction = () => {
      this.editObject();
    };
  }


  initTopbarActions() {
    const ta: TopbarActions = new TopbarActions();
    ta.add = () => this.addFunction();
    ta.next = () => this.nextPage();
    ta.edit = () => this.editObject();
    ta.refresh = () => this.refreshTable();
    ta.previous = () => this.previousPage();
    ta.delete = () => this.deleteObject();
    this.topbarService.setAcions(ta);
  }

  private editObject() {
    let i = 0;
    let c: Common = null;
    this.tableResponse.data.forEach(client => {
      if (client.selected) {
        c = client;
        i++;
      }
    });
    if (i !== 1) {
      this.modal.setModal(Modal.modalInfo('Select one object.'));
    } else {
      this.crudEdit(c);
    }
  }

  private deleteObject() {

    const c: Commons = new Commons();
    const ids: Array<string> = new Array<string>();

    this.tableResponse.data.forEach(model => {
      if (model.selected) {
        ids.push(model.id);
      }
    });

    c.ids = ids;
    this.crudDelete(c);

  }

  refreshTable() {
    this.crudService.getPageData(this.tableRequest).subscribe(tr => {
      this.tableResponse = tr;
      this.topbarService.setPaginationInfo(new PaginationInfo(tr.actualPage += 1, tr.countOfPage));
    });
  }

  nextPage() {
    const next = this.tableRequest.page + 1;
    if (next < this.tableResponse.countOfPage) {
      this.tableRequest.page += 1;
      this.refreshTable();
    }
  }

  previousPage() {
    if (this.tableRequest.page >= 1) {
      this.tableRequest.page -= 1;
      this.refreshTable();
    }
  }

}
