import { Transaction } from './transaction.model';


export class TransactionChild {

	constructor(
		public id: number,
		public transactions?: Transaction[]) { }
}
