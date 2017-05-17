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

import { ModalXmlComponent } from '../modal-xml/modal-xml.component';

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
	xmlTransactionSelected: string;

	selectedTransaction: Transaction;
	selectedApplication: Application;
	selectedTransactionXml: Transaction;

	styleCellActions = { "width": "100px", "text-align": "center" }

	constructor(private route: ActivatedRoute, public fb: FormBuilder,
		public router: Router, private applicationService: ApplicationService,
		private transactionService: TransactionService, public dialog: MdDialog) {
		this.form = this.fb.group({
			consumer: [''],
			messageId: [''],
			initialDate: [''],
			finalDate: [''],
			application: ['', Validators.required],
			serviceControl: ['', Validators.required],
		});
	}

	totalRows: number;

	ngOnInit() {
		this.applicationService.getUserData()
			.subscribe(
			user => {
				this.applications = user.applications;
				this.consumers = user.consumers;
			});
	}

	search() {
		this.xmlTransactionSelected = this.formatXML('<out5:crearDobleAsesoria xmlns:out5="http://tempuri.org/" xmlns:out7="http://schemas.datacontract.org/2004/07/CRM_Proteccion_Services"><out5:nuevaAsesoria><out7:ApruebaHistoria>true</out7:ApruebaHistoria><out7:Asunto>Doble Asesoria</out7:Asunto><out7:ClienteContactado>true</out7:ClienteContactado><out7:Consecutivo>DA1234567</out7:Consecutivo><out7:Descripcion>Se le explica la diferencia de r�gimen.</out7:Descripcion><out7:ElAfiliadoDecide>2</out7:ElAfiliadoDecide><out7:EstadoHistoriaLaboral>1</out7:EstadoHistoriaLaboral><out7:FechaInicio>2017-02-02T12:09:23.299-05:00</out7:FechaInicio><out7:LeConvieneQuedarse>1</out7:LeConvieneQuedarse><out7:ListaDocumentos/><out7:MasAnosRAI>true</out7:MasAnosRAI><out7:MedioUtilizado>2</out7:MedioUtilizado><out7:NumeroIdentificacion>1</out7:NumeroIdentificacion><out7:Propietario>JMGIL</out7:Propietario><out7:SegundaAsesoria>false</out7:SegundaAsesoria><out7:TipoAsesoria>2</out7:TipoAsesoria><out7:TipoIdentificacion>CC</out7:TipoIdentificacion></out5:nuevaAsesoria></out5:crearDobleAsesoria>');
		console.log(this.xmlTransactionSelected);

		var consumer = this.form.get('consumer').value;
		var messageId = this.form.get('messageId').value;
		var initialDate = this.form.get('initialDate').value;
		var finalDate = this.form.get('finalDate').value;
		var applicationId = this.form.get('application').value;
		var serviceId = this.form.get('serviceControl').value;

		this.transactionService.getTransactions(applicationId, serviceId, consumer, messageId, initialDate, finalDate, 0, 10)
			.subscribe(parentTransaction => {
				this.transactions = parentTransaction.transactions;
			});
	}

	showTransaction(transaction: Transaction) {

	}

	paginate(event) {
		this.page = event.page;
		this.search();
	}

	onSelectApplication(value) {
		this.selectedApplication = value;

		this.services = this.applications
			.filter(c => c.id === value)[0].services
	}

	onValueChanged(data?: any) {
		if (!this.form) { return; }
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
				this.xmlTransactionSelected = this.formatXML(xml);
				console.log(this.xmlTransactionSelected);

				let dialogRef = this.dialog.open(ModalXmlComponent, {
					data: {
						xml: this.xmlTransactionSelected,
						readOnly: false,
						transaction: transactionTemplate
					},
					disableClose: true,
					height: '600px',
					width: '800px',
				});
			});
	}

	backToGrid() {
		this.xmlTransactionSelected = undefined;
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
