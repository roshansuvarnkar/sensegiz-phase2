import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
  public loginCred = new Subject<any>()

  constructor() {
    this.loginStatusMenu()
   }


  loginStatus(){
    var status = localStorage.getItem('sensegizlogin')
    if(status){
      return true
    }
    else{
      return false
    }
  }


  loginStatusMenu(){
    var status = localStorage.getItem('sensegizlogin')
    if(status){
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
    this.loginStatusMenu()
    return true
  }

  logout(){
    localStorage.clear()
    this.loginStatusMenu()
    return true
  }

}
