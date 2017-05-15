import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Service } from '../../Model/service.model';


@Injectable()
export class ServiceComponentService {

  private servicesSource = new Subject<Service[]>();
  private serviceSelectedSource = new Subject<Service>();

  services$ = this.servicesSource.asObservable();
  serviceSelected$: Service;

  // Service message commands
  serviceSelected(service: Service) {

    this.serviceSelected$ = service;
  };

  assignServices(services: Service[]) {
    this.servicesSource.next(services);
  }
}
