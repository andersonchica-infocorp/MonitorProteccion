import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TransactionService } from '../../services/transaction.service';



import 'brace';
import 'brace/theme/dawn';
import 'brace/mode/xml';

@Component({
	selector: 'app-modal-xml',
	templateUrl: './modal-xml.component.html',
	styleUrls: ['./modal-xml.component.scss']
})
export class ModalXmlComponent implements OnInit {
	options: any = { maxLines: 25, printMargin: false };
	readOnly: boolean;
	xmlSelected: string;
	transactionId: number;

	updatingXml: boolean;

	constructor( @Inject(MD_DIALOG_DATA) public data: any, public transactionService: TransactionService, public dialogRef: MdDialogRef<any>) {
		this.xmlSelected = data.xml;
		this.readOnly = data.readOnly;
		this.transactionId = data.transaction.id;
	}

	ngOnInit() {
	}

	updateXml() {
		this.updatingXml = true;
		this.transactionService.updateXml(this.transactionId, this.xmlSelected)
			.subscribe(
			response => {
				this.dialogRef.close();
				this.updatingXml = false;
			});
	}
}
