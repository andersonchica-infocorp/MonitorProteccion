import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Application } from '../../Model/application.model';
import { TranslateModule } from 'ng2-translate/ng2-translate';


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

    @Input()
    applications: Application[];

    @Input()
    userName: string;

    @Output()
    onSaveUserApplications = new EventEmitter<Application[]>();

    canSave: boolean;

    constructor() { }

    ngOnInit() {
    }

    saveUserApplications() {
        this.onSaveUserApplications.emit(this.userApplications);
    }

    pressedApplication(application: Application) {
        this.onPressedApplication.emit(application);
    }

    onKey(value) {
        this.userApplications = this.userApplications.filter(application => application.name.indexOf(value) >= 0);
    }

    clickApplication(application: Application, checked: boolean) {
        this.canSave = true;
        if (checked) {
            this.userApplications.push(application);
        } else {
            this.userApplications = this.userApplications.filter(applicationUser => applicationUser.id != application.id);
        }
    }

    isApplicationUser(application: Application) {
        return this.userApplications.filter(applicationUser => applicationUser.id == application.id).length > 0;
    }
}

