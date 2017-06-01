import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Application } from '../../Model/application.model';
import { Service } from '../../Model/service.model';
import { ApplicationService } from '../../services/application.service';
import { Transaction } from '../../Model/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { Observable } from 'rxJs';
import { Consumer } from '../../Model/consumer.model';
import { MdDialog } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { ServiceDetailComponent } from '../../master/service/service-detail/service-detail.component';


import { ModalXmlComponent } from '../modal-xml/modal-xml.component';
import { MdSnackBar } from '@angular/material';

import 'brace';
import 'brace/theme/clouds';
import 'brace/mode/sql';

@Component({
    selector: 'app-admin-retry',
    templateUrl: './admin-retry.component.html',
    styleUrls: ['./admin-retry.component.scss']
})
export class AdminRetryComponent implements OnInit {
    options: any = { maxLines: 100, printMargin: true };
    page: number = 0;

    prueba: string[] = [];
    applications: Application[];
    services: Service[];
    form: FormGroup;
    transactions: Transaction[];
    consumers: string[];
    operations = [];
    servicesOut = [];
    xmlTransactionSelected: string;

    selectedTransaction: Transaction;
    selectedApplication: Application;
    selectedService: Service;
    selectedTransactionAction: Transaction;

    isChargingInitialData: boolean;
    resetPaginator: boolean;
    isSearching: boolean;
    showTransactions: boolean;

    isSendingRetry: boolean;
    isShowingXml: boolean;
    cantidad: number = 0;
    messageError: string;
    alertType: string;
    isDeletingRetry: boolean;
    isDeletingAll: boolean;

    isSearchingTransactionsTransaction: boolean;
    selectedTransactions: Transaction[];

    searchData: any;

    styleCellActions = { "width": "150px", "text-align": "center" }

    constructor(private route: ActivatedRoute, public fb: FormBuilder,
        public router: Router, private applicationService: ApplicationService,
        private transactionService: TransactionService, public dialog: MdDialog, public translate: TranslateService
        , public snackBar: MdSnackBar) {
        this.form = this.fb.group({
            consumer: [''],
            messageId: [''],
            initialDate: [''],
            finalDate: [''],
            application: ['', Validators.required],
            serviceControl: ['', Validators.required],
            operation: ['', Validators.required]
        });
    }

    totalRows: number;

    ngOnInit() {
        this.isChargingInitialData = true;
        this.applicationService.getUserData()
            .subscribe(
            user => {
                this.applications = user.applications;
                this.consumers = user.consumers;
                this.isChargingInitialData = false;
            }, error => {
                this.isChargingInitialData = false;
                this.alertType = 'alert-danger';
                this.translate.get('app.common.errorService')
                    .subscribe((res: string) => {
                        this.messageError = res;
                    });
            });
    }

    search(input) {


        this.isSearching = true;
        this.cantidad = 0;
        this.showTransactions = true;
        this.transactionService.getTransactions(
            input.application,
            input.operation,
            input.consumer,
            input.messageId,
            input.initialDate,
            input.finalDate, this.page, 10)
            .subscribe(parentTransaction => {
                this.transactions = parentTransaction.transactions;
                this.isSearching = false;
                this.resetPaginator = false;
            },
            error => {
                this.isSearching = false;
                this.resetPaginator = false;
                this.alertType = 'alert-danger';
                this.translate.get('app.common.errorService')
                    .subscribe((res: string) => {
                        this.messageError = res;
                    });
            });
    }

    onSearch() {
        this.searchData = this.form.value;
        this.selectedTransactions = null;
        this.resetPaginator = true;
        this.page = 0;

        this.search(this.form.value);
    }

    retry(transaction: Transaction) {
        console.log(transaction);
        this.selectedTransactionAction = transaction;
        this.isSendingRetry = true;
        this.transactionService.retry(transaction, this.searchData.operation)
            .subscribe(response => {
                if (response.error == "" && response.status == "OK") {

                    this.selectedTransactionAction = null;
                    if (this.selectedTransactions) {
                        this.selectedTransactions = this.selectedTransactions.filter(transactionFilter => transactionFilter.id != transaction.id);
                    }

                    this.search(this.searchData);
                    this.snackBar.open("Se ha enviado el reintento satisfactoriamente.", '', {
                        duration: 5000,
                    });
                } else {
                    this.snackBar.open("Se ha presentado un error, vuelva a intentarlo más tarde.", 'Error', {
                        duration: 5000,
                    });
                }

                this.isSendingRetry = false;
            });
    }

    clearFilter() {
        this.form = this.fb.group({
            consumer: [''],
            messageId: [''],
            initialDate: [''],
            finalDate: [''],
            application: ['', Validators.required],
            serviceControl: ['', Validators.required],
            operation: ['', Validators.required]
        });

        this.servicesOut = [];
        this.operations = [];
    }

    deleteTransaction(transaction: Transaction) {

        this.isDeletingRetry = true;
        this.selectedTransactionAction = transaction;
        this.transactionService.cancel(transaction, this.searchData.operation)
            .subscribe(response => {

                if (response.error == "" && response.status == "OK") {

                    if (this.selectedTransactions) {
                        this.selectedTransactions = this.selectedTransactions.filter(transactionFilter => transactionFilter.id != transaction.id);
                    }

                    this.selectedTransactionAction = null;
                    this.search(this.searchData);
                    this.snackBar.open("Se ha cancelado la transacción satisfactoriamente.", '', {
                        duration: 5000,
                    });
                } else {
                    this.snackBar.open("Se ha presentado un error, vuelva a intentarlo más tarde.", 'Error', {
                        duration: 5000,
                    });
                }

                this.isDeletingRetry = false;
            });
    }

    deleteAllTransactionsTransaction(transaction: Transaction) {
        this.isDeletingAll = true;
        this.selectedTransactionAction = transaction;
        this.transactionService.cancelAll(transaction, this.searchData.operation)
            .subscribe(response => {

                if (response.error == "" && response.status == "OK") {

                    if (this.selectedTransactions) {
                        this.selectedTransactions = this.selectedTransactions.filter(transactionFilter => transactionFilter.id != transaction.id);
                    }

                    this.selectedTransactionAction = null;
                    this.search(this.searchData);
                    this.snackBar.open("Se han cancelado la transacciones satisfactoriamente.", '', {
                        duration: 5000,
                    });
                } else {
                    this.snackBar.open("Se ha presentado un error, vuelva a intentarlo más tarde.", 'Error', {
                        duration: 5000,
                    });
                }

                this.isDeletingAll = false;
            });
    }


    showTransaction(transaction: Transaction) {

    }

    paginate(event) {
        this.page = event.page;
        this.search(this.searchData);
    }

    onSelectApplication(value) {
        this.servicesOut = [];
        this.operations = [];
        this.selectedApplication = value;

        if (value != -1) {

            this.form.controls.serviceControl.setValue('');
            this.form.controls.operation.setValue('');
            this.form.controls.consumer.setValue('');

            this.services = this.applications
                .filter(c => c.id === value)[0].services

            this.getServicesDistinct(this.services);
        }


    }

    getServicesDistinct(services) {
        services.forEach(service => {
            if (!this.servicesOut.find(c => c.id == service.name)) {
                this.servicesOut.push({ id: service.name, name: service.name });
            }
        })
    }

    onSelectService(value) {
        this.operations = [];

        this.selectedService = value;
        if (value != -1) {
            this.form.controls.operation.setValue('');
            this.form.controls.operation.setValue('');
            this.operations = this.services.filter(service => service.name == value);
        }

    }

    onValueChanged(data?: any) {
        if (!this.form) { return; }
    }

    getTransactionsTransaction(transactionTemplate) {
        this.isSearchingTransactionsTransaction = true;
        let idTransaction = transactionTemplate.data.id;
        this.transactionService.getTransactionsTransaction(idTransaction).subscribe(
            transactions => {
                this.isSearchingTransactionsTransaction = false;
                this.transactions.map(transaction => {
                    if (transaction.id == idTransaction) {
                        transaction.transactions = transactions.transactions;
                    }
                });
            });
    }

    showXml(transactionTemplate) {
        this.isShowingXml = true;
        this.selectedTransactionAction = transactionTemplate;
        this.transactionService.getXmlTransaction(transactionTemplate.id)
            .subscribe(xml => {
                this.isShowingXml = false;
                this.xmlTransactionSelected = this.formatXML(xml);

                let dialogRef = this.dialog.open(ModalXmlComponent, {
                    data: {
                        xml: this.xmlTransactionSelected,
                        readOnly: false,
                        transaction: transactionTemplate
                    },
                    disableClose: true,
                    width: '80%',
                });
            });
    }

    backToGrid() {
        this.xmlTransactionSelected = undefined;
    }

    clearTransactions() {
        this.selectedTransactions = null;
    }

    viewDetailService() {
        this.applicationService.getServicesApplication(this.searchData.application)
            .subscribe(servicesApplication => {
                var service = servicesApplication.services.filter(c => c.id == this.searchData.operation)[0];
                let dialogRef = this.dialog.open(ServiceDetailComponent, {
                    data: {
                        serviceSelected: service,
                        readOnly: true,
                        application: this.form.controls.application.value
                    },
                    disableClose: true,

                });
            });
    }

    searchTransaction() {
        this.clearTransactions();
        this.search(this.form.value);
    }

    onSubmit() {

    }

    formatXML(input) {

        // PART 1: Add \n where necessary
        // A) add \n between sets of angled brackets without content between them
        // B) remove \n between opening and closing tags of the same node if no content is between them
        // C) add \n between a self-closing set of angled brackets and the next set
        // D) split it into an array

        let xmlString = input.trim()
            .replace(/>\s*</g, '>\n<')
            .replace(/(<[^\/>].*>)\n(<[\/])/g, '$1$2')
            .replace(/(<\/[^>]+>|<[^>]+\/>)(<[^>]+>)/g, '$1\n$2');
        let xmlArr = xmlString.split('\n');

        // PART 2: indent each line appropriately

        var tabs = '';          //store the current indentation
        var start = 0;          //starting line
        if (/^<[?]xml/.test(xmlArr[0])) start++;    //if the first line is a header, ignore it

        for (var i = start; i < xmlArr.length; i++) { //for each line
            var line = xmlArr[i].trim();    //trim it just in case
            if (/^<[/]/.test(line)) { // if the line is a closing tag
                // remove one tab from the store
                // add the tabs at the beginning of the line
                tabs = tabs.replace(/.$/, '');
                xmlArr[i] = tabs + line;
            } else if (/<.*>.*<\/.*>|<.*[^>]\/>/.test(line)) { // if the line contains an entire node
                // leave the store as is
                // add the tabs at the beginning of the line
                xmlArr[i] = tabs + line;
            } else { // if the line starts with an opening tag and does not contain an entire node
                // add the tabs at the beginning of the line
                // and add one tab to the store
                xmlArr[i] = tabs + line;
                tabs += '\t';
            }
        }

        //rejoin the array to a string and return it
        return xmlArr.join('\n');
    }
}
