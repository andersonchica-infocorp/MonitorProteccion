import { Component } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';


 constructor(
  private router: Router,
    ){}

goTo(path:string){
    this.router.navigate([path]);
  }
}
