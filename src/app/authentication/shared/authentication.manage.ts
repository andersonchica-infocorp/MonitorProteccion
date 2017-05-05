import {Injectable} from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()

export class AuthManager implements CanActivate {
    constructor(private router: Router) {

    }


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true;
    }
}
