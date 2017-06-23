import {Injectable} from '@angular/core';

@Injectable()
export class SecretService {

    public get adalConfig(): any {
        return {
            tenant: 'f47dcce4-02e7-4d88-a659-a2d0bbe170e7',
            clientId: 'a4029d41-0564-41a4-92e8-cb0cb11e2286',
            redirectUri: 'http://vosdcbog04:9090/reintentos/',
            postLogoutRedirectUri: 'http://vosdcbog04:9090/reintentos' + '/',
            isAngular: true
        };
    }
}