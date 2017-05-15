import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApplicationService } from '../../../services/application.service';
import { Service } from '../../../Model/service.model';
import { ServiceComponentService } from '../../shared/service.component.service';


@Component({
	selector: 'app-service-detail',
	templateUrl: './service-detail.component.html',
	styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

	id: number = null;
	initialdata: Service;
	serviceName: string = null;

	form: FormGroup;

	constructor(private route: ActivatedRoute, public fb: FormBuilder,
		public router: Router, private applicationService: ApplicationService,
		private serviceComponentService: ServiceComponentService) {
		this.form = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(50)]],
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.id = +params['id'];
			this.initialdata = this.serviceComponentService.serviceSelected$;
			console.log(this.initialdata);
		});
	}

	doCancel() {
		this.router.navigate(['/master/service']);
	}

	doReset() {
		this.createForm(this.initialdata);
	}

	private createForm(data: Service) {

		this.form = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(50)]],
		});

		this.initialdata = data;
	}

	onsubmit() {
		console.log(this.form.value);
	}
}
