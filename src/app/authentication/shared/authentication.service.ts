import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AuthService {
  isAuthenticated: boolean = false;
  constructor(private http: Http) {}

  authenticatenow(usercreds) {
       
    }
}
