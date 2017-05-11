import { Injectable } from '@angular/core';
import { User } from '../Model/user.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';

@Injectable()
export class UserService {

  private users: User[] = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' }
  ];

  private usersInsert: User[] = [
    { id: 5, name: 'userInsert 1', },
    { id: 6, name: 'userInsert 2', },
    { id: 7, name: 'userInsert 3', },
    { id: 8, name: 'userInsert 4', }
  ];


  constructor(private http: Http) {

  }

  getUsersAdministrators(): Observable<User[]> {

    var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return this.users;
    });
  }

  getUsersSystem(user: string): Observable<User[]> {

    var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return this.usersInsert;
    });
  }

  addUserAdministrator(user: User): Observable<string> {
    var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      this.users.push(user);
      return "success";
    });
  }

  deleteUser(user: User): Observable<boolean> {
    var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      this.users = this.users.filter(item => item.name.indexOf(user.name) != 0);
      return true;
    });
  }
}
