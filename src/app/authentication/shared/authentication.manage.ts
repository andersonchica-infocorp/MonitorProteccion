import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConfigService } from '../../services/app-config.service';
import { Observable } from 'rxJs';
import { User } from '../../Model/user.model';
import { MdSnackBar } from '@angular/material';
import {AdalService } from 'ng2-adal/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class AuthManager implements CanActivate {

	public isAdmin: boolean;
	private isLogin: boolean;

	private userName: string;
	private password: string;

	constructor(private router: Router, private http: Http, public snackBar: MdSnackBar, private adalService: AdalService) {
		this.isAdmin = false;
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

debugger;
		this.adalService.handleWindowCallback();
        if (!this.adalService.userInfo.isAuthenticated) {
		    this.adalService.login();   
		    return false;     
        }

        let user = this.adalService.userInfo.userName.split('@')[0];
        this.login(user, "");

		return true;
	}

	getIsAdmin() {
		return this.isAdmin;
	}

	getIsLogin() {
		return this.userName;
	}

	getCredentials() {
		if (!this.isLogin) {
			this.snackBar.open("Usuario No se encuentra logueado, por favor ingrese al sistema.", 'Error', {
				duration: 7000,
			});

			this.router.navigate(['/authentication/login/']);
		}
		else {
			return {
				login: this.userName,
				password: this.password
			};
		}
	}

	logOut() {
		this.userName = "";
		this.isLogin = false;
		this.isAdmin = false;
		this.adalService.logOut();
	}

	login(userName: string, password: string) {
		var url = `${AppConfigService.config.webApiUrl}/login`;
		var headers = new Headers();
		//var data = "user=" + userName + "&password=" + password;

		this.userName = userName;
		this.password = password;

		var url = `${AppConfigService.config.webApiUrl}/applications`;
		var headers = new Headers();
		var data = {
			login: this.userName,
			password: this.password
		};

		headers.append('authorization', JSON.stringify(data));
		headers.append('Content-Type', 'application/json; charset=utf-8');
		headers.append('Accept', 'application/json; charset=utf-8');

		return this.http.get(url, {
			headers
		}).map(response => {
			let user = response.json() as User;
			if (user && user.applications && user.applications.length > 0) {
				this.isLogin = true;
				this.isAdmin = user.admin;
			}
		}).catch((err: Response) => {
			let details = err.json();
			return Observable.throw(details);
		});
	}
}
