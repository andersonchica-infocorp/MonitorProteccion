import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MdSnackBar } from '@angular/material';
import { AuthManager } from '../shared/authentication.manage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  localUser = {
    username: '',
    password: ''
  };

  form: FormGroup;
  isLogging: boolean;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public fb: FormBuilder, private userService: UserService, public snackBar: MdSnackBar, public authManager: AuthManager) {
    this.form = this.fb.group({
      userName: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50)]],
    });
  }

  ngOnInit() {
  }

  login() {
    this.isLogging = true;
    this.authManager.login(this.form.controls.userName.value, this.form.controls.password.value)
      .subscribe(response => {
        this.isLogging = false;
        if (!response.error) {
          this.router.navigate(['../../report/history'], { relativeTo: this.activatedRoute });
          this
        }
        else {
          this.snackBar.open("Vuelva a intentarlo más tarde.", 'Error', {
            duration: 3000,
          });
        }
      });
  }
}
