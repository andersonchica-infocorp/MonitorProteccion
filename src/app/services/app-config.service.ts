import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

	static get config() {
		return {
			webApiUrl: 'http://localhost/Aco.Aprendizaje.WebApi/api'
		};
	}
}
