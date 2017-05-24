import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationRouting } from './authentication.routing';

import { MaterialModule } from '@angular/material';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { LoginComponent } from '../login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRouting,
    BrowserAnimationsModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
  ]
})
export class AuthenticationModule { }
