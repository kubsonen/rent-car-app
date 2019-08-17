import {Component, OnInit, ViewChild} from '@angular/core';
import {TableResponse} from '../../core/model/table-response.model';
import {Authority} from '../../core/model/authority.model';
import {TopbarActions} from '../../layout/topbar/topbar.component';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {ModalService} from '../../layout/modal/modal.service';
import {Modal} from '../../layout/modal/modal.model';
import {AuthorityFormComponent} from '../authority-form/authority-form.component';
import {AuthorityService} from '../../core/service/authority.service';
import {TableComponent} from '../../layout/table/table.component';

@Component({
  selector: 'app-authority-list',
  templateUrl: './authority-list.component.html',
  styleUrls: ['./authority-list.component.css']
})
export class AuthorityListComponent implements OnInit {

  @ViewChild(TableComponent, {static: false}) table: TableComponent;

  constructor(private topbarService: TopbarService,
              private modalService: ModalService,
              private authorityService: AuthorityService) {

    this.topbarService.setAcions(TopbarActions.tabActions(
      () => {
        this.refreshTable();
      },
      () => {
        this.modalService.setModal(Modal.modalForm(this.tittle, this.tittle, AuthorityFormComponent));
      },
      () => {
        const id: string = this.table.getSelectedObject().id;
        this.authorityService.delete(id).subscribe();
        this.refreshTable();
      }
    ));
  }

  captions: string[] = ['Id', 'Authority'];
  columns: string[] = ['id', 'authority'];
  tittle = 'Add authority';
  public tableResponse: TableResponse<Authority>;


  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.authorityService.getPageData().subscribe(tr => this.tableResponse = tr);
  }

}
