import { Component,OnInit } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sensegiz';
  loginData:boolean=false

  constructor(private login:LoginCheckService,private router:Router){
    this.loginData = this.login.loginStatus()
    this.login.loginCred.subscribe(res=>{
      console.log("login data===",res)
      this.loginData = res
    })
  }

  ngOnInit(){
    
  }

  logout(){
    if(this.login.logout()){
      this.router.navigate(['/login'])
    }
  }




}
