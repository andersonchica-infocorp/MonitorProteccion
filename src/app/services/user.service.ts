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

  private usersInsert: User[] = [
    { Id: 5, Name: 'userInsert 1', },
    { Id: 6, Name: 'userInsert 2', },
    { Id: 7, Name: 'userInsert 3', },
    { Id: 8, Name: 'userInsert 4', }
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
      this.users = this.users.filter(item => item.Name.indexOf(user.Name) != 0);
      return true;
    });
  }
}
