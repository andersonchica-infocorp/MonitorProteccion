import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationListComponent } from '../application/application-list/application-list.component';
import { ApplicationComponent } from '../application/application/application.component';

import { AuthManager } from '../../authentication/shared/authentication.manage';

const registerRoutes: Routes = [
  { path: 'master/application',  component: ApplicationListComponent, canActivate: [AuthManager] },
];

export const MasterRouting: ModuleWithProviders = RouterModule.forChild(registerRoutes);
