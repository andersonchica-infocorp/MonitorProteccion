import  { Application } from './application.model';


export class User {

	constructor(
		public id: number,
		public name: string,
		public opration: string,
		public login:string,
		public admin:boolean,
		public consumers?: string[],
		public applications?: Application[]
	) { }
}
