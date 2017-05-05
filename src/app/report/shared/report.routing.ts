import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportActualComponent } from '../report-actual/report-actual.component';
import { ReportHistoryComponent } from '../report-history/report-history.component';

import { AuthManager } from '../../authentication/shared/authentication.manage';

const registerRoutes: Routes = [
  { path: 'report/history',  component: ReportHistoryComponent, canActivate: [AuthManager] },
];

export const ReportRouting: ModuleWithProviders = RouterModule.forChild(registerRoutes);
