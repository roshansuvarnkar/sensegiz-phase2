import { Injectable } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import { Router , ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js'
import { EMPTY, observable } from 'rxjs';
import { throwError, Observable, BehaviorSubject, of, pipe } from "rxjs";
import { catchError, tap, take } from "rxjs/operators";
import {GeneralMaterialsService} from 'src/app/general-materials.service'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import * as moment from 'moment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  loginData:any
  encryption:string;
  decryption:string;

  constructor(
    private login:LoginCheckService,
    private router:Router,
    private general:GeneralMaterialsService
  ) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loginData = this.login.Getlogin()

    request=this.addAuthenticationToken(request)
    return next.handle(request).pipe(
      (take(1),
      catchError((error: any) => {
        if (error.status === 403 || error.status === 401) {
            this.login.logout()
        }
        else {

        }
        return throwError(error);

      })), tap((res: any) => {
        if (res instanceof HttpResponse) {
          // console.log('tap res==', res);
          if (res.body.hasOwnProperty('data')) {
            res.body.data = this.general.decrypt(res.body.data);
          }
          return res;
        } else {
          return res;
        }
      })
    ) as any;
  }

    /* if(this.loginData ){
      console.log("in interceptor===",this.loginData)
      if(this.loginData.role=='user' && moment(this.loginData.expiryDate).format('YYYY-MM-DD hh:mm:ss') <= moment().format('YYYY-MM-DD hh:mm:ss')){
        localStorage.clear()
        this.login.loginCheckStatus.next(false)
        this.login.loginCred.next(false)
        this.login.authCheck.next(false)
        console.log(this.loginData)
        return EMPTY
      }
      else{
        return next.handle(request);
      }
    }
    else{
      return next.handle(request);
    }
  } */
private  addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
  this.loginData = this.login.Getlogin()
 let token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    request=request.clone({
    setHeaders: { Authorization: `${token}`}
})
if (request instanceof HttpRequest) {

  // console.log("http request==", request);
  if(this.loginData ){
    console.log("in interceptor===",this.loginData)
    if(this.loginData.role=='user' && moment(this.loginData.expiryDate).format('YYYY-MM-DD hh:mm:ss') <= moment().format('YYYY-MM-DD hh:mm:ss')){
      localStorage.clear()
      this.login.loginCheckStatus.next(false)
      this.login.loginCred.next(false)
      this.login.authCheck.next(false)
      console.log(this.loginData)
    }
    let authHeaders = request.headers.get('authorization');
   if (authHeaders) {
    let body = request.body;
    if (body) {
      // request.body = {}
      request.body.data = this.general.encrypt(body.data);
    }
  }
    else{
      return request
    }
  }
  else{
    return request;
  }
}
}
return request;
}
}




/*
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginAuthService } from './services/login-auth.service';
import { GeneralService } from './services/general.service';
import { EMPTY, observable } from 'rxjs';
import { throwError, Observable, BehaviorSubject, of, pipe } from "rxjs";
import { catchError, tap, take } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  status: any;
  constructor(
    private login: LoginAuthService,
    private general: GeneralService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log("tok==",this.login.getLoginDetails())
    this.status = this.login.getLoginDetails();
    request = this.addAuthenticationToken(request)

    return next.handle(request).pipe(
      (take(1),
      catchError((error: any) => {
        // console.log("erooorr=", error)
        if (error.status === 403 || error.status === 401) {
            this.login.logout()
        }
        else {

        }
        return throwError(error);

      })), tap((res: any) => {
        if (res instanceof HttpResponse) {
          // console.log('tap res==', res);
          if (res.body.hasOwnProperty('data')) {
            res.body.data = this.general.decrypt(res.body.data);
          }
          return res;
        } else {
          return res;
        }
      })
    ) as any;
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    this.status = this.login.getLoginDetails();

    if (this.status.token && this.status.token != null) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.status.token}` },
      });

      if (request instanceof HttpRequest) {
        // console.log("http request==", request);
        let authHeaders = request.headers.get('authorization');
        if (authHeaders) {
          let body = request.body;
          if (body) {
            // request.body = {}
            request.body.data = this.general.encrypt(body.data);
          }
        } else {
          return request;
        }
      }
      return request;
    } else {
      return request;
    }
  }
}


*/
