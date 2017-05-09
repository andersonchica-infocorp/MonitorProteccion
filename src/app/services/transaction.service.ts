import { Injectable } from '@angular/core';
import { Transaction } from '../Model/transaction.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';

@Injectable()
export class TransactionService {

  private transactionsB: Transaction[] = [
    { Id: 1, ApplicationId: 2, ServiceId: 3, Consumer: "1 Transaction", MessageId: 1 },
    { Id: 2, ApplicationId: 1, ServiceId: 4, Consumer: "2 Transaction", MessageId: 1 },
    { Id: 3, ApplicationId: 4, ServiceId: 1, Consumer: "3 Transaction", MessageId: 1 }];

  private transactions: Transaction[] = [
    { Id: 1, ApplicationId: 2, ServiceId: 3, Consumer: "1", MessageId: 1, Transactions: this.transactionsB },
    { Id: 1, ApplicationId: 2, ServiceId: 3, Consumer: "1", MessageId: 1 },
    { Id: 1, ApplicationId: 2, ServiceId: 3, Consumer: "1", MessageId: 1 },
    { Id: 1, ApplicationId: 2, ServiceId: 3, Consumer: "1", MessageId: 1 },
    { Id: 1, ApplicationId: 2, ServiceId: 3, Consumer: "1", MessageId: 1 },
    { Id: 1, ApplicationId: 2, ServiceId: 3, Consumer: "1", MessageId: 1 },
    { Id: 1, ApplicationId: 2, ServiceId: 3, Consumer: "1", MessageId: 1 },
    { Id: 1, ApplicationId: 2, ServiceId: 3, Consumer: "1", MessageId: 1 }];

  constructor(private http: Http) {

  }

  getTransactions(applicationId : number, serviceId: number, consumer: string, messageId: number, initialDate: Date, finalDate: Date): Observable<Transaction[]> {

    var url = `${AppConfigService.config.webApiUrl}/Aprendizaje`;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      console.log([applicationId, serviceId, consumer, messageId, initialDate, finalDate]);
      return this.transactions;
    });
  }
}
