import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NG2D3Module } from 'ng2d3';
import { MaterialModule } from '@angular/material';
import { AuthenticationModule } from './authentication/shared/authentication.module';
import { MasterModule } from './master/shared/master.module';
import { UserModule } from './user/shared/user.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { routing, appRoutingProviders }  from './app.routing';
import { ChartconceptComponent } from './concept/chartconcept/chartconcept.component';

import { AuthManager } from './authentication/shared/authentication.manage';
import { AuthService } from './authentication/shared/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartconceptComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NG2D3Module,
    MaterialModule,
    BrowserAnimationsModule,
    routing,
    AuthenticationModule,
    MasterModule,
    UserModule,
  ],
  providers: [AuthManager, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
