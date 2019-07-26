import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ws: any;
  name: string;
  date: any;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pl');
  }

  ngOnInit(): void {}





}
