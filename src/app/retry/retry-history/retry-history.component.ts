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
import { MdDialog, DateAdapter } from '@angular/material';
import { ModalXmlComponent } from '../modal-xml/modal-xml.component';
import { ServiceDetailComponent } from '../../master/service/service-detail/service-detail.component';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import 'brace';
import 'brace/theme/clouds';
import 'brace/mode/sql';
import * as moment from 'moment';

@Component({
    selector: 'app-retry-history',
    templateUrl: './retry-history.component.html',
    styleUrls: ['./retry-history.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(+100%)' }),
                animate(500)
            ])
        ])
    ]
})
export class RetryHistoryComponent implements OnInit {
    options: any = { maxLines: 1000, printMargin: true };
    config = { lineNumbers: true };
    page: number = 0;

    applications: Application[];
    services: Service[];
    form: FormGroup;
    transactions: Transaction[];
    consumers: string[];
    xmlTransactionSelected: string;

    selectedTransaction: Transaction;
    selectedApplication: Application;
    selectedTransactionXml: Transaction;
    selectedService: Service;

    totalRows: number;
    cantidad: number = 0;
    isSearching: boolean;
    showTransactions: boolean;
    isChargingInitialData: boolean;
    resetPaginator: boolean;

    touch: boolean;
    filterOdd: boolean;
    yearView: boolean;
    minDate: Date;
    maxDate: Date;
    startAt: Date;
    date: Date;
    isShowingXml: boolean;
    operations = [];
    servicesOut = [];

    searchData: any;

    ngOnInit() {
        this.isChargingInitialData = true;
        this.applicationService.getUserData()
            .subscribe(
            user => {
                this.applications = user.applications;
                this.consumers = user.consumers;
                this.isChargingInitialData = false
            },
            error => {
                this.isChargingInitialData = false
            });
    }

    constructor(private route: ActivatedRoute, public fb: FormBuilder,
        public router: Router, private applicationService: ApplicationService,
        private transactionService: TransactionService, public dialog: MdDialog, private dateAdapter: DateAdapter<Date>) {

        dateAdapter.setLocale('es-co');

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

    search() {
        var consumer = this.form.get('consumer').value;
        var messageId = this.form.get('messageId').value;
        var initialDate;
        var finalDate;
        var applicationId = this.form.get('application').value;
        var serviceId = this.form.get('operation').value;

        this.showTransactions = true;
        this.isSearching = true;
        this.cantidad = 0;

        if (moment(this.form.controls.initialDate.value, 'YYYY-MM-DD').isValid()) {
            initialDate = moment(this.form.controls.initialDate.value).format('YYYY-MM-DD');
        }

        if (moment(this.form.controls.finalDate.value, 'YYYY-MM-DD').isValid()) {
            finalDate = moment(this.form.controls.finalDate.value).format('YYYY-MM-DD');
        }

        this.transactionService.getGlobalSearchTransaction(applicationId, serviceId, consumer, messageId, initialDate, finalDate, this.page, 10)
            .subscribe(parentTransaction => {
                this.transactions = parentTransaction.transactions;
                this.cantidad = parentTransaction.records;
                this.isSearching = false;
                this.resetPaginator = false;
            });
    }

    showTransaction(transaction: Transaction) {

    }

    onSearch() {
        this.searchData = this.form.value;
        this.resetPaginator = true;
        this.page = 0;
        this.search();
    }

    paginate(event) {
        this.page = event.page;
        this.search();
    }

    onSelectApplication(value) {
        this.servicesOut = [];
        this.operations = [];
        this.selectedApplication = value;

        if (value != -1) {

            this.form.controls.serviceControl.setValue('');
            this.form.controls.operation.setValue('');

            this.services = this.applications
                .filter(c => c.id === value)[0].services

            this.getServicesDistinct(this.services);
        }
    }

    onValueChanged(data?: any) {
        if (!this.form) { return; }
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
        this.isShowingXml = true;
        this.selectedTransactionXml = transactionTemplate;
        this.transactionService.getXmlTransaction(transactionTemplate.id)
            .subscribe(xml => {
                this.isShowingXml = false;
                this.xmlTransactionSelected = this.formatXML(xml);;

                let dialogRef = this.dialog.open(ModalXmlComponent, {
                    data: {
                        xml: this.xmlTransactionSelected,
                        readOnly: true,
                        transaction: transactionTemplate
                    },
                    disableClose: false,
                    width: '80%',
                });
            });
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

    backToGrid() {
        this.xmlTransactionSelected = undefined;
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
