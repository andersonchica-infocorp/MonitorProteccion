import { Application } from './application.model';


export class UserApplicationsResponse {

	constructor(
		public applications?: Application[]) { }
}
