import { Service } from './service.model';

export class Application {

	constructor(
		public id: number,
		public name: string,
		public services?: Service[],
	){}
}
