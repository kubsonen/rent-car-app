import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ClientsService} from '../../core/service/clients.service';
import {Client} from '../../core/model/client.model';
import {ListComponent} from '../../layout/list/list.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, AfterViewInit {

  @ViewChild(ListComponent, { static: true }) listComponent: ListComponent;

  constructor(private router: Router,
              private clientService: ClientsService) {
  }

  private addFunction: Function = () => this.addClient();
  private editFunction: Function = (c: Client) => this.editClient(c);

  ngOnInit() {}

  private addClient() {
    this.router.navigate(['clients/add']);
  }

  private editClient(c: Client) {
    this.router.navigate(['clients/edit/' + c.id]);
  }

  ngAfterViewInit(): void {
    this.listComponent.refreshTable();
  }

}
