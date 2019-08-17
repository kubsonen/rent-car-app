import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {TopbarActions} from '../../layout/topbar/topbar.component';
import {CarService} from '../../core/service/car.service';
import {Commons} from '../../core/model/commons.model';
import {Router} from '@angular/router';
import {ListComponent} from '../../layout/list/list.component';
import {Car} from '../../core/model/car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, AfterViewInit {

  constructor(topbarService: TopbarService,
              public carService: CarService,
              private router: Router) {
    const actions: TopbarActions = new TopbarActions();
    topbarService.setAcions(actions);
  }

  @ViewChild(ListComponent, { static: true }) listComponent: ListComponent;

  public addFunction: Function = () => this.router.navigate(['cars/add']);
  public editFunction: Function = (c: Car) => this.router.navigate(['cars/edit/' + c.id])
  public deleteFunction: Function = (c: Commons) => this.deleteCar(c);

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.listComponent.refreshTable();
  }

  deleteCar(c: Commons) {
    this.carService.deleteMultiple(c).subscribe(value => this.listComponent.refreshTable());
  }

}
