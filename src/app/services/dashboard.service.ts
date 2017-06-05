import { Injectable } from '@angular/core';
import { User } from '../Model/user.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';

import { Dashboard } from '../Model/dashboard.model'
import { AuthManager } from '../authentication/shared/authentication.manage';

@Injectable()
export class DashboardService {

  constructor(private http: Http, public authManager: AuthManager) {

  }

  getDashboard(): Observable<Dashboard> {

    var url = `${AppConfigService.config.webApiUrl}/dashboard`;
    var headers = new Headers();
    var data = this.authManager.getCredentials();

    headers.append('Authorization', JSON.stringify(data));
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return response.json() as Dashboard;
    }).catch((err:Response) => {
            let details = err.json();
            return Observable.throw(details);
         });
  }
}
