import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-valid-input',
  templateUrl: './valid-input.component.html',
  styleUrls: ['./valid-input.component.css']
})
export class ValidInputComponent implements OnInit, AfterViewInit {

  @Input() model: any;
  @Input() error: any;
  @Input() field: string;
  @Input() tittle: string;
  @Input() focusable = false;
  @ViewChild('validInputElement', {static: false}) ref: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.focusable) {
      this.ref.nativeElement.focus();
    }
  }

}
