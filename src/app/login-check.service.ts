import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
  public loginCred = new Subject<any>()
  public pageCheck = new Subject<any>()

  constructor() {
    this.loginStatusMenu()
   }


  loginStatus(){
    this.checkPage()
    var status = localStorage.getItem('sensegizlogin')
    if(status){
      return true
    }
    else{
      return false
    }
  }

  checkPage(){
    this.pageCheck.next({page:window.location.pathname})
  }

  loginStatusMenu(){
    this.checkPage()

    var status = localStorage.getItem('sensegizlogin')
    if(status){
      this.loginCred.next(true)
    }
    else{
      this.loginCred.next(false)
    }
  }




  Getlogin(){
    this.checkPage()

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
