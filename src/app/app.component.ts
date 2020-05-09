import { Component,OnInit } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sensegiz';
  loginData:boolean=false
  checkUrl:any
  statusHome:boolean
  statusNotHome:boolean
  constructor(private login:LoginCheckService,private router:Router,private route:ActivatedRoute){
    this.loginData = this.login.loginStatus()
    this.login.loginCred.subscribe(res=>{
      console.log("login data===",res)
      this.loginData = res
    })

  }

  ngOnInit(){
    // this.login.pageCheck.subscribe(res=>{
    //   this.checkUrl=res.page
    //
    //     console.log("url====",this.checkUrl);
    // });
    //
    //   this.router.events.subscribe((url:any) => console.log(url));
    //   console.log(router.url);
    //console.log(window.location.pathname)  // array of states
// this.checkUrl=window.location.pathname


  }

  logout(){
    if(this.login.logout()){
      this.router.navigate(['/login'])
    }
  }




}
