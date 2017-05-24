import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRouting } from './user.routing';
import { ApplicationService } from '../../services/application.service';
import { ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from '../../user/user/user.component';
import { UserListComponent } from '../../user/user-list/user-list.component';
import { UserApplicationsComponent } from '../../user/user-applications/user-applications.component';

import { TranslateModule } from 'ng2-translate/ng2-translate';
import { MaterialModule } from '@angular/material';
import { UserService } from '../../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRouting,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserApplicationsComponent,
  ],
  providers: [
    UserService,
  ],
  entryComponents: [
  ]
})
export class UserModule { }
