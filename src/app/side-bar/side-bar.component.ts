import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  loginData:any
  findData:any=[]
  checkUrl:any

  constructor(private api: ApiService,private login:LoginCheckService,private router:Router) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.refreshFinds()
    //this.checkPage()

  }


  refreshFinds(){
    var data={
      userId:this.loginData.userId,
    }

    this.api.getAssignedDevices(data).then((res:any)=>{
      console.log("find data side bar ======",res);
      if(res.status){
        this.findData=res.success
      }
    })
  }

checkPage(){

    console.log(window.location.pathname)  // array of states
  this.checkUrl=window.location.pathname

}

  clickDevice(data){
    console.log("data====",data)
    this.router.navigate(['/device-history'], { queryParams: { record: JSON.stringify(data) } });
  }

}
