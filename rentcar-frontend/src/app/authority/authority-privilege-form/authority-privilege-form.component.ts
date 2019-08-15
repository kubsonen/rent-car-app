import { Component, OnInit } from '@angular/core';
import {ModalFormComponent} from '../../layout/modal/modal-form.component';
import {PrivilegeService} from '../../core/service/privilege.service';
import {Privilege} from '../../core/model/privilege.model';

@Component({
  selector: 'app-authority-privilege-form',
  templateUrl: './authority-privilege-form.component.html',
  styleUrls: ['./authority-privilege-form.component.css']
})
export class AuthorityPrivilegeFormComponent implements OnInit, ModalFormComponent {

  constructor(private privilegeService: PrivilegeService) { }

  privilege: Privilege;
  data: any;
  dataService: any;
  closeModal: Function;
  afterSave: Function;
  private error: any;

  ngOnInit() {
    this.privilege = new Privilege();
  }

  saveFunction(): void {
    this.privilegeService.post(this.privilege).subscribe(value => {
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
