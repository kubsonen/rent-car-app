import {Component, OnInit} from '@angular/core';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../core/model/user.model';
import {UserService} from '../../core/service/user.service';
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
    this.onAddSuccessAction(() => this.router.navigate(['users']));
    this.onEditSuccessAction(() => this.router.navigate(['users']));
  }
}
