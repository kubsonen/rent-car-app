import {Component, OnInit} from '@angular/core';
import {ApiService} from '../core/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  createSampleData() {
    this.apiService.post('dashboard/add-data', null).subscribe(value => {
      console.log('DONE');
    });
  }

  checkData() {
    this.apiService.post('dashboard/check-data', null).subscribe(value => {
      console.log('DONE');
    });
  }

  doAction() {
    this.apiService.post('dashboard/do-action', null).subscribe(value => {
      console.log('DONE');
    });
  }

}
