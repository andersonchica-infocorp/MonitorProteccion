import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Application } from '../../Model/application.model';
import { Service } from '../../Model/service.model';
import { ApplicationService } from '../../services/application.service';
import { Transaction } from '../../Model/transaction.model';
import { TransactionService } from '../../services/transaction.service';


@Component({
	selector: 'app-admin-retry',
	templateUrl: './admin-retry.component.html',
	styleUrls: ['./admin-retry.component.scss']
})
export class AdminRetryComponent implements OnInit {

	prueba: string[] = [];
	applications: Application[];
	services: Service[];
	form: FormGroup;
	transactions: Transaction[];

	selectedTransaction: Transaction;

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

	totalRows:number;

	ngOnInit() {
		this.applicationService.getApplications()
			.subscribe(
			applications => {
				this.applications = applications;
			});

		this.applicationService.getServices()
			.subscribe(
			services => {
				this.services = services;
			});
	}

	search() {
		var consumer = this.form.get('consumer').value;
		var messageId = this.form.get('messageId').value;
		var initialDate = this.form.get('initialDate').value;
		var finalDate = this.form.get('finalDate').value;
		var applicationId = this.form.get('application').value;
		var serviceId = this.form.get('serviceControl').value;

		this.transactionService.getTransactions(applicationId, serviceId, consumer, messageId, initialDate, finalDate)
			.subscribe(transactions => {
				this.transactions = transactions;
			});
	}

	showTransaction(transaction: Transaction) {
		this.selectedTransaction = transaction;
	}

	paginate(event) {
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
    }
}
