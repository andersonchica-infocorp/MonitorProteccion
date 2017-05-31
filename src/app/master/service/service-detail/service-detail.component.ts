import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApplicationService } from '../../../services/application.service';
import { Service } from '../../../Model/service.model';
import { Application } from '../../../Model/application.model';
import { ServiceComponentService } from '../../shared/service.component.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MdSnackBar } from '@angular/material';

@Component({
	selector: 'app-service-detail',
	templateUrl: './service-detail.component.html',
	styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

	id: number = null;
	initialdata: Service;
	serviceName: string = null;
	applicationId: number;
	emptyVerCode: boolean;
	isUpdating: boolean;
	readOnly: boolean;

	form: FormGroup;

	constructor(private route: ActivatedRoute, public fb: FormBuilder,
		private applicationService: ApplicationService,
		private serviceComponentService: ServiceComponentService, @Inject(MD_DIALOG_DATA) public data: any,
		public dialogRef: MdDialogRef<any>, public snackBar: MdSnackBar) {

		this.initialdata = data.serviceSelected;
		this.readOnly = data.readOnly;
		this.applicationId = data.application;
		this.setInitialData();
	}

	ngOnInit() {
		this.form.get('reqCallback').valueChanges.subscribe(
			(reqCallBack) => {
				if (reqCallBack) {
					this.form.get('callBackStatus').setValidators([Validators.required]);
				}
				else {
					this.form.get('callBackStatus').setValue(null);
				}
			});

		this.form.get('verCode').valueChanges.subscribe(
			(verCode) => {
				if (verCode && verCode.trim() !== '') {
					this.form.get('verCodeUrl').setValidators([Validators.required]);
					this.form.get('verCodeTimeut').setValidators([Validators.required]);

					this.emptyVerCode = false;
				}
				else {
					this.form.get('verCodeUrl').setValue(null);
					this.form.get('verCodeTimeut').setValue(null);

					this.emptyVerCode = true;
				}
			});
	}

	doCancel() {
		this.dialogRef.close();
	}

	doReset() {

	}

	setInitialData() {
		if (this.initialdata.reqCallback == undefined || this.initialdata.reqCallback == null) {
			this.initialdata.reqCallback = false;
		}

		if (this.initialdata.verCode == undefined || this.initialdata.verCode == null) {
			this.initialdata.verCode = '';
		}

		this.form = this.fb.group({
			invokeUrl: [this.initialdata.invokeUrl, [Validators.required, Validators.maxLength(500)]],
			invokeTimeout: [this.initialdata.invokeTimeout, [Validators.required, Validators.maxLength(500)]],
			retryCount: [this.initialdata.retryCount, [Validators.required, Validators.maxLength(500)]],
			retryDelay: [this.initialdata.retryDelay, [Validators.required, Validators.maxLength(500)]],
			reqCallback: [this.initialdata.reqCallback, [Validators.required, Validators.maxLength(500)]],
			callBackStatus: [this.initialdata.callBackStatus, [Validators.maxLength(500)]],
			verCode: [this.initialdata.verCode, [Validators.maxLength(500)]],
			verCodeUrl: [this.initialdata.verCodeUrl, [Validators.maxLength(500)]],
			verCodeTimeut: [this.initialdata.verCodeTimeut, [Validators.maxLength(500)]],
		});

		if (this.initialdata.reqCallback) {
			this.form.get('callBackStatus').setValidators([Validators.required])
		}

		if (this.initialdata.verCode && this.initialdata.verCode.trim() !== '') {
			this.form.get('verCodeUrl').setValidators([Validators.required]);
			this.form.get('verCodeTimeut').setValidators([Validators.required]);

			this.emptyVerCode = false;
		}
		else {
			this.emptyVerCode = true;
		}
	}

	private createForm(data: Service) {

		this.form = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(50)]],
		});

		this.initialdata = data;
	}

	onSubmit() {
		this.isUpdating = true;
		this.applicationService.updateService(this.form.value as Service, this.applicationId)
			.subscribe(response => {

				if (response.error == "") {					
					this.dialogRef.close();

					this.snackBar.open("Se ha guardado el servicio satisfactoriamente.", '', {
						duration: 5000,
					});
				} else {
					this.snackBar.open("Se ha presentado un error, vuelva a intentarlo más tarde.", 'Error', {
						duration: 5000,
					});
				}

				this.isUpdating = false;

			});
	}
}
