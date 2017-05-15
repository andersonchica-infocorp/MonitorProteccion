import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

	static get config() {
		return {
			webApiUrl: 'http://192.168.1.165:9080/reintentos/api/rest'
			//webApiUrl: 'assets/data.response.json'
			//webApiUrl:'http://localhost/Aco.Mandalas.Marmoleria.Api/api',
		};
	}
}
