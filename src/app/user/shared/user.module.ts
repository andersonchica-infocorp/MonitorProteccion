import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { NG2D3Module } from 'ng2d3';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRouting } from './user.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

import { MaterialModule } from '@angular/material';

import { UserListAdminComponent } from '../user-list-admin/user-list-admin.component';
import { UserListResultComponent } from '../user-list-result/user-list-result.component';
import { UserComponent } from '../user/user.component';

import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRouting,
    BrowserAnimationsModule,
    MaterialModule,
    NG2D3Module,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    UserListAdminComponent,
    UserListResultComponent,
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
