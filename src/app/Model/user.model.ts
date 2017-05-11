import  { Application } from './application.model';


export class User {

	constructor(
		public id: number,
		public name: string,
		public consumers?: string[],
		public applications?: Application[]
	) { }
}
