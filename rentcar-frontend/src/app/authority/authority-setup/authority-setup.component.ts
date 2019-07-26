import {Component, NgZone, OnInit} from '@angular/core';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {TopbarActions} from '../../layout/topbar/topbar.component';
import {AuthorityService} from '../../core/service/authority.service';
import {PrivilegeService} from '../../core/service/privilege.service';
import {Authority} from '../../core/model/authority.model';
import {Privilege} from '../../core/model/privilege.model';
import {Common} from '../../core/model/common.model';
import {AuhorityPrivilege} from '../../core/model/auhority-privilege.model';

@Component({
  selector: 'app-authority-setup',
  templateUrl: './authority-setup.component.html',
  styleUrls: ['./authority-setup.component.css']
})
export class AuthoritySetupComponent implements OnInit {

  private authorities: Authority[];
  private privileges: Privilege[];

  constructor(private topbarService: TopbarService,
              private authorityService: AuthorityService,
              private privilegeService: PrivilegeService,
              private ngZone: NgZone) {

    this.topbarService.setAcions(TopbarActions.onlyRefresh(() => {
      this.refreshLists();
    }));

  }

  ngOnInit() {
    this.refreshLists();
  }

  selectAuthority(a: Authority) {
    this.unselectAll();
    a.selected = true;
    this.refreshPrivilegesForAuthority();
  }

  selectModels(models: Common[]) {
    models.forEach(p => this.selectModel(p.id));
  }

  selectModel(uuid: String) {
    this.privileges.forEach(p => {
      if (p.id === uuid) {
        p.selected = true;
      }
    });
  }

  getSelectedAuthority(): Authority {
    for (let i = 0; i < this.authorities.length; i++) {
      if (this.authorities[i].selected === true) {
        return this.authorities[i];
      }
    }
    throw new Error('Row was not selected.');
  }

  performPrivilege(privilege: Privilege) {
    const ap: AuhorityPrivilege = new AuhorityPrivilege();
    ap.authorityId = this.getSelectedAuthority().id;
    ap.privilegeId = privilege.id;
    this.authorityService.performPrivilege(ap).subscribe(value => {
      this.refreshPrivilegesForAuthority();
    });
  }

  unselectAll() {
    this.authorities.forEach(value => value.selected = false);
    this.unselectPrivileges();
  }

  unselectPrivileges() {
  this.privileges.forEach(value => value.selected = false);
  }

  refreshLists() {
    this.authorityService.getAll().subscribe(authorities => this.authorities = authorities);
    this.privilegeService.getAll().subscribe(privileges => this.privileges = privileges);
  }

  refreshPrivilegesForAuthority() {
    const a: Authority =  this.getSelectedAuthority();
    this.privilegeService.getForAuthority(a.id).subscribe(commons => {
      this.unselectPrivileges();
      this.selectModels(commons);
    });
  }

}
