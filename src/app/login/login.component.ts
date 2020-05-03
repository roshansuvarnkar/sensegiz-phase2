import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    Loginform: FormGroup;
   public loginInvalid: boolean;
   passwordType: string = 'password';
   passwordIcon: string = 'visibility_off';

   constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
    ) {
    }


  ngOnInit(): void {
    this.Loginform = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

 onSubmit(data) {
    this.loginInvalid = false;
    if (this.Loginform.valid) {
      try {
        const username = data.username;
        const password = data.password;
      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }



  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }




}
