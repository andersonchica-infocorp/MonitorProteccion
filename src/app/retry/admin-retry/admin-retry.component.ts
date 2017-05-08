import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-admin-retry',
	templateUrl: './admin-retry.component.html',
	styleUrls: ['./admin-retry.component.scss']
})
export class AdminRetryComponent implements OnInit {

	services: string[] = [];

	form: FormGroup;

	constructor(private route: ActivatedRoute, public fb: FormBuilder,
		public router: Router) {
		this.form = this.fb.group({
			consumer: [''],
			messageId: [''],
			initialDate: [''],
			finalDate: [''],
			application: [''],
			service: [''],
		});
	}

	ngOnInit() {
	}

	search() {
		this.services.push("hola");
	}
}
