import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRetryComponent } from '../admin-retry/admin-retry.component';
import { RetryHistoryComponent } from '../retry-history/retry-history.component';

import { AuthManager } from '../../authentication/shared/authentication.manage';

import { AdminRetryCancelContainerComponent } from '../admin-retry-cancel-container/admin-retry-cancel-container.component';

const retryRoutes: Routes = [
	{
		path: 'retry', component: AdminRetryComponent, canActivate: [AuthManager],
	},
	{
		path: 'retry/history', component: RetryHistoryComponent, canActivate: [AuthManager],
	},
	{
		path: 'retry/test', component: AdminRetryCancelContainerComponent,
	}
];

export const RetryRouting: ModuleWithProviders = RouterModule.forChild(retryRoutes);
