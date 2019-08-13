import {Component, OnInit} from '@angular/core';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {ClientsService} from '../../core/service/clients.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../core/model/client.model';
import {FormMode} from '../../layout/form/form-mode.enum';
import {User} from '../../core/model/user.model';
import {UserService} from '../../core/service/user.service';
import {TopbarActions} from '../../layout/topbar/topbar.component';
import {FormLayout} from '../../core/abstract/form-layout';
import {PriceList} from '../../core/model/price-list.model';
import {PriceListService} from '../../core/service/price-list.service';
import {BundlePropertyService} from '../../core/service/bundle-property.service';
import {SeparateFormLayout} from '../../core/abstract/separate-form-layout';
import {UserAdd} from '../../core/model/user-add.model';
import {InputField} from '../../layout/input-field/input-field.component';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent extends SeparateFormLayout<UserAdd, User> implements OnInit {

  private usernameInput: InputField = InputField.inputText('Username', 'username');
  private passwordInput: InputField = InputField.inputPassword('Password', 'password');

  constructor(public topbarService: TopbarService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {

    super(userService);
    this.initTopbarActions(topbarService);
    this.route.params.subscribe(p => {
      this.uid = p.uid;
      this.initForm(this.uid);
    });
  }

  ngOnInit() {
  }

}
