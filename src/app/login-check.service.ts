import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Router , ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
  public loginCred = new Subject<any>()
  public loginCheckStatus = new Subject<any>()
  public pageCheck = new Subject<any>()

  constructor(private router:Router) {
      this.loginStatus()
   }


  loginStatus(){
    var status = localStorage.getItem('sensegizlogin')
    if(status){
      this.loginCheckStatus.next(true)
      return true
    }
    else{
      this.loginCheckStatus.next(false)
      return false
    }
  }


  loginData(){
    var status = localStorage.getItem('sensegizlogin')
    if(status){
      return JSON.parse(status)
    }
    else{
      return false
    }
  }


  loginStatusMenu(){
    var status = localStorage.getItem('sensegizlogin')
    var route = window.location.pathname
    console.log("route==",route)
    if(route !='/login' && route!='/admin-login'){
      this.loginCred.next(true)
    }
    else{
      this.loginCred.next(false)
    }
  }




  Getlogin(){
    var status = localStorage.getItem('sensegizlogin')
    if(status){
      return status
    }
    else{
      return false
    }
  }


  login(data){
    localStorage.setItem('sensegizlogin',data)
    return true
  }

  logout(){
    localStorage.clear()
    return true
  }

}
