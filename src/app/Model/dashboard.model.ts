import { Actual } from './actual.model';
import { History } from './history.model';

export class Dashboard {

	constructor(
		public actual: Actual[],
		public history: History[],
	) { }
}
