import { Injectable } from '@angular/core';
import { User } from '../Model/user.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';
import { AuthManager } from '../authentication/shared/authentication.manage';
import { MasterResponse } from '../Model/master.response.model';
import { UserApplicationsResponse } from '../Model/userApplicationsResponse.model';

@Injectable()
export class UserService {

    constructor(private http: Http, public authManager: AuthManager) {

    }

    getUsersAdministrators(): Observable<User[]> {

        var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
        var headers = new Headers();
        var user = this.authManager.getCredentials();

        headers.append('authorization', JSON.stringify(user));
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
        var data = this.authManager.getCredentials();

        headers.append('authorization', JSON.stringify(data));
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
        var data = this.authManager.getCredentials();

        headers.append('authorization', JSON.stringify(data));
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
        var data = this.authManager.getCredentials();

        headers.append('authorization', JSON.stringify(user));
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
        var user = this.authManager.getCredentials();

        headers.append('authorization', JSON.stringify(user));
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

    getUsers(): Observable<MasterResponse> {
        var url = `${AppConfigService.config.webApiUrl}/master`;
        var headers = new Headers();
        var user = this.authManager.getCredentials();

        headers.append('authorization', JSON.stringify(user));
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

    getApplicationsUser(user: User): Observable<UserApplicationsResponse> {
        var url = `${AppConfigService.config.webApiUrl}/userapplications?user=` + user.login;
        var headers = new Headers();
        var data = this.authManager.getCredentials();

        headers.append('authorization', JSON.stringify(data));
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

    saveUserApplications(applications: string, userName: string) {
        var url = `${AppConfigService.config.webApiUrl}/updateuserapps`;
        var headers = new Headers();
        var data = "login=" + userName + "&applications=" + applications;
        var user = this.authManager.getCredentials();

        headers.append('authorization', JSON.stringify(user));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json; charset=utf-8');

        return this.http.post(url,
            data,
            { headers }
        ).map(response => {
            return {
                
                status: response.text()
            }
        }).catch((err: Response) => Observable.of({
            
            error: err.text()
        }));
    }
}
}
