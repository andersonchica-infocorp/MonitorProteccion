import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report/report/report.component';
import { AuthManager } from './authentication/shared/authentication.manage';

const appRoutes: Routes = [
	{
		path: '', component: ReportComponent, canActivate: [AuthManager],
	},
	{
		path: '**', component: ReportComponent, canActivate: [AuthManager],
	}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
