import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRetryComponent } from '../admin-retry/admin-retry.component';

import { AuthManager } from '../../authentication/shared/authentication.manage';

const retryRoutes: Routes = [
  {
    path: 'retry', component: AdminRetryComponent, canActivate: [AuthManager],
  },
];

export const RetryRouting: ModuleWithProviders = RouterModule.forChild(retryRoutes);
