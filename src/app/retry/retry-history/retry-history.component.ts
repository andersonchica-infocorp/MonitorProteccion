import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Application } from '../../Model/application.model';
import { Service } from '../../Model/service.model';
import { ApplicationService } from '../../services/application.service';
import { Transaction } from '../../Model/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { Observable } from 'rxJs';
import { Consumer } from '../../Model/consumer.model';

@Component({
	selector: 'app-retry-history',
	templateUrl: './retry-history.component.html',
	styleUrls: ['./retry-history.component.scss']
})
export class RetryHistoryComponent implements OnInit {
	page: number= 0;

	applications: Application[];
	services: Service[];
	form: FormGroup;
	transactions: Transaction[];
	consumers: string[];
	xmlTransactionSelected: string;

	selectedTransaction: Transaction;
	selectedApplication: Application;
	selectedTransactionXml: Transaction;
	totalRows: number;
	cantidad: number = 0;

	ngOnInit() {
		this.applicationService.getUserData()
			.subscribe(
			user => {
				this.applications = user.applications;
				this.consumers = user.consumers;
			});
	}

	constructor(private route: ActivatedRoute, public fb: FormBuilder,
		public router: Router, private applicationService: ApplicationService,
		private transactionService: TransactionService) {

		this.form = this.fb.group({
			consumer: [''],
			messageId: [''],
			initialDate: [''],
			finalDate: [''],
			application: ['', Validators.required],
			serviceControl: ['', Validators.required],
		});
	}

	search() {
		var consumer = this.form.get('consumer').value;
		var messageId = this.form.get('messageId').value;
		var initialDate = this.form.get('initialDate').value;
		var finalDate = this.form.get('finalDate').value;
		var applicationId = this.form.get('application').value;
		var serviceId = this.form.get('serviceControl').value;

		this.transactionService.getGlobalSearchTransaction(applicationId, serviceId, consumer, messageId, initialDate, finalDate, this.page, 10)
			.subscribe(parentTransaction => {
				this.transactions = parentTransaction.transactions;
				this.cantidad = parentTransaction.records;
			});
	}

	showTransaction(transaction: Transaction) {

	}

	paginate(event) {
		//event.first = Index of the first record
		//event.rows = Number of rows to display in new page
		this.page = event.page;

		this.search();
		//event.pageCount = Total number of pages


	}

	onSelectApplication(value) {
		this.selectedApplication = value;

		this.services = this.applications
			.filter(c => c.id === value)[0].services
	}

	onValueChanged(data?: any) {
		if (!this.form) { return; }

		/*const form = this.heroForm;
		for (const field in this.formErrors) {
		  // clear previous error message (if any)
		  this.formErrors[field] = '';
		  const control = form.get(field);
		  if (control && control.dirty && !control.valid) {
			const messages = this.validationMessages[field];
			for (const key in control.errors) {
			  this.formErrors[field] += messages[key] + ' ';
			}
		  }
		}*/


	}

	getTransactionsTransaction(transactionTemplate) {
		let idTransaction = transactionTemplate.data.id;
		this.transactionService.getTransactionsTransaction(idTransaction).subscribe(
			transactions => {
				this.transactions.map(transaction => {
					if (transaction.id == idTransaction) {
						transaction.transactions = transactions.transactions;
					}
				});

			});
	}

	showXml(transactionTemplate) {
		this.selectedTransactionXml = transactionTemplate;
		this.transactionService.getXmlTransaction(transactionTemplate.id)
			.subscribe(xml => {
				this.xmlTransactionSelected = xml;
				console.log(xml);
			});
	}

}
