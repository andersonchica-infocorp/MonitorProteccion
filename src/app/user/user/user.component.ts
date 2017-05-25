import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Model/user.model';

import { Application } from '../../Model/application.model';
import { ApplicationService } from '../../services/application.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    usersResult: User[];
    userApplications: Application[];
    applications: Application[];

    constructor(private userService: UserService) {
        /*this.userService.getUsers()
            .subscribe(userResponse => {
                this.usersResult = userResponse.services;
            })*/
    }

    ngOnInit() {
    }

    userSelected(user:User){
        this.userService.getApplicationsUser(user)
        .subscribe( response =>
        {
            this.userApplications = response.applications;
        });
    }

    pressedApplication(application: Application, isApplicationUser: boolean){
        if (isApplicationUser) {
            this.userApplications.push(application);
        }
        else{
            this.userApplications = this.userApplications.filter(userApplication => application.id != userApplication.id);
        }
    }

}
