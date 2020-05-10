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

  }

  logout(){
    if(this.login.logout()){
      this.router.navigate(['/login'])
    }
  }




}
