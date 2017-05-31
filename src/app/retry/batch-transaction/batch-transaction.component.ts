import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../Model/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { MdSnackBar } from '@angular/material';

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

    @Output()
    searchTransaction = new EventEmitter();

    @Input()
    serviceId: number;

    selectedAction = null;
    isSendingBulk: boolean;
    transactionsSent: number[];
    transactionsCompleted: number[];

    constructor(public transactionService: TransactionService, public snackBar: MdSnackBar) { }

    actions = [{
        id: "delete",
        name: "Eliminar"
    },
    {
        id: "call_missed_outgoing",
        name: "Reintentar"
    },
    {
        id: "clear",
        name: "Cancelar Transacciones y Transacción"
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
        else if (this.selectedAction == "clear") {
            this.cancelAllTransactions();
        }
    }

    cancelTransactions() {
        this.transactionsSent = [];
        this.transactionsCompleted = [];
        Observable.from(this.transactions)
            .mergeMap(transaction => {
                this.transactionsSent.push(transaction.id);
                return this.transactionService.cancel(transaction, this.serviceId)
            })
            .subscribe(result => {
                this.transactionsCompleted.push(result.transactionId);

                if (this.finishedTransactions()) {
                    this.finished();
                }

            });
    }

    cancelAllTransactions() {
        this.transactionsSent = [];
        this.transactionsCompleted = [];
        Observable.from(this.transactions)
            .mergeMap(transaction => {
                this.transactionsSent.push(transaction.id);
                return this.transactionService.cancelAll(transaction, this.serviceId)
            })
            .subscribe(result => {
                this.transactionsCompleted.push(result.transactionId);

                if (this.finishedTransactions()) {
                    this.finished();
                }

            });
    }

    retryTransactions() {
        this.transactionsSent = [];
        this.transactionsCompleted = [];

        Observable.from(this.transactions)
            .mergeMap(transaction => {
                this.transactionsSent.push(transaction.id);
                return this.transactionService.retry(transaction, this.serviceId)
            })
            .subscribe(result => {
                this.transactionsCompleted.push(result.transactionId);

                if (this.finishedTransactions()) {
                    this.finished();
                }
            });
    }

    closeSelectedTransactions() {
        this.clearTransactions.emit();
    }

    onSearchTransaction() {
        this.searchTransaction.emit();
    }

    finishedTransactions() {
        let completed: boolean = true;
        this.transactionsSent.forEach(transactionSent => {

            if (this.transactionsCompleted.indexOf(transactionSent) == -1) {
                return false;
            }
        })

        return completed;
    }

    finished() {
        this.isSendingBulk = false;
        this.onSearchTransaction();
        this.snackBar.open("Se han enviado las transacciones satisfactoriamente.", '', {
            duration: 5000,
        });
    }
}
