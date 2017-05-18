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

  updateService(service: Service, applicationId: number) {
    console.log(service);
    var url = `${AppConfigService.config.webApiUrl}/serviceupdate`;
    var headers = new Headers();
    var data = "app=" + applicationId +
      this.constructParam("url", service.invokeUrl) +
      this.constructParam("timeout", service.invokeTimeout) +
      this.constructParam("retryCount", service.retryCount) +
      this.constructParam("retryDelay", service.retryDelay) +
      this.constructParam("callbackEnabled", service.reqCallback) +
      this.constructParam("callBackStatus", service.callBackStatus) +
      this.constructParam("verCode", service.verCode) +
      this.constructParam("verCodeUrl", service.verCodeUrl) +
      this.constructParam("verCodeTimeout", service.verCodeTimeut);

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json; charset=utf-8');
    return this.http.post(url,
      data,
      { headers }
    ).map(response => {
      return response.text();
    });
  }

  private constructParam(parameter: string, value) {
    return "&" + parameter + "=" + value;

  }
}
