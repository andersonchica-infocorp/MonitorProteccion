import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdalService } from 'ng2-adal/core';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

	error: string = "Se ha presentado un error. Vuelva a intentarlo.";

	constructor(private route: ActivatedRoute,
		private adalService: AdalService) {
		this.route.params.subscribe(params => {
			this.error = params['msgError'];
		});
	}

	ngOnInit() {
	}

	login() {
		this.adalService.logOut();
		//this.adalService.login();
	}
}
