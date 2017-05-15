import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from '../../../services/application.service';
import { ApplicationComponentService } from '../../shared/application.component.service';


import { Application } from '../../../Model/application.model';
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  applications: Application[];
  private editid: number

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService, private applicationComponentService: ApplicationComponentService) {
    applicationComponentService.applications$.subscribe(
      applications => {
        this.applications = applications;
      });
  }

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.applicationService.getUserData().subscribe(
      user => {
        this.applicationComponentService.assignApplications(user.applications);
      }
    )
  }

  selectApplication(application: Application) {
    this.applicationComponentService.applicationSelected(application);
  }
}
