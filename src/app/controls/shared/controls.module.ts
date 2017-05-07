import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';

import { SideNavListComponent } from '../side-nav-list/side-nav-list.component';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [
    SideNavListComponent,
  ],
  providers: [
  ]
})
export class ControlsModule { }
