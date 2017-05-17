import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRetryComponent } from '../admin-retry/admin-retry.component';
import { RetryHistoryComponent } from '../retry-history/retry-history.component';

import { AuthManager } from '../../authentication/shared/authentication.manage';

const retryRoutes: Routes = [
  {
    path: 'retry', component: AdminRetryComponent, canActivate: [AuthManager],
  },
  {
    path: 'retry/history', component: RetryHistoryComponent, canActivate: [AuthManager],
  }
];

export const RetryRouting: ModuleWithProviders = RouterModule.forChild(retryRoutes);
