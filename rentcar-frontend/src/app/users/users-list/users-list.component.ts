import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Client} from '../../core/model/client.model';
import {Router} from '@angular/router';
import {ListComponent} from '../../layout/list/list.component';
import {UserService} from '../../core/service/user.service';
import {Commons} from '../../core/model/commons.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  @ViewChild(ListComponent, {static: true}) listComponent: ListComponent;

  constructor(private router: Router,
              public userService: UserService) {
  }

  public addFunction: Function = () => this.addUser();
  public editFunction: Function = (c: Client) => this.editUser(c);
  public deleteFunction: Function = (c: Commons) => this.deleteUsers(c);

  ngOnInit() {
  }

  private addUser() {
    this.router.navigate(['users/add']);
  }

  private editUser(c: Client) {
    this.router.navigate(['users/edit/' + c.id]);
  }

  private deleteUsers(c: Commons) {
    this.userService.deleteMultiple(c).subscribe(value => this.listComponent.refreshTable());
  }

  ngAfterViewInit(): void {
    this.listComponent.refreshTable();
  }

}
