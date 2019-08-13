import {Component, OnInit} from '@angular/core';
import {FormLayout} from '../../core/abstract/form-layout';
import {Refuelling} from '../../core/model/refuelling.model';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BundlePropertyService} from '../../core/service/bundle-property.service';
import {RefuellingService} from '../../core/service/refuelling.service';
import {FormMode} from '../../layout/form/form-mode.enum';
import {InputField} from '../../layout/input-field/input-field.component';
import {CarService} from '../../core/service/car.service';

@Component({
  selector: 'app-refuelling-form',
  templateUrl: './refuelling-form.component.html',
  styleUrls: ['./refuelling-form.component.css']
})
export class RefuellingFormComponent extends FormLayout<Refuelling> implements OnInit {

  private refuellingDateInput: InputField = InputField.inputDate('Date', 'refuellingDate');
  private mileageInput: InputField = InputField.inputText('Mileage', 'mileage');
  private priceInput: InputField = InputField.inputText('Price', 'price');
  private currencyInput: InputField;
  private refuellingCarInput: InputField;

  constructor(public topbarService: TopbarService,
              private router: Router,
              private route: ActivatedRoute,
              private refuellingService: RefuellingService,
              private bundlePropertyService: BundlePropertyService,
              private carService: CarService) {

    super(topbarService, refuellingService, () => {
      this.router.navigate(['refuelling']);
    });

    this.currencyInput = InputField.inputComboConst('Currency', 'currency', bundlePropertyService, 'Currency');
    this.refuellingCarInput = InputField.inputCombo('Car', 'refuelCarId', carService);

    this.route.params.subscribe(p => {
      this.uid = p.uid;
      if (this.uid !== undefined) {
        this.refuellingService.getById(this.uid).subscribe(value => {
          this.model = value;
          this.showForm(FormMode.EDIT);
        });
      } else {
        this.model = new Refuelling();
        this.showForm(FormMode.ADD);
      }
    });

  }

  ngOnInit() {
  }

}
