import {Component, OnInit, ViewChild} from '@angular/core';
import {TableResponse} from '../../core/model/table-response.model';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {TopbarActions} from '../../layout/topbar/topbar.component';
import {PrivilegeService} from '../../core/service/privilege.service';
import {Privilege} from '../../core/model/privilege.model';
import {ModalService} from '../../layout/modal/modal.service';
import {Modal} from '../../layout/modal/modal.model';
import {AuthorityPrivilegeFormComponent} from '../authority-privilege-form/authority-privilege-form.component';
import {TableComponent} from '../../layout/table/table.component';

@Component({
  selector: 'app-authority-privilege-list',
  templateUrl: './authority-privilege-list.component.html',
  styleUrls: ['./authority-privilege-list.component.css']
})
export class AuthorityPrivilegeListComponent implements OnInit {

  @ViewChild(TableComponent, {static: false}) table: TableComponent;

  captions: string[] = ['Id', 'Privilege', 'Description'];
  columns: string[] = ['id', 'privilege', 'description'];
  public tableResponse: TableResponse<Privilege>;

  constructor(private topbarService: TopbarService,
              private privilegeService: PrivilegeService,
              private modalService: ModalService) {
    this.topbarService.setAcions(TopbarActions.tabActions(
      () => {
        this.refreshTable();
      },
      () => {
        this.modalService.setModal(Modal.modalForm('', '', AuthorityPrivilegeFormComponent));
      },
      () => {
        const id: string = this.table.getSelectedObject().id;
        this.privilegeService.delete(id).subscribe();
      }
    ));
  }

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.privilegeService.getPageData().subscribe(tr => this.tableResponse = tr);
  }

}
