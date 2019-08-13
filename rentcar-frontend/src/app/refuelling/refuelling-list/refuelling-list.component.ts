import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ListComponent} from '../../layout/list/list.component';
import {Car} from '../../core/model/car.model';
import {Commons} from '../../core/model/commons.model';
import {Router} from '@angular/router';
import {RefuellingService} from '../../core/service/refuelling.service';

@Component({
  selector: 'app-refuelling-list',
  templateUrl: './refuelling-list.component.html',
  styleUrls: ['./refuelling-list.component.css']
})
export class RefuellingListComponent implements OnInit, AfterViewInit {

  constructor(private refuellingService: RefuellingService,
              private router: Router) {
  }

  @ViewChild(ListComponent, {static: true}) listComponent: ListComponent;

  private addFunction: Function = () => this.router.navigate(['refuelling/add']);
  private editFunction: Function = (c: Car) => this.router.navigate(['refuelling/edit/' + c.id]);
  private deleteFunction: Function = (c: Commons) => this.deleteRefuelling(c);


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.listComponent.refreshTable();
  }

  deleteRefuelling(c: Commons) {
    this.refuellingService.deleteMultiple(c).subscribe(value => this.listComponent.refreshTable());
  }

}
