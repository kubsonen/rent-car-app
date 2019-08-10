import {Component, Input, OnInit} from '@angular/core';
import {ComboBoxService} from '../../core/abstract/combo-box-service';
import {Search} from '../../core/model/search.model';
import {ComboBoxItem} from '../../core/abstract/combo-box-item';
import {Common} from '../../core/model/common.model';
import {InputComboItem} from '../input-field/input-field.component';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent implements OnInit {

  @Input() labelComboBox: string;
  @Input() model: any;
  @Input() error: any;
  @Input() modelField: string;
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() comboboxService: ComboBoxService;

  items: InputComboItem[] = [];
  isLoaded = false;

  constructor() {
  }

  ngOnInit() {
    const uuid = this.model[this.modelField];
    if (uuid !== undefined) {
      this.comboboxService.getByIdComboItem(uuid)
        .subscribe(cbi => {
          this.items.push(cbi);
          this.isLoaded = true;
        });
    } else {
      this.isLoaded = true;
    }
  }

  searchModels(event) {
    const s: string = event.term;
    this.comboboxService.searchComboItem(new Search(s)).subscribe(value => {
      this.items = value;
    });
  }

  customSearchFn() {
    return true;
  }

}
