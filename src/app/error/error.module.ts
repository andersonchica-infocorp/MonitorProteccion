import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error/error.component';
import { MaterialModule, MdNativeDateModule, ɵs as MD_DATE_FORMATS, ɵv as MdDateFormats } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule,
    MaterialModule
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
