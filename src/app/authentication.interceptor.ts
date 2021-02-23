import { Injectable } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  loginData: any;
  encryption: string;
  decryption: string;

  constructor(private login: LoginCheckService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loginData = this.login.Getlogin();
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `${token}` },
      });
    }

    if (this.loginData) {
      /* this.decryption=CryptoJS.AES.decrypt(this.loginData,'sensegiz').toString(CryptoJS.enc.Utf8); */
      this.loginData = JSON.parse(this.loginData);
      console.log('in interceptor===', this.loginData);
      /* this.encryption=CryptoJS.AES.encrypt(JSON.stringify(this.loginData),"sensegiz").toString()
    console.log("encryption$$$$$",this.encryption)  */

      if (
        this.loginData.role == 'user' &&
        moment(this.loginData.expiryDate).format('YYYY-MM-DD hh:mm:ss') <=
          moment().format('YYYY-MM-DD hh:mm:ss')
      ) {
        localStorage.clear();
        this.login.loginCheckStatus.next(false);
        this.login.loginCred.next(false);
        this.login.authCheck.next(false);
        console.log(this.loginData);
        return EMPTY;
      }
      return next.handle(request);
    }
  }
}
