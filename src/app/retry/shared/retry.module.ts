import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetryRouting } from './retry.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

import { MaterialModule } from '@angular/material';

import { AdminRetryComponent } from '../admin-retry/admin-retry.component';

import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RetryRouting,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    AdminRetryComponent
  ],
  providers: [
    UserService
  ]
})
export class RetryModule { }
