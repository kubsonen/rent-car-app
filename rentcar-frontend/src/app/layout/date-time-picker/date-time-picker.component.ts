import {Component, Input, OnInit} from '@angular/core';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit {

  calendarIcon = faCalendarAlt;
  timeIcon = faClock;
  dateIcon = faCalendar;
  showTimePicker = false;

  @Input() label = 'Date time picker';
  @Input() error: any;
  @Input() model: any;
  @Input() field: string;

  dateModel: NgbDate;
  timeModel: NgbTime;

  constructor() {
  }

  ngOnInit() {
  }

  switchDateTimeSelector($event) {
    this.showTimePicker = !this.showTimePicker;
    $event.stopPropagation();
  }

  changeCalendar() {
    console.log(this.error);
    if (this.dateModel && this.timeModel) {
      this.model[this.field] =
        new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day, this.timeModel.hour, this.timeModel.minute);
    } else if (this.dateModel) {
      this.model[this.field] = new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day);
    }
  }

}
