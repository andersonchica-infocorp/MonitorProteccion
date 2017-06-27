import {Injectable} from '@angular/core';

declare var env: any;

@Injectable()
export class SecretService {

    public get adalConfig(): any {
        return {
            tenant: env.adal.tenant, 
            clientId: env.adal.clientId,
            redirectUri: env.adal.redirectUri,
            postLogoutRedirectUri: env.adal.postLogoutRedirectUri, 
            isAngular: true
        };
    }
}