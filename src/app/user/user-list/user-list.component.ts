import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../Model/user.model';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxJs';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    @Input()
    usersResult: User[];

    @Output()
    onUserSelected = new EventEmitter<User>();

    constructor(private userService: UserService) {
        
    }

    ngOnInit() {
    }

    userSelected(user: User) {
        this.onUserSelected.emit(user);
    }

    onKey(value){
        this.usersResult = this.usersResult.filter(user => user.name.indexOf(value) >= 0);
    }
}
