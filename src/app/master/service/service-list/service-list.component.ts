import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../../../Model/service.model';
import { Observable } from 'rxJs';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { ServiceComponentService } from '../../shared/service.component.service';
import { User } from '../../../Model/user.model';
import { Application } from '../../../Model/application.model';


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

	success: boolean;
	constructor(private route: ActivatedRoute, private applicationService: ApplicationService, private serviceComponentService: ServiceComponentService) {
	}

	ngOnInit() {
		this.getServices();
	}

	getServices() {
		this.applicationService.getUserData().subscribe(
			user => {
				this.applications = user.applications;
			}
		)
	}

	selectService(service: Service) {
		this.serviceComponentService.serviceSelected(service);
	}

	onSelectApplication() {
		var application = this.applications.filter(c => c.id == this.selectedApplication)[0];

		this.applicationService.getServicesApplication(this.selectedApplication)
			.subscribe(
			services =>
			{
				this.services = services.services
console.log(services.services);
				});
	}
}
