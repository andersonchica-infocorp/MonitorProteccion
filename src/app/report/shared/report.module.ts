import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportRouting } from './report.routing';

import { MaterialModule } from '@angular/material';

import { ReportComponent } from '../report/report.component';
import { ReportActualComponent } from '../report-actual/report-actual.component';
import { ReportHistoryComponent } from '../report-history/report-history.component';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReportRouting,
    BrowserAnimationsModule,
    MaterialModule,
    TranslateModule,  
    ChartsModule  
  ],
  declarations: [
    ReportActualComponent,
    ReportHistoryComponent,
    ReportComponent,    
  ],
  providers: [
  ]
})
export class ReportModule { }
