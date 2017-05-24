import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConfigService } from '../../services/app-config.service';
import { Observable } from 'rxJs';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class AuthManager implements CanActivate {

	 private isAdmin: boolean;
	 private isLogin: boolean;

	constructor(private router: Router, private http: Http) {
this.isAdmin = true;
this.isLogin = true;
	}


	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.isAdmin = false;
		return true;
	}

	getIsAdmin(){
		return this.isAdmin;
	}

	getIsLogin(){
		return this.isLogin;
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
}
