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
import { BatchTransactionComponent } from '../batch-transaction/batch-transaction.component';
import { ServiceDetailComponent } from '../../master/service/service-detail/service-detail.component';

import { AdminRetryCancelContainerComponent } from '../admin-retry-cancel-container/admin-retry-cancel-container.component';
import { AdminRetryCancelSelectStateComponent } from '../admin-retry-cancel-select-state/admin-retry-cancel-select-state.component';
import { AdminRetryCancelEditXmlComponent } from '../admin-retry-cancel-edit-xml/admin-retry-cancel-edit-xml.component';
import { AdminRetryCancelFailFormComponent } from '../admin-retry-cancel-fail-form/admin-retry-cancel-fail-form.component';

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
    BatchTransactionComponent,
    AdminRetryCancelContainerComponent,
    AdminRetryCancelSelectStateComponent,
    AdminRetryCancelEditXmlComponent,
    AdminRetryCancelFailFormComponent
  ],
  providers: [
    UserService,
    TransactionService,
    
  ],
  entryComponents: [
    ModalXmlComponent,
    ServiceDetailComponent
  ]
})
export class RetryModule {}
