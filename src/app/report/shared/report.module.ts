import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { NG2D3Module } from 'ng2d3';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportRouting } from './report.routing';

import { MaterialModule } from '@angular/material';

import { ReportComponent } from '../report/report.component';
import { ReportActualComponent } from '../report-actual/report-actual.component';
import { ReportHistoryComponent } from '../report-history/report-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReportRouting,
    BrowserAnimationsModule,
    MaterialModule,
    NG2D3Module,
  ],
  declarations: [
    ReportActualComponent,
    ReportHistoryComponent,
    ReportComponent
  ],
  providers: [
  ]
})
export class ReportModule { }
