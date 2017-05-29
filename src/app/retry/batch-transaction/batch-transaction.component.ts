import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

    @Output()
    clearTransactions = new EventEmitter();

    selectedAction = null;
    isSendingBulk: boolean;
    transactionsSent: number[];
    transactionsCompleted: number[];

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
        this.isSendingBulk = true;
        if (this.selectedAction == "delete") {
            this.cancelTransactions();
        }
        else if (this.selectedAction == "call_missed_outgoing") {
            this.retryTransactions();
        }
    }

    cancelTransactions() {
        this.transactionsSent = [];
        this.transactionsCompleted = [];
        Observable.from(this.transactions)
            .mergeMap(transaction => {
                this.transactionsSent.push(transaction.id);
                return this.transactionService.cancel(transaction)
            })
            .subscribe(result => {
                this.transactionsCompleted.push(result.transactionId);
                console.log(this.transactionsCompleted);
                console.log(this.transactionsSent);
            });
    }

    retryTransactions() {
        Observable.from(this.transactions)
            .mergeMap(transaction => this.transactionService.retry(transaction))
            .subscribe(result => console.log(result));
    }

    closeSelectedTransactions() {
        this.clearTransactions.emit();
    }
}
