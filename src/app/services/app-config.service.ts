import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

	static get config() {
		return {
			//webApiUrl: 'http://192.168.1.165:9081/reintentos_war_cert/api/rest'
			webApiUrl: 'assets/data.response.json'
		};
	}
}
