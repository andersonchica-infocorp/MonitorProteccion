import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { AuthenticationModule } from './authentication/shared/authentication.module';
import { MasterModule } from './master/shared/master.module';
import { ReportModule } from './report/shared/report.module';
import { RetryModule } from './retry/shared/retry.module';
import { UserModule } from './user/shared/user.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { routing, appRoutingProviders } from './app.routing';
import { ChartconceptComponent } from './concept/chartconcept/chartconcept.component';

import { AuthManager } from './authentication/shared/authentication.manage';
import { AuthService } from './authentication/shared/authentication.service';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate/ng2-translate';
import { ControlsModule } from './controls/shared/controls.module';

import {AdalService} from 'ng2-adal/core';
import {SecretService} from './services/adal.config.service';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/globalization/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ChartconceptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    routing,
    AuthenticationModule,
    MasterModule,
    ReportModule,
    RetryModule,
    ControlsModule,
    UserModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
  ],
  providers: [AuthManager, AuthService, AdalService, SecretService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(translate: TranslateService, private adalService: AdalService, private secretService: SecretService) {
    this.adalService.init(this.secretService.adalConfig);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('es');
  }
}
