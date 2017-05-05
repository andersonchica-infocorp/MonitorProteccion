import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListAdminComponent } from '../user-list-admin/user-list-admin.component';
import { UserListResultComponent } from '../user-list-result/user-list-result.component';
import { UserComponent } from '../user/user.component';

import { AuthManager } from '../../authentication/shared/authentication.manage';

const registerRoutes: Routes = [
  { path: 'user/admin',  component: UserComponent, canActivate: [AuthManager] },
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(registerRoutes);
