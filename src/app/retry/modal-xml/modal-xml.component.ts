import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TransactionService } from '../../services/transaction.service';
import { Observable } from 'rxjs';

import xmlChecker from 'fast-xml-parser';
import { MdSnackBar } from '@angular/material';

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
    xmlSelected$: string;

    updatingXml: boolean;
    isValidXml: boolean;
    type: string;

    optionsXml = {
        attrPrefix: "@_",
        textNodeName: "#text",
        ignoreNonTextNodeAttr: true,
        ignoreTextNodeAttr: true,
        ignoreNameSpace: true
    };

    constructor( @Inject(MD_DIALOG_DATA) public data: any, public transactionService: TransactionService, public dialogRef: MdDialogRef<any>, public snackBar: MdSnackBar) {
        this.xmlSelected = data.xml;
        this.readOnly = data.readOnly;
        this.transactionId = data.transaction.id;
        this.type = data.type;
        this.change();
    }

    change() {
        this.isValidXml = this.validateXML(this.formatXML(this.xmlSelected));
    }

    ngOnInit() {
    }

    updateXml() {
        this.updatingXml = true;
        this.transactionService.updateXml(this.transactionId, this.xmlSelected)
            .subscribe(
            response => {

                if (!response.error) {
                    this.dialogRef.close();  
                    this.snackBar.open("Se ha actualizado el xml satisfactoriamente.", '', {
                        duration: 5000,
                    });                  
                }
                else{
                    this.snackBar.open("Se ha presentado un error, vuelva a intentarlo más tarde.", 'Error', {
                        duration: 5000,
                    });
                }

                this.updatingXml = false;
            });
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
                tabs += '';
            }
        }

        //rejoin the array to a string and return it
        return xmlArr.join('');
    }

}
