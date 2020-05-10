import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router'
import * as CanvasJS from '../../assets/canvasjs-2.3.2/canvasjs.min';

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
totalEmp = 0;
infectedEmp = 0;
normalEmp = 0;
activeEmp = 0;
intervalId
  constructor(private api: ApiService,
  private login:LoginCheckService,
  private router:Router
) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    // this.checkUrl = this.router.url
    this.refreshFinds()
    this.refreshCount()
    let chart = new CanvasJS.Chart("chartContainer", {
                  animationEnabled: true,
                  exportEnabled: true,
                  title: {
                    text: "No. of contacts",
                    fontColor: "#ef6c00",
                  },
                  axisY:{
                    gridThickness: 0
                  },
                  dataPointWidth: 30,
                  data: [{
                    type: "column",
                    dataPoints: [
                      { y: 1, label: "May 1" },
                      { y: 3, label: "May 2" },
                      { y: 6, label: "May 3" },
                      { y: 2, label: "May 4" },
                      { y: 5, label: "May 5" },
                      { y: 4, label: "May 6" },
                      { y: 10, label: "May 7" },
                      { y: 8, label: "May 8" },
                      { y: 3, label: "May 9" }
                    ]
                  }]
                });

chart.render();

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



refreshCount(){
  var data={
    userId:this.loginData.userId,
  }
  this.api.getCountData(data).then((res:any)=>{
    console.log("count data ======",res);
    if(res.status){
      this.totalEmp = res.success[0].totalEmp
      this.infectedEmp = res.success[1].inectedEmp
      this.normalEmp = res.success[2].normalEmp
      this.activeEmp = res.success[3].activeEmp
      // this.findData=res.success
      // this.findLen=this.findData.length
    }
  })
}
}
