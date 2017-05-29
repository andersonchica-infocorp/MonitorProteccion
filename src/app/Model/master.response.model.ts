import { Application } from './application.model';
import { User } from './user.model';

export class MasterResponse {

	constructor(
		public applications: Application[],
		public users: User[]
	){}
}
