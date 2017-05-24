import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from '../../user/user/user.component';

import { AuthManager } from '../../authentication/shared/authentication.manage';

const registerRoutes: Routes = [

  {
    path: 'user/admin', component: UserComponent, canActivate: [AuthManager],
  }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(registerRoutes);
