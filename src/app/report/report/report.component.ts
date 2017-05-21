import { Component, OnInit, NgModule } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../Model/dashboard.model';
import { TranslateService } from 'ng2-translate';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
	dashboard: Dashboard;
	isChargingInitialData: boolean;
	messageError: string;
	alertType: string;

	constructor(private dashboardService: DashboardService, public translate: TranslateService) {
		this.isChargingInitialData = true;
		this.dashboardService.getDashboard().subscribe(
			dashboard => {
				this.dashboard = dashboard;
				this.isChargingInitialData = false;
			},
			error => {
				this.isChargingInitialData = false;	
				this.alertType = 'alert-danger';
				this.translate.get('app.common.errorService')
        			.subscribe((res: string) => {
            			this.messageError = res;
        		});
			}
		);
	}

	ngOnInit() {

	}
}
