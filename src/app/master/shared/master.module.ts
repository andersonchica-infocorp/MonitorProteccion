import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MasterRouting } from './master.rounting';
import { ApplicationService } from '../../services/application.service';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { ApplicationListComponent } from '../application/application-list/application-list.component';
import { ApplicationComponent } from '../application/application/application.component';
import { ApplicationDetailComponent } from '../application/application-detail/application-detail.component';

import { ServiceListComponent } from '../service/service-list/service-list.component';
import { ServiceDetailComponent } from '../service/service-detail/service-detail.component';
import { ServiceComponent } from '../service/service/service.component';
import { ApplicationComponentService } from './application.component.service';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';

import { ServiceComponentService } from './service.component.service';

import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MasterRouting,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    DataTableModule,
    SharedModule,
    PaginatorModule
  ],
  declarations: [
    ApplicationListComponent,
    ApplicationComponent,
    ApplicationDetailComponent,
    ServiceListComponent,
    ServiceComponent,
    ServiceDetailComponent
  ],
  providers: [
    ApplicationService,
    ApplicationComponentService,
    ServiceComponentService
  ],
  entryComponents: [
    ServiceDetailComponent
  ]
})
export class MasterModule { }
