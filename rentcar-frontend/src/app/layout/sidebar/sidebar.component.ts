import {Component, OnDestroy, OnInit} from '@angular/core';
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {faCar} from '@fortawesome/free-solid-svg-icons';
import {faAddressBook} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons';
import {faDollarSign} from '@fortawesome/free-solid-svg-icons';
import {faTools} from '@fortawesome/free-solid-svg-icons';
import {faGasPump} from '@fortawesome/free-solid-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {faFileArchive} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  iconDashboard = faTachometerAlt;
  iconCars = faCar;
  iconClients = faAddressBook;
  iconUsers = faUser;
  iconOrders = faClipboardList;
  iconPriceList = faDollarSign;
  iconRepair = faTools;
  iconFuel = faGasPump;
  iconPrivilege = faKey;
  iconBundle = faFileArchive;

  constructor() {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
