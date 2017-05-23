import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../Model/transaction.model';
import { TransactionService } from '../../services/transaction.service';


@Component({
	selector: 'app-batch-transaction',
	templateUrl: './batch-transaction.component.html',
	styleUrls: ['./batch-transaction.component.scss']
})
export class BatchTransactionComponent implements OnInit {

	@Input()
	transactions: Transaction[];

	selectedAction = null;

	constructor(public transactionService: TransactionService) { }

	actions = [{
		id: "delete",
		name: "Eliminar"
	},
	{
		id: "call_missed_outgoing",
		name: "Reintentar"
	}];

	ngOnInit() {
	}

	onActionChange(value) {
		this.selectedAction = value;
		console.log(value);
	}

	executeAction() {
		if (this.selectedAction == "delete") {
			this.cancelTransactions();
		}
		else if (this.selectedAction == "call_missed_outgoing") {
			this.retryTransactions();
		}
	}

	cancelTransactions() {
		Observable.from(this.transactions)
			.mergeMap(transaction => this.transactionService.cancel(transaction))
			.subscribe(result => console.log(result));
	}

	retryTransactions() {
		Observable.from(this.transactions)
			.mergeMap(transaction => this.transactionService.retry(transaction))
			.subscribe(result => console.log(result));
	}
}
