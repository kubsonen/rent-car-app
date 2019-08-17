import {Component, OnInit} from '@angular/core';
import {FormLayout} from '../../core/abstract/form-layout';
import {Car} from '../../core/model/car.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {CarService} from '../../core/service/car.service';
import {BundlePropertyService} from '../../core/service/bundle-property.service';
import {FormMode} from '../../layout/form/form-mode.enum';
import {InputField} from '../../layout/input-field/input-field.component';
import {PriceListService} from '../../core/service/price-list.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent extends FormLayout<Car> implements OnInit {

  /* Form initializers */
  private modelInput: InputField = InputField.inputText('Model', 'model');
  private engineCapacityInput: InputField = InputField.inputText('Engine capacity', 'engineCapacity');
  private plateNumberInput: InputField = InputField.inputText('Plate number', 'plateNumber');
  private productionDateInput: InputField = InputField.inputDate('Production date', 'productionDate');
  private registerDateInput: InputField = InputField.inputDate('Register date', 'registerDate');
  private vinInput: InputField = InputField.inputText('Vin', 'vin');

  private typeInput: InputField;
  private brandInput: InputField;
  private fuelTypeInput: InputField;
  private defaultPriceListInput: InputField;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public topbarService: TopbarService,
              private carService: CarService,
              private bundlePropertyService: BundlePropertyService,
              private priceListService: PriceListService) {

    super(topbarService, carService, () => this.router.navigate(['cars']));
    this.typeInput = InputField.inputComboConst('Type', 'type', bundlePropertyService, 'CarType');
    this.brandInput = InputField.inputComboConst('Brand', 'brand', bundlePropertyService, 'Brands');
    this.fuelTypeInput = InputField.inputComboConst('Fuel', 'fuelType', bundlePropertyService, 'FuelType');
    this.defaultPriceListInput = InputField.inputCombo('Price list', 'defaultPriceListId', priceListService);

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
