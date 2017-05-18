export class Service {

	constructor(
		public id: number,
		public name: string,
		public genResponse: string,
		public invokeTimeout: number,
		public invokeUrl: string,
		public msgId: string,
		public opration:string,
		public parseResponse:string,
		public reqCallback: boolean,
		public retryCount: number,
		public retryDelay: number,
		public verCode:string,
		public verCodeTimeut?: number,
		public verCodeUrl?:string,
		public callBackStatus?: string,
		) { }
}
