import { Injectable } from '@angular/core';
import { Application } from '../Model/application.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';
import { Service } from '../Model/service.model';
import { User } from '../Model/user.model';
import { ServicesApplication } from '../Model/services.application.model'



@Injectable()
export class ApplicationService {

  private applications: Application[] = [
    { id: 1, name: 'Application 1', },
    { id: 2, name: 'Application 2', },
    { id: 3, name: 'Application 3', },
    { id: 4, name: 'Application 4', }
  ];

  private services: Service[] = [
    { id: 1, name: 'Service 1', },
    { id: 2, name: 'Service 2', },
    { id: 3, name: 'Service 3', },
    { id: 4, name: 'Service 4', }
  ];


  constructor(private http: Http) {

  }

  getUserData(): Observable<User> {

    var url = `${AppConfigService.config.webApiUrl}/applications`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      console.log(response.json());
      return response.json() as User;
    });
  }

  addService(serviceName: string): Observable<boolean> {
    var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return true;
    });
  }

  getServicesApplication(applicationId: number): Observable<ServicesApplication> {

    var url = `${AppConfigService.config.webApiUrl}/services?app=` + applicationId;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return response.json() as ServicesApplication;
    });
  }
}
