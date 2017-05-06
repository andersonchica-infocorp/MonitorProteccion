import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { NG2D3Module } from 'ng2d3';
import { MaterialModule } from '@angular/material';
import { AuthenticationModule } from './authentication/shared/authentication.module';
import { MasterModule } from './master/shared/master.module';
import { UserModule } from './user/shared/user.module';
import { ReportModule } from './report/shared/report.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { routing, appRoutingProviders }  from './app.routing';
import { ChartconceptComponent } from './concept/chartconcept/chartconcept.component';

import { AuthManager } from './authentication/shared/authentication.manage';
import { AuthService } from './authentication/shared/authentication.service';
import {TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate/ng2-translate';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, '/assets/globalization/i18n', '.json');
}

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
    ReportModule,
    TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        }),
  ],
  providers: [AuthManager, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(translate: TranslateService) {
          // this language will be used as a fallback when a translation isn't found in the current language
          translate.setDefaultLang('es');

           // the lang to use, if the lang isn't available, it will use the current loader to get them
          translate.use('es');
      }
}
