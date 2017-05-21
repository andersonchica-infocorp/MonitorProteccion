import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class AuthManager implements CanActivate {

	isAdmin: boolean;

	constructor(private router: Router) {

	}


	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.isAdmin = false;
		return true;
	}
}
