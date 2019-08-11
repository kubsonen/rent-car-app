import {Component, OnInit} from '@angular/core';
import {FormLayout} from '../../core/abstract/form-layout';
import {PriceList} from '../../core/model/price-list.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {PriceListService} from '../../core/service/price-list.service';
import {BundlePropertyService} from '../../core/service/bundle-property.service';
import {FormMode} from '../../layout/form/form-mode.enum';
import {InputField} from '../../layout/input-field/input-field.component';

@Component({
  selector: 'app-price-list-form',
  templateUrl: './price-list-form.component.html',
  styleUrls: ['./price-list-form.component.css']
})
export class PriceListFormComponent extends FormLayout<PriceList> implements OnInit {

  /* Form initializers */
  private nameInput: InputField = InputField.inputText('Name', 'name');
  private descInput: InputField = InputField.inputText('Description', 'description');
  private perHourInput: InputField = InputField.inputText('Price per hour', 'pricePerHour');
  private perDayInput: InputField = InputField.inputText('Price per day', 'pricePerDay');
  private perWeekInput: InputField = InputField.inputText('Price per week', 'pricePerWeek');
  private perMonthInput: InputField = InputField.inputText('Price per month', 'pricePerMonth');
  private currencyInput: InputField;

  constructor(public topbarService: TopbarService,
              private router: Router,
              private route: ActivatedRoute,
              private priceListService: PriceListService,
              private bundlePropertyService: BundlePropertyService) {

    super(topbarService, priceListService, () => {
      this.router.navigate(['priceList']);
    });

    this.currencyInput = InputField.inputComboConst('Currency', 'currency', bundlePropertyService, 'Currency');

    this.route.params.subscribe(p => {
      this.uid = p.uid;
      if (this.uid !== undefined) {
        this.priceListService.getById(this.uid).subscribe(value => {
          this.model = value;
          this.showForm(FormMode.EDIT);
        });
      } else {
        this.model = new PriceList();
        this.showForm(FormMode.ADD);
      }
    });
  }

  ngOnInit() {
  }

}
