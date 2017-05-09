import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from '../../../services/application.service';

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

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService) { }

  ngOnInit() {
    this.getApplications();

    //this.editid = 0;
  }

  getApplications() {
    this.applicationService.getApplications().subscribe(
      applications => {
        this.applications = applications;
      }
    )
  }
}
