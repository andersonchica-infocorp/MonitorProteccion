import { Injectable } from '@angular/core';

@Injectable()

export class ConfigService {

	constructor() {

	}

	public get getAdalConfig(): any {

		return {

			tenant: 'ENTER YOUR TENANT ID',

			clientId: 'ENTER YOUR CLIENT ID',

			redirectUri: window.location.origin + '/',

			postLogoutRedirectUri: window.location.origin + '/'

		};

	}

} 