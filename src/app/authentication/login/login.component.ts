import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  localUser = {
     username: '',
     password: ''
   }
  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
  }

  login() {
    /*let checknow = this.auth.authenticatenow(this.localUser);
    checknow.then((res) => {
      if(res) {
        this.router.navigate(['/second']);
      }
      else {
        console.log('Invalid user');
      }
    })*/
  }
}
