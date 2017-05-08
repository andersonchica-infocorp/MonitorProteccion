import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list-result',
  templateUrl: './user-list-result.component.html',
  styleUrls: ['./user-list-result.component.scss']
})
export class UserListResultComponent implements OnInit {

  usersResult: User[];
  form: FormGroup;
  userAdded: string;

  constructor(private route: ActivatedRoute, public fb: FormBuilder,
    public router: Router, private userService: UserService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
    });
  }

  ngOnInit() {
  }

  doCancel() {
    this.router.navigate(['/user/admin']);
  }

  search() {
    this.userService.getUsersSystem(this.form.controls.name.value).subscribe(
      usersSystem => {
        this.usersResult = usersSystem;
      }
    );
  }

  addUserAdministrator(user: User) {
    this.userService.addUserAdministrator(user).subscribe(
      userAdded => {
        this.userAdded = "";
      }
    )
  }
}
