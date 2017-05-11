import { Component, OnInit, NgModule } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../Model/dashboard.model';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
	dashboard: Dashboard;

	constructor(private dashboardService: DashboardService) {
		this.dashboardService.getDashboard().subscribe(
			dashboard => this.dashboard = dashboard
		);
	}

	ngOnInit() {

	}
}
