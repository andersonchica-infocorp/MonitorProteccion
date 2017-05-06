import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { NG2D3Module } from 'ng2d3';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MasterRouting } from './master.rounting';
import { ApplicationService } from '../../services/application.service';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { ApplicationListComponent } from '../application/application-list/application-list.component';
import { ApplicationComponent } from '../application/application/application.component';
import { ApplicationDetailComponent } from '../application/application-detail/application-detail.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MasterRouting,
    BrowserAnimationsModule,
    MaterialModule,
    NG2D3Module,
    ReactiveFormsModule
  ],
  declarations: [
    ApplicationListComponent,
    ApplicationComponent,
    ApplicationDetailComponent
  ],
  providers: [
    ApplicationService
  ]
})
export class MasterModule { }
