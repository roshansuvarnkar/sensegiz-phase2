import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCheckService } from '../login-check.service';
import { ApiService } from '../api.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { WebsocketService } from '../websocket.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Loginform: FormGroup;
  public loginInvalid: boolean;
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  newPassword: boolean = false;
  forgetPwd: any;
  decryptedData: any;
  ENCRYPT_KEY: string = environment.ENCRYPTKEY;
  encryption: string;
  decryption: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginCheckService,
    private api: ApiService,
    private general: GeneralMaterialsService,
    private socket: WebsocketService
  ) {}

  ngOnInit(): void {
    // this.forgetPwd="hello"
    this.login.loginStatusMenu();
    this.Loginform = this.fb.group({
      userName: ['', Validators.email],
      password: ['', Validators.required],
    });
    localStorage.clear();
  }


  onSubmit(data) {
    this.loginInvalid = false;
   // console.log("log data==",data);
    if (this.Loginform.valid) {
      try {
        data.system = 'portal';
        this.api
          .send(data)
          .then((res: any) => {
        //  console.log('logged in==', res);
            localStorage.setItem('token', JSON.stringify(res.token));
            var passwordExpiry = res.hasOwnProperty('alreadyExisted');
            //console.log(passwordExpiry);
            if (res.status) {
              res.success.role = 'user';
              res.success.passwordExpiry = passwordExpiry;

                if (this.login.login(res.success) && res.success.twoStepAuth != 'Y' && !passwordExpiry ) {
                this.login.authCheck.next(true);
                this.socket.joinRoom();
                this.router.navigate(['/home']);
              } else if (
                this.login.login(res.success) &&
                passwordExpiry == true
              ) {
                //console.log('expired');
                this.newPassword = true;
              } else {
                this.newPassword = false;
                this.forgetPwd = 'twoStepAuth';
                this.login.authCheck.next(true);

                this.router.navigate(['/two-step-auth'], {
                  queryParams: { type: JSON.stringify(this.forgetPwd) },
                });
              }
            } else {
              this.loginInvalid = true;
              localStorage.clear();
            }
          })
          .catch((err) => {
           // console.log('err======', err);
          });
      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon =
      this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }

  forgetPassword() {
    this.forgetPwd = 'forgetPassword';
    this.router.navigate(['/two-step-auth'], {
      queryParams: { type: JSON.stringify(this.forgetPwd) },
    });
  }
}
