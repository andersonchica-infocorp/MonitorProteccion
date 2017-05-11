import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../../../Model/service.model';
import { Observable } from 'rxJs';

@Component({
	selector: 'app-service-list',
	templateUrl: './service-list.component.html',
	styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

	@Input() services: Service[];


	success: boolean;
	constructor() { }

	ngOnInit() {
	}
}
