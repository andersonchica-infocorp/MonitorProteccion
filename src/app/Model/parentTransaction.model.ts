import { Transaction } from './transaction.model';


export class ParentTransaction {

	constructor(
		public records: number,
		public transactions?: Transaction[]) { }
}
