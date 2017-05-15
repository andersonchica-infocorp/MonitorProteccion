import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../../../Model/service.model';
import { Observable } from 'rxJs';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { ServiceComponentService } from '../../shared/service.component.service';
import { User } from '../../../Model/user.model';



@Component({
	selector: 'app-service-list',
	templateUrl: './service-list.component.html',
	styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

	services: Service[];
	private editId: number;

	success: boolean;
	constructor(private route: ActivatedRoute, private applicationService: ApplicationService, private serviceComponentService: ServiceComponentService) {
		serviceComponentService.services$.subscribe(
			services => {
				this.services = services;
			});
	}

	ngOnInit() {
		this.getServices();
	}

	getServices() {
		this.applicationService.getUserData().subscribe(
			user => {
				this.serviceComponentService.assignServices(user.applications[0].services);
			}
		)
	}

	selectService(service: Service) {
		this.serviceComponentService.serviceSelected(service);
	}
}
