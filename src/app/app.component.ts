import { Component,OnInit } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import { Router , ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

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
  isMobile:boolean
  isTablet:boolean
  isDesktopDevice:boolean
  deviceStatus:boolean
  deviceInfo = null;
  constructor(
    private login:LoginCheckService,
    private router:Router,
    private route:ActivatedRoute,
    private deviceService: DeviceDetectorService){
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
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(this.isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(this.isDesktopDevice); // returns if the app is running on a Desktop
   this.status()
  }

  status(){
    this.deviceStatus=this.deviceStatus==true?false:true
  }

  logout(){
    localStorage.clear()
    this.login.loginCheckStatus.next(false)
    this.login.loginCred.next(false)
    this.router.navigate(['/login'])
  }

}
