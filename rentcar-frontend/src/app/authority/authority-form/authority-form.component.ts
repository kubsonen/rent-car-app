import { Component, OnInit } from '@angular/core';
import {ModalFormComponent} from '../../layout/modal/modal-form.component';
import {AuthorityService} from '../../core/service/authority.service';
import {Authority} from '../../core/model/authority.model';
import {FormMode} from '../../layout/form/form-mode.enum';

@Component({
  selector: 'app-authority-form',
  templateUrl: './authority-form.component.html',
  styleUrls: ['./authority-form.component.css']
})
export class AuthorityFormComponent implements OnInit, ModalFormComponent {

  constructor(private authorityService: AuthorityService) { }

  authority: Authority;
  closeModal: Function;
  afterSave: Function;
  error: any;
  mode: FormMode;
  data: any;
  dataService: any;

  ngOnInit() {
    this.authority = new Authority();
  }

  saveFunction(): void {
    this.authorityService.post(this.authority).subscribe(authority => {
      this.authority = authority;
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
