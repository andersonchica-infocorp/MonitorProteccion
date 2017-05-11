export class Transaction {

	constructor(
		public id: number,
		public msgId: string,
		public start: Date,
		public end: Date,
		public errorType: string,
		public errorMessage: string,
		public transactions?: Transaction[]) { }
}
