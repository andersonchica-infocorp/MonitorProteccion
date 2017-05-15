import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationListComponent } from '../application/application-list/application-list.component';
import { ApplicationComponent } from '../application/application/application.component';
import { ApplicationDetailComponent } from '../application/application-detail/application-detail.component';

import { ServiceListComponent } from '../Service/Service-list/Service-list.component';
import { ServiceComponent } from '../Service/Service/Service.component';
import { ServiceDetailComponent } from '../Service/Service-detail/Service-detail.component';

import { AuthManager } from '../../authentication/shared/authentication.manage';

const registerRoutes: Routes = [
  {
    path: 'master/application', component: ApplicationComponent, canActivate: [AuthManager],
    children: [
      { path: '', component: ApplicationListComponent }
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
  },



  {
    path: 'master/service', component: ServiceComponent, canActivate: [AuthManager],
    children: [
      { path: '', component: ServiceListComponent }
    ],
  },
  {
    path: 'master/service/new', component: ServiceComponent,
    children: [
      {
        path: '',
        component: ServiceListComponent,
      },
      {
        path: '',
        component: ServiceDetailComponent,
        outlet: 'details'
      }
    ]
  },
  {
    path: 'master/service/:id', component: ServiceComponent,
    children: [
      {
        path: '',
        component: ServiceListComponent,
      },
      {
        path: '',
        component: ServiceDetailComponent,
        outlet: 'details',
      }
    ]
  }
];

export const MasterRouting: ModuleWithProviders = RouterModule.forChild(registerRoutes);
