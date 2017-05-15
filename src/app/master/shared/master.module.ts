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

import { ServiceListComponent } from '../Service/Service-list/Service-list.component';
import { ServiceComponent } from '../Service/Service/Service.component';
import { ServiceDetailComponent } from '../Service/Service-detail/Service-detail.component';
import { ApplicationComponentService } from './application.component.service';

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
    TranslateModule
  ],
  declarations: [
    ApplicationListComponent,
    ApplicationComponent,
    ApplicationDetailComponent,
    ServiceListComponent,
    ServiceDetailComponent,
    ServiceComponent
  ],
  providers: [
    ApplicationService,
    ApplicationComponentService,
    ServiceComponentService
  ]
})
export class MasterModule { }
