import { Component,OnInit } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sensegiz';
  loginData:boolean=false
  loginMobData:boolean=false
  loginStatus:boolean=false
  checkUrl:any
  statusHome:boolean
  statusNotHome:boolean
  deviceStatus:boolean=true
  constructor(private login:LoginCheckService,private router:Router,private route:ActivatedRoute){
    this.loginData = this.login.loginStatus()
    this.login.loginCred.subscribe(res=>{
      console.log("login data===",res)
      this.loginData = res
      this.loginMobData=res
    })
    this.login.loginCheckStatus.subscribe(res=>{
      console.log("login data===",res)
      this.loginStatus = res
    })

  }

  ngOnInit(){
    
  }

  logout(){
    localStorage.clear()
    this.login.loginCheckStatus.next(false)
    this.login.loginCred.next(false)
    this.router.navigate(['/login'])
  }




}
