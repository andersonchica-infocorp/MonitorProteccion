
import { Component, OnInit, Inject } from '@angular/core';
import { TransactionFail } from '../../Model/transactionFail.model';
import { TranslateService } from 'ng2-translate/ng2-translate';
import xmlChecker from 'fast-xml-parser';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { XmlState } from '../../Model/xmlState.model';
import { Transaction } from '../../Model/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { MdSnackBar } from '@angular/material';

import 'brace';
import 'brace/theme/dawn';
import 'brace/mode/xml';

@Component({
	selector: 'app-admin-retry-cancel-container',
	templateUrl: './admin-retry-cancel-container.component.html',
	styleUrls: ['./admin-retry-cancel-container.component.scss']
})
export class AdminRetryCancelContainerComponent implements OnInit {

	public transaction: Transaction;
	public step: string;
	public placeholderStep: string;
	public xml: string;
	public isValidXml: boolean;
	public service: number;
	public isCanceling: boolean;

	public xmlState: XmlState;

	public state: string;

	public failForm: TransactionFail;

	optionsXml = {
		attrPrefix: "@_",
		textNodeName: "#text",
		ignoreNonTextNodeAttr: true,
		ignoreTextNodeAttr: true,
		ignoreNameSpace: true
	};

	constructor(private translateService: TranslateService,
		private transactionService: TransactionService,
		@Inject(MD_DIALOG_DATA) public data: any,
		public dialogRef: MdDialogRef<any>,
		public snackBar: MdSnackBar) {

		this.transaction = data.transaction;
		this.service = data.service;
	}

	ngOnInit() {
		this.transactionService.getStateXml(this.service)
			.subscribe(xmlState => {
				if (!xmlState.error) {
					this.xmlState = xmlState
				}
				else {
					this.xmlState = new XmlState("No fue posible consultar los datos.", "No fue posible consultar los datos.");
				}
			});

		this.step = "init";
		this.assignPlaceHolderStepButton();
	}

	assignPlaceHolderStepButton() {
		if (this.step == "init") {
			this.translateService.get("app.retry.results.transaction.initStep")
				.subscribe(res =>
					this.placeholderStep = res);
		}
	}

	changeState(state: string) {
		this.state = state;
		this.failForm = new TransactionFail("", "");

		if (this.state == "0") {
			this.xml = this.xmlState.failed
		}
		else {
			this.xml = this.xmlState.success;
		}

		this.change();
	}

	change() {
		this.isValidXml = this.validateXML(this.formatXML(this.xml));
	}

	validateXML(xml) {
		var isValid = false;
		try {
			xmlChecker.validate(xml);
			var jsonObj = xmlChecker.parse(xml, this.optionsXml);
			isValid = true;
		}
		catch (error) {
			isValid = false;
		}

		return isValid;
	}

	validateForm() {

		let valid = this.failForm && this.failForm.reason != "" && this.xml && this.isValidXml;

		if (this.state == "1") {
			valid = this.isValidXml
		}

		return valid;
	}

	sendCancelTransaction() {
		this.isCanceling = true;
		this.transactionService.cancelSuccesFail(this.transaction, this.failForm, this.xml, this.service)
			.subscribe(response => {
				this.isCanceling = false;
				if (response.error == "" && response.status == "OK") {

					this.dialogRef.close("OK");
					this.snackBar.open("Se ha cancelado la transacción satisfactoriamente.", '', {
						duration: 5000,
					});
				} else {
					this.snackBar.open("Se ha presentado un error, vuelva a intentarlo más tarde.", 'Error', {
						duration: 5000,
					});
				}
			});
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