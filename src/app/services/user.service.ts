import { Injectable } from '@angular/core';
import { User } from '../Model/user.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';

@Injectable()
export class UserService {

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
            return [];
        }).catch((err: Response) => {
            let details = err.json();
            return Observable.throw(details);
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
            return [];
        }).catch((err: Response) => {
            let details = err.json();
            return Observable.throw(details);
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
            [];
            return "success";
        }).catch((err: Response) => {
            let details = err.json();
            return Observable.throw(details);
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
            []
            return true;
        }).catch((err: Response) => {
            let details = err.json();
            return Observable.throw(details);
        });
    }

    login(userName: string, password: string) {
        var url = `${AppConfigService.config.webApiUrl}/login`;
        var headers = new Headers();
        var data = "user=" + userName + "&password=" + password;

        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json; charset=utf-8');

        return this.http.post(url,
            data,
            { headers }
        ).map(response => {
            return {
                error: "",
                status: response.json()
            };
        }).catch((err: Response) => Observable.of({
            error: err.text(),
            status: "error"
        }));
    }

    getUsers(): Observable<any> {
        var url = `${AppConfigService.config.webApiUrl}/users`;
        var headers = new Headers();

        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/json; charset=utf-8');

        return this.http.get(url, {
            headers
        }).map(response => {
            return response.json();
        }).catch((err: Response) => {
            let details = err.json();
            return Observable.throw(details);
        });
    }

    getApplicationsUser(user : User): Observable<any>{
      var url = `${AppConfigService.config.webApiUrl}/userApplications`;
        var headers = new Headers();

        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/json; charset=utf-8');

        return this.http.get(url, {
            headers
        }).map(response => {
            return response.json();
        }).catch((err: Response) => {
            let details = err.json();
            return Observable.throw(details);
        });
    }
}
