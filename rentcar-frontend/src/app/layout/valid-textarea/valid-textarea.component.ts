import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-valid-textarea',
  templateUrl: './valid-textarea.component.html',
  styleUrls: ['./valid-textarea.component.css']
})
export class ValidTextareaComponent implements OnInit {

  @Input() model: any;
  @Input() error: any;
  @Input() rows: number;
  @Input() field: string;
  @Input() tittle: string;

  constructor() { }

  ngOnInit() {
  }

}
