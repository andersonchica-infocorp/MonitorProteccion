import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationListComponent } from '../application/application-list/application-list.component';
import { ApplicationComponent } from '../application/application/application.component';
import { ApplicationDetailComponent } from '../application/application-detail/application-detail.component';

import { AuthManager } from '../../authentication/shared/authentication.manage';

const registerRoutes: Routes = [
  { path: 'master/application',  component: ApplicationComponent, canActivate: [AuthManager],
  	children:[
  		{ path:'', component: ApplicationListComponent }
  	],
  },
  {
    path: 'master/application/new', component: ApplicationComponent,
    children: [
      {
        path: '',
        component: ApplicationListComponent,
      },
      {
        path: '',
        component: ApplicationDetailComponent,
        outlet: 'details'
      }
    ]
  },
  {
    path: 'master/application/:id', component: ApplicationComponent,
    children: [
      {
        path: '',
        component: ApplicationListComponent,
      },
      {
        path: '',
        component: ApplicationDetailComponent,
        outlet: 'details',
      }
    ]
  }
];

export const MasterRouting: ModuleWithProviders = RouterModule.forChild(registerRoutes);
