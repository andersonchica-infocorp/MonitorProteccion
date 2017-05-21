import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetryRouting } from './retry.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';

import { MaterialModule, MdNativeDateModule, ɵs as MD_DATE_FORMATS, ɵv as MdDateFormats } from '@angular/material';

import { AdminRetryComponent } from '../admin-retry/admin-retry.component';
import { RetryHistoryComponent } from '../retry-history/retry-history.component';

import { TranslateModule } from 'ng2-translate/ng2-translate';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { AceEditorModule } from 'ng2-ace-editor';
import { ModalXmlComponent } from '../modal-xml/modal-xml.component';

const PUTO_DATE_FORMATS: MdDateFormats = {
  parse: {
    dateInput: null,
  },
  display: {
    dateInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
    monthYearLabel: {year: 'numeric', month: 'long'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RetryRouting,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    DataTableModule,
    SharedModule,
    PaginatorModule,
    AceEditorModule,
    MdNativeDateModule
  ],
  declarations: [
    AdminRetryComponent,
    RetryHistoryComponent,
    ModalXmlComponent,
  ],
  providers: [
    UserService,
    TransactionService,
    {provide: MD_DATE_FORMATS, useValue: PUTO_DATE_FORMATS}
  ],
  entryComponents: [
    ModalXmlComponent
  ]
})
export class RetryModule {}

