import { Injectable } from '@angular/core';
import { Transaction } from '../Model/transaction.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';
import { ParentTransaction } from '../Model/parentTransaction.model';


@Injectable()
export class TransactionService {
/*
  private transactionsB: Transaction[] = [
    { id: 1, applicationId: 2, serviceId: 3, consumer: "1 Transaction", messageId: 1 },
    { id: 2, applicationId: 1, serviceId: 4, consumer: "2 Transaction", messageId: 1 },
    { id: 3, applicationId: 4, serviceId: 1, consumer: "3 Transaction", messageId: 1 }];

  private transactions: Transaction[] = [
    { id: 1, applicationId: 2, serviceId: 3, consumer: "1", messageId: 1, transactions: this.transactionsB },
    { id: 1, applicationId: 2, serviceId: 3, consumer: "1", messageId: 1 },
    { id: 1, applicationId: 2, serviceId: 3, consumer: "1", messageId: 1 },
    { id: 1, applicationId: 2, serviceId: 3, consumer: "1", messageId: 1 },
    { id: 1, applicationId: 2, serviceId: 3, consumer: "1", messageId: 1 },
    { id: 1, applicationId: 2, serviceId: 3, consumer: "1", messageId: 1 },
    { id: 1, applicationId: 2, serviceId: 3, consumer: "1", messageId: 1 },
    { id: 1, applicationId: 2, serviceId: 3, consumer: "1", messageId: 1 }];*/

  constructor(private http: Http) {

  }

  getTransactions(applicationId: number, serviceId: number, consumer: string, messageId: number, initialDate: Date, finalDate: Date, page: number, rows: number): Observable<ParentTransaction> {

    var url = `${AppConfigService.config.webApiUrl}/parentTransactions?app=` + applicationId + "&service=" + serviceId + "&page=" + page + "&rows=" + rows;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return response.json() as ParentTransaction;
    });
  }
}
