import { Injectable } from '@angular/core';
import { User } from '../Model/user.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';

import { Dashboard } from '../Model/dashboard.model';

@Injectable()
export class DashboardService {

  constructor(private http: Http) {

  }

  getDashboard(): Observable<Dashboard> {

    var url = `${AppConfigService.config.webApiUrl}/dashboard`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return response.json() as Dashboard;
    });
  }
}
