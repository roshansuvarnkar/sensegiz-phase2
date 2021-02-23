import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs'
import { Router , ActivatedRoute } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
  public loginCred = new Subject<any>()
  public loginCheckStatus = new Subject<any>()
  public pageCheck = new Subject<any>()
  public authCheck = new Subject<any>()


  ENCRYPT_KEY:string=environment.ENCRYPTKEY

  decryption:string;
  constructor(private router:Router,private bnIdle: BnNgIdleService) {
      // this.loginStatus()
      // this.authData()
      console.log("init login")
       this.bnIdle.startWatching(600).subscribe((isTimedOut: boolean) => {
         console.log('session expired',isTimedOut);
         if (isTimedOut) {
           localStorage.clear();
           this.router.navigate(['/login']);
         }
       });
   }

  loginStatus(){
    var status = localStorage.getItem('sensegizlogin')
  //  var getdata=localStorage.getItem('sensegizlogin')
     // var parsedata=JSON.parse(getdata)
       //var status=CryptoJS.AES.decrypt(parsedata,this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);

    var passwordExpiry=JSON.parse(status)
    if(status  && status!='undefined' || passwordExpiry.passwordExpiry==false){
      this.loginCheckStatus.next(true)
      return true
    }
    else{
      this.loginCheckStatus.next(false)
      return false
    }
  }


  loginData(){
    var status = JSON.parse(localStorage.getItem('sensegizlogin'))
    //var getdata=localStorage.getItem('sensegizlogin')
     // var parsedata=JSON.parse(getdata)
      // this.decryption=CryptoJS.AES.decrypt(parsedata,this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
     //  var status=  var parsedata=JSON.parse(this.decryption)

    console.log("statsu======",status)
    if(status!=null){
      console.log("enter")
      return status
    }
    else{
      console.log("did not ")
      return false
    }
  }

  authData(){
    var status = JSON.parse(localStorage.getItem('sensegizlogin'))
   // var getdata=localStorage.getItem('sensegizlogin')
    //  var parsedata=JSON.parse(getdata)
    //   this.decryption=CryptoJS.AES.decrypt(parsedata,this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
     // var status=JSON.parse(this.decryption)




    // var auth=JSON.parse(status)==null?'N':JSON.parse(status)
    // console.log("inside auth==",JSON.parse(status))
    // if( auth.twoStepAuth=="N" || auth.twoStepAuth=="Y" ){
    //   this.authCheck.next(true)
    //   return true
    // }
    // else{
    //   this.authCheck.next(false)
    //   return false
    // }


    console.log("status of authdata==",status)

    if(status != null){
      if(status.role=='user' ){
        if(status.twoStepAuth=='Y' && status.passwordExpiry==false){
          var auth = localStorage.getItem('sensegizTwoStep')
          if(auth=='true'){
            var a = {status:true,role:'user'}
            return a
          }
          else{
            var a = {status:false,role:''}
            return a
          }
        }
        else if(status.twoStepAuth=='Y' && status.passwordExpiry==true){
          var a = {status:false,role:''}
          return a
        }
        else{
          if(status.twoStepAuth=="N" && status.passwordExpiry==true){
            var a = {status:false,role:''}
            return a
          }
          else{
            var a = {status:true,role:'user'}
            return a
          }

        }
      }
      else if(status.role=='admin'){
        var a = {status:true,role:'admin'}
        return a
      }
      else{
        var a = {status:false,role:''}
        return a
      }

    }
     else{
      var a = {status:false,role:''}
      return a
    }

  }
  loginStatusMenu(){
    var status = localStorage.getItem('sensegizlogin')
    var route = window.location.pathname
    // console.log("route==",route)
    if(route !='/login' && route!='/admin-login' ){
      this.loginCred.next(true)
    }
    else{
      this.loginCred.next(false)
    }
  }




  Getlogin(){
    var status = localStorage.getItem('sensegizlogin')
    //var getdata=localStorage.getItem('sensegizlogin')
     // var parsedata=JSON.parse(getdata)
     // var status=CryptoJS.AES.decrypt(parsedata,this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);

    if(status  && status!='undefined'){
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
    this.loginCheckStatus.next(false)
    this.loginCred.next(false)
    this.authCheck.next(false)
    this.router.navigate(['/login'])
  }

}
