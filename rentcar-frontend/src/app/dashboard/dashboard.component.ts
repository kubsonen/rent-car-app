import {Component, OnInit} from '@angular/core';
import {ApiService} from '../core/service/api.service';
import {BundlePropertyService} from '../core/service/bundle-property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService,
              private bundlePropertyService: BundlePropertyService) {
  }

  ngOnInit() {
  }

  createSampleData() {
    // this.apiService.post('dashboard/add-data', null).subscribe(value => {
    //   console.log('DONE');
    // });
  }

  checkData() {
    // this.apiService.post('dashboard/check-data', null).subscribe(value => {
    //   console.log('DONE');
    // });
  }

  doAction() {
    // this.apiService.post('dashboard/do-action', null).subscribe(value => {
    //   console.log('DONE');
    // });
    this.bundlePropertyService.getAllComboItem('Languages').subscribe(value => {
      console.log(value);
    });
  }

}
