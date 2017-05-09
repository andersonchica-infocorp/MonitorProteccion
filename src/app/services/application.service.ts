import { Injectable } from '@angular/core';
import { Application } from '../Model/application.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';
import { Service } from '../Model/service.model';

@Injectable()
export class ApplicationService {

  private applications: Application[] = [
    { Id: 1, Name: 'Application 1', },
    { Id: 2, Name: 'Application 2', },
    { Id: 3, Name: 'Application 3', },
    { Id: 4, Name: 'Application 4', }
  ];

  private services: Service[] = [
    { Id: 1, Name: 'Service 1', },
    { Id: 2, Name: 'Service 2', },
    { Id: 3, Name: 'Service 3', },
    { Id: 4, Name: 'Service 4', }
  ];


  constructor(private http: Http) {

  }

  getApplications(): Observable<Application[]> {

    var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return this.applications;
    });
  }

getServices(): Observable<Service[]>{
  var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return this.services;
    });
}

  /*dragonsDetails(id): Dragon {
    let list = this.dragons.filter(d => d.id === id);
    return list.length ? list[0] : null;
  }

  dragonDelete(id: number) {
    this.dragons = this.dragons.filter(d => d.id !== id);
  }

  dragonAdd(name: string): number {
    let newId = 1 + this.dragons.map(d => d.id).reduce((a, b) => Math.max(a, b));
    this.dragons.push({ id: newId, name: name} as Dragon);
    return newId;
  }

  dragonUpdate(id: number, name: string) {
    let dragons: Dragon[] = this.dragons.filter(d => d.id === id);
    if (dragons.length) {
      dragons[0].name = name;
    }
  }*/
}
