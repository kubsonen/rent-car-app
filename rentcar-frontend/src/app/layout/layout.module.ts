import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TopbarComponent} from './topbar/topbar.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TableComponent} from './table/table.component';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ModalComponent} from './modal/modal.component';
import {ValidInputComponent} from './valid-input/valid-input.component';
import {FormsModule} from '@angular/forms';
import {FormComponent} from './form/form.component';
import {ListComponent} from './list/list.component';
import {ModalDirective} from './modal/modal.directive';
import {ComboBoxComponent} from './combo-box/combo-box.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ValidTextareaComponent} from './valid-textarea/valid-textarea.component';
import {ComboBoxConstantsComponent} from './combo-box-constants/combo-box-constants.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DateTimePickerComponent} from './date-time-picker/date-time-picker.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { TableColumnConfigComponent } from './table-column-config/table-column-config.component';

@NgModule({
  entryComponents: [TableColumnConfigComponent],
  declarations: [SidebarComponent, TopbarComponent, TableComponent, ModalComponent, ValidInputComponent,
    FormComponent, ListComponent, ModalDirective, ComboBoxComponent, ValidTextareaComponent, ComboBoxConstantsComponent,
    DateTimePickerComponent, InputFieldComponent, TableColumnConfigComponent],
  exports: [
    SidebarComponent,
    TopbarComponent,
    TableComponent,
    ModalComponent,
    ValidInputComponent,
    ListComponent,
    ComboBoxComponent,
    ValidTextareaComponent,
    ComboBoxConstantsComponent,
    DateTimePickerComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    FormsModule,
    NgSelectModule,
    NgbModule
  ]
})
export class LayoutModule {
}
