import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
findData:any=[]
loginData:any
findLen:any
checkUrl:any
  constructor(private api: ApiService,
  private login:LoginCheckService,
  private router:Router
) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    // this.checkUrl = this.router.url
    this.refreshFinds()


}
refreshFinds(){
  var data={
    userId:this.loginData.userId,
    tblName:'deviceRegistration'
  }

  this.api.getData(data).then((res:any)=>{
    console.log("find data ======",res);
    if(res.status){
      this.findData=res.success
        this.findLen=this.findData.length
    }
  })
}
}
