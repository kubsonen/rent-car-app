import {Component, OnInit} from '@angular/core';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {ClientsService} from '../../core/service/clients.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../core/model/client.model';
import {FormMode} from '../../layout/form/form-mode.enum';
import {User} from '../../core/model/user.model';
import {UserService} from '../../core/service/user.service';
import {TopbarActions} from '../../layout/topbar/topbar.component';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  private error: any;
  private user: User;
  private uid: string;
  mode: FormMode;
  formMode: any = FormMode;

  constructor(private topbarService: TopbarService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {

    this.initTopbarActions();

    this.route.params.subscribe(p => this.uid = p.uid);
    this.user = new User();
    this.mode = FormMode.ADD;

  }

  ngOnInit() {
  }

  private initTopbarActions() {
    this.topbarService.setAcions(TopbarActions.formActions(() => {
      if (this.mode === FormMode.ADD) {
        this.userService.createUser(this.user).subscribe(value => {
          this.router.navigate(['users']);
        }, error => {
          if (error.status === 406) {
            this.error = error.error;
          } else {
            throw error;
          }
        });
      } else if (this.mode === FormMode.EDIT) {
        this.userService.updateUser(this.user).subscribe(value => {
          this.router.navigate(['users']);
        }, error => {
          if (error.status === 406) {
            this.error = error.error;
          } else {
            throw error;
          }
        });
      }

    }));
  }

}
