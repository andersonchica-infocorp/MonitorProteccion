import { Component, OnInit, Input } from '@angular/core';
import { TranslationFail } from '../../Model/transactionFail.model';

@Component({
	selector: 'app-admin-retry-cancel-fail-form',
	templateUrl: './admin-retry-cancel-fail-form.component.html',
	styleUrls: ['./admin-retry-cancel-fail-form.component.scss']
})
export class AdminRetryCancelFailFormComponent implements OnInit {

	@Input()
	public failForm: TranslationFail;

	constructor() { }

	ngOnInit() {
	}

}
