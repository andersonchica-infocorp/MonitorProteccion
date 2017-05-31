import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Application } from '../../Model/application.model';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { UserService } from '../../services/user.service';
import { MdSnackBar } from '@angular/material';

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

    @Input()
    login: string;

    canSave: boolean;

    isUpdating: boolean;

    constructor(private userService: UserService, public snackBar: MdSnackBar) { }

    ngOnInit() {
    }

    saveUserApplications() {
        this.isUpdating = true;
        let applicationsString = this.getUserApplications(this.userApplications);
        this.userService.saveUserApplications(applicationsString, this.login)
            .subscribe(response => {
                if (response.error == "") {
                    this.snackBar.open("Se han actualizado las aplicaciones del usuario.", '' , {
                        duration: 5000,
                    });
                } else {
                    this.snackBar.open("Se ha presentado un error, vuelva a intentarlo más tarde.", 'Error', {
                        duration: 5000,
                    });
                }

                this.isUpdating = false;
            });
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

    getUserApplications(applications: Application[]) {
        let applicationsString = "";
        applications.forEach(
            application => applicationsString = applicationsString + application.id + "#");

        return applicationsString.substring(0, applicationsString.length - 1);
    }
}

