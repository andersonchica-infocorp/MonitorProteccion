import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Application } from '../../Model/application.model';


@Component({
    selector: 'app-user-applications',
    templateUrl: './user-applications.component.html',
    styleUrls: ['./user-applications.component.scss']
})
export class UserApplicationsComponent implements OnInit {

    @Output()
    onPressedApplication = new EventEmitter<Application>();

    @Input()
    userApplications: Application[];

    constructor() { }

    ngOnInit() {
    }

    pressedApplication(application: Application) {
        this.onPressedApplication.emit(application);
    }

    onKey(value) {
        this.userApplications = this.userApplications.filter(application => application.name.indexOf(value) >= 0);
    }
}
