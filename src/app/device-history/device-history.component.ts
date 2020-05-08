import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.css']
})
export class DeviceHistoryComponent implements OnInit {
  deviceData:any=[]
  findData:any
  loginData:any


  constructor(private api: ApiService,private login:LoginCheckService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)


    this.route.queryParams.subscribe(params => {
        this.deviceData = JSON.parse(params.record) ;
        console.log("records=",this.deviceData )
        this.refreshFinds(this.deviceData)
    })
  }


  refreshFinds(data){
    this.api.getDeviceData(data).then((res:any)=>{
      console.log("find data ======",res);
      if(res.status){
        this.findData=res.success
      }
    })
  }


}
