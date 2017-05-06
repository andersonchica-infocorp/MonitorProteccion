import { Injectable } from '@angular/core';
import { User } from '../Model/user.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';

@Injectable()
export class UserService {

  private users: User[] = [
    { Id: 1, Name: 'User 1', },
    { Id: 2, Name: 'User 2', },
    { Id: 3, Name: 'User 3', },
    { Id: 4, Name: 'User 4', }
  ];


  constructor(private http: Http) {

  }

  getUsersAdministrators(): Observable<User[]> {

    var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url,{
      headers
    }).map(response => {
      return this.users;
    });
  }

  getUsersSystem(user: string ): Observable<User[]> {

    var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url,{
      headers
    }).map(response => {
      return this.users;
    });
  }
}