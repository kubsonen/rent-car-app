import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ConstantValuesService} from '../../core/abstract/constant-values-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-combo-box-constants',
  templateUrl: './combo-box-constants.component.html',
  styleUrls: ['./combo-box-constants.component.css']
})
export class ComboBoxConstantsComponent implements OnInit, AfterViewInit {

  @Input() labelComboBox: string;
  @Input() model: any;
  @Input() error: any;
  @Input() modelField: string;

  @Input() groupName: string;
  @Input() constantService: ConstantValuesService;
  @Input() translateService: TranslateService;

  isLoaded = false;
  items: string[] = [];
  translations = new Map<string, string>();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.groupName !== undefined) {
      this.constantService.getByGroupName(this.groupName).subscribe(value => {
        this.items = value;
        this.items.forEach(name => {
          this.translateService.get(name).subscribe(val => {
            this.translations.set(name, val);
          });
        });
        this.isLoaded = true;
      });
    }
  }
}
