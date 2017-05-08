import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list-admin',
  templateUrl: './user-list-admin.component.html',
  styleUrls: ['./user-list-admin.component.scss']
})
export class UserListAdminComponent implements OnInit {

  userDeleted: boolean;
  usersAdministratos: User[];

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.getUsersAdministrators();
  }

  getUsersAdministrators() {
    this.userService.getUsersAdministrators().subscribe(
      usersAdministratos => {
        this.usersAdministratos = usersAdministratos;
      }
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      userDeleted => {
        this.userDeleted = userDeleted;
      }
    );
  }
}
