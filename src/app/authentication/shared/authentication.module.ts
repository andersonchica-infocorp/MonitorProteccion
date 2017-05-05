import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { NG2D3Module } from 'ng2d3';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationRouting } from './authentication.routing';

//import { MaterialModule } from '@angular/material';


import { LoginComponent } from '../login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRouting,
    BrowserAnimationsModule,
    //MaterialModule,
    NG2D3Module,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
  ]
})
export class AuthenticationModule { }
