export class Transaction {

	constructor(
		public Id: number,
		public ApplicationId: number,
		public ServiceId: number,
		public Consumer: string,
		public MessageId: number,
		public InitialDate?: Date,
		public FinalDate?: Date,
		public Transactions?: Transaction[]) { }
}
