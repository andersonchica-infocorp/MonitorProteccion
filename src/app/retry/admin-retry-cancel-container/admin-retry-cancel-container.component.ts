
import { Component, OnInit } from '@angular/core';
import { TranslationFail } from '../../Model/transactionFail.model';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
	selector: 'app-admin-retry-cancel-container',
	templateUrl: './admin-retry-cancel-container.component.html',
	styleUrls: ['./admin-retry-cancel-container.component.scss']
})
export class AdminRetryCancelContainerComponent implements OnInit {

	public step: string;
	public placeholderStep: string;

	public state: string;

	public failForm: TranslationFail;

	constructor(private translateService: TranslateService) { }

	ngOnInit() {
		this.step = "init";
		this.assignPlaceHolderStepButton();
	}

	assignPlaceHolderStepButton(){
		if (this.step == "init") {
			this.translateService.get("app.retry.results.transaction.initStep")
			.subscribe(res => 
				this.placeholderStep = res);
		}
	}

	changeState(state: string) {
		this.state = state;
		this.failForm = new TranslationFail("", "");
	}

	validateForm(){
		return this.failForm.description != "" && this.failForm.reason != "";
	}
}