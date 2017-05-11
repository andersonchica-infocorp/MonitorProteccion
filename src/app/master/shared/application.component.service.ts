import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Application } from '../../Model/application.model';


@Injectable()
export class ApplicationComponentService {

  private applicationsSource = new Subject<Application[]>();
  private applicationSelectedSource = new Subject<Application>();

  applications$ = this.applicationsSource.asObservable();
  applicationSelected$: Application;

  // Service message commands
  applicationSelected(application: Application) {

    this.applicationSelected$ = application;
  };

  assignApplications(applications: Application[]) {
    this.applicationsSource.next(applications);
  }
}
