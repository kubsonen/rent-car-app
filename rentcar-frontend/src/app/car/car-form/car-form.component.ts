import { Component, OnInit } from '@angular/core';
import {FormLayout} from '../../core/abstract/form-layout';
import {Car} from '../../core/model/car.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {CarService} from '../../core/service/car.service';
import {BundlePropertyService} from '../../core/service/bundle-property.service';
import {TranslateService} from '@ngx-translate/core';
import {FormMode} from '../../layout/form/form-mode.enum';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent extends FormLayout<Car> implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              public topbarService: TopbarService,
              private carService: CarService,
              private bundlePropertyService: BundlePropertyService,
              private translateService: TranslateService) {

    super(topbarService, carService, () => {
      this.router.navigate(['cars']);
    });

    this.route.params.subscribe(p => {
      this.uid = p.uid;
      if (this.uid !== undefined) {
        this.carService.getById(this.uid).subscribe(value => {
          this.model = value;
          this.showForm(FormMode.EDIT);
        });
      } else {
        this.model = new Car();
        this.showForm(FormMode.ADD);
      }
    });

  }

  ngOnInit() {
  }

}
