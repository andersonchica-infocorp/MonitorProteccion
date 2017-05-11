import { Service } from './service.model';

export class Application {

	constructor(
		public Id: number,
		public Name: string,
		public Description?: string,
		public Services?: Service[],
	){}
}
