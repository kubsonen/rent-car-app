import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Client} from '../../core/model/client.model';
import {Router} from '@angular/router';
import {ClientsService} from '../../core/service/clients.service';
import {ListComponent} from '../../layout/list/list.component';
import {UserService} from '../../core/service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  @ViewChild(ListComponent, { static: true }) listComponent: ListComponent;

  constructor(private router: Router,
              private userService: UserService) { }

  private captions: string[] = ['User name'];
  private columns: string[] = ['username'];
  private addFunction: Function = () => this.addUser();
  private editFunction: Function = (c: Client) => this.editUser(c);

  ngOnInit() {
  }

  private addUser() {
    this.router.navigate(['users/add']);
  }

  private editUser(c: Client) {
    // this.router.navigate(['clients/edit/' + c.id]);
  }

  ngAfterViewInit(): void {
    this.listComponent.refreshTable();
  }

}
