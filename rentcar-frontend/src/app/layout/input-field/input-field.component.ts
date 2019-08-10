import {Component, Input, OnInit} from '@angular/core';
import {ComboBoxService} from '../../core/abstract/combo-box-service';
import {faCalendar, faCalendarAlt, faClock} from '@fortawesome/free-solid-svg-icons';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import {Search} from '../../core/model/search.model';

export enum InputType {TEXT, TEXT_AREA, INTEGER, DECIMAL, DATE, COMBO, COMBO_CONST, CHECK, RADIO}

export class InputField {

  /* Instance only by static constructor */
  private constructor() {
  }

  /* Common */
  private _type: InputType;
  private _label: string;
  private _field: string;

  /* Text area */
  private _textAreaRows: number;

  /* Combo box */
  private _comboboxService: ComboBoxService;

  /* Combo box const*/
  private _constantName: string;

  public static default(): InputField {
    const f: InputField = new InputField();
    return f;
  }

  private static inputCommon(type: InputType, label: string, field: string): InputField {
    const f: InputField = new InputField();
    f._type = type;
    f._label = label;
    f._field = field;
    return f;
  }

  /* Static factories for each custom form fields */
  public static inputText(label: string, field: string): InputField {
    return this.inputCommon(InputType.TEXT, label, field);
  }

  public static inputTextArea(label: string, field: string, rows: number): InputField {
    const input: InputField = this.inputCommon(InputType.TEXT_AREA, label, field);
    input._textAreaRows = rows;
    return input;
  }

  public static inputInteger(label: string, field: string): InputField {
    return this.inputCommon(InputType.INTEGER, label, field);
  }

  public static inputDecimal(label: string, field: string): InputField {
    return this.inputCommon(InputType.DECIMAL, label, field);
  }

  public static inputDate(label: string, field: string): InputField {
    return this.inputCommon(InputType.DATE, label, field);
  }

  public static inputCombo(label: string, field: string, service: ComboBoxService): InputField {
    const input: InputField = this.inputCommon(InputType.COMBO, label, field);
    input._comboboxService = service;
    return input;
  }

  public static inputComboConst(label: string, field: string, service: ComboBoxService, constantName: string): InputField {
    const input: InputField = this.inputCommon(InputType.COMBO_CONST, label, field);
    input._comboboxService = service;
    input._constantName = constantName;
    return input;
  }

  get type(): InputType {
    return this._type;
  }

  get label(): string {
    return this._label;
  }

  get field(): string {
    return this._field;
  }

  get textAreaRows(): number {
    return this._textAreaRows;
  }

  get comboboxService(): ComboBoxService {
    return this._comboboxService;
  }

  get constantName(): string {
    return this._constantName;
  }
}

export class InputComboItem {
  public label: string;
  public value: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  /* Immutable fields component */
  @Input() private inputField: InputField;

  /* Common mutable fields*/
  @Input() private loaded: boolean;
  @Input() private model: any;
  @Input() private error: any;

  /* Enums */
  inputType: any = InputType;

  /* Date fields */
  calendarIcon = faCalendarAlt;
  timeIcon = faClock;
  dateIcon = faCalendar;
  showTimePicker = false;
  dateModel: NgbDate;
  timeModel: NgbTime;

  /* Combo box fields*/
  comboBoxLoaded = false;
  items: InputComboItem[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.inputField.type === InputType.COMBO) {
      const uuid = this.model[this.inputField.field];
      if (uuid !== undefined) {
        this.inputField.comboboxService.getByIdComboItem(uuid)
          .subscribe(cbi => {
            this.items.push(cbi);
            this.comboBoxLoaded = true;
          });
      } else {
        this.comboBoxLoaded = true;
      }
    } else if (this.inputField.type === InputType.COMBO_CONST) {
      this.inputField.comboboxService.getAllComboItem(this.inputField.constantName).subscribe(inputItems => {
        this.items = inputItems;
      }, error => {
        console.log('Combo const error occurred.');
        console.log(error);
      }, () => {
        this.comboBoxLoaded = true;
      });
    }
  }

  /* Calendar functions */
  switchDateTimeSelector($event) {
    this.showTimePicker = !this.showTimePicker;
    $event.stopPropagation();
  }

  changeCalendar() {
    if (this.dateModel && this.timeModel) {
      this.model[this.inputField.field] =
        new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day, this.timeModel.hour, this.timeModel.minute);
    } else if (this.dateModel) {
      this.model[this.inputField.field] = new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day);
    }
  }

  /* Combo box functions */
  searchModels(event) {
    const s: string = event.term;
    this.inputField.comboboxService.searchComboItem(new Search(s)).subscribe(value => {
      this.items = value;
    });
  }

  customSearchFn() {
    return true;
  }

}
