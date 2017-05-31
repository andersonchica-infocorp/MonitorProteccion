import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { AuthManager } from './authentication/shared/authentication.manage';

const appRoutes: Routes = [
	{
		path: '', component: LoginComponent, canActivate: [AuthManager],
	},
	{
		path: '**', component: LoginComponent, canActivate: [AuthManager],
	}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
