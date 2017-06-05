import { Injectable } from '@angular/core';

declare var env: any;

@Injectable()
export class AppConfigService {

	static get config() {
		return {
			webApiUrl: env.apiBaseUrl
			//webApiUrl: 'http://reintentos.sofka.com.co:19210/reintentos/api/rest'
			//webApiUrl: 'http://localhost:9080/reintentos/api/rest'
			//webApiUrl: 'http://10.235.16.100:9080/reintentos/api/rest'
			//webApiUrl: 'assets/data.response.json'
			//webApiUrl:'http://localhost/Aco.Mandalas.Marmoleria.Api/api',http://
		};
	}
}
