import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../../../Model/service.model';
import { Observable } from 'rxJs';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { ServiceComponentService } from '../../shared/service.component.service';
import { User } from '../../../Model/user.model';
import { Application } from '../../../Model/application.model';
import { MdDialog } from '@angular/material';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';


@Component({
	selector: 'app-service-list',
	templateUrl: './service-list.component.html',
	styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

	applications: Application[];
	services: Service[];
	private editId: number;
	selectedApplication: number;
	isChargingInitialData: boolean;
	isChargingServices: boolean;
	styleCellActions = { "width": "70px", "text-align": "center" }

	success: boolean;
	constructor(private route: ActivatedRoute, private applicationService: ApplicationService, private serviceComponentService: ServiceComponentService, public dialog: MdDialog) {
	}

	ngOnInit() {
		this.isChargingInitialData = true;
		this.getServices();
	}

	getServices() {
		this.applicationService.getUserData().subscribe(
			user => {
				this.applications = user.applications;
				this.isChargingInitialData = false;
			}
		)
	}

	onSelectApplication() {
		this.isChargingServices = true;
		this.services = undefined;
		var application = this.applications.filter(c => c.id == this.selectedApplication)[0];

		this.applicationService.getServicesApplication(this.selectedApplication)
			.subscribe(
			services => {
				this.services = services.services
				this.isChargingServices = false;
			});
	}

	editService(service: Service) {
		console.log(service);
		let dialogRef = this.dialog.open(ServiceDetailComponent, {
					data: {
						serviceSelected: service,
						application: this.selectedApplication
					},
					disableClose: true,
					
				});
	}
}
