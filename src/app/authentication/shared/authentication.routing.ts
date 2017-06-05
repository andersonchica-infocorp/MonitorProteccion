import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { AuthManager } from './authentication.manage';

const registerRoutes: Routes = [
  { path: 'authentication/login',  component: LoginComponent },
];

export const AuthenticationRouting: ModuleWithProviders = RouterModule.forChild(registerRoutes);
