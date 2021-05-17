import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { LoginCheckService } from 'src/app/login-check.service';
import {Router} from '@angular/router'
import { GeneralMaterialsService } from 'src/app/general-materials.service';
import * as CanvasJS from 'src/app/../assets/canvasjs-2.3.2/canvasjs.min';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { HomeCountViewComponent } from 'src/app/home-count-view/home-count-view.component';
  import * as moment from 'moment';

@Component({
  selector: 'app-liverepoorting',
  templateUrl: './liverepoorting.component.html',
  styleUrls: ['./liverepoorting.component.css']
})
export class LiverepoortingComponent implements OnInit {
  date:any;
  timeout:any;
  loginData:any
  setting:any
  countPerday:any
  dataPoints:any=[]
  dates:any=[]
  month:any=[]
  day:any=[]
  hours:any=[]

  findData:any=[]
  findLen:any
  checkUrl:any

  contactTimeMax:any=[]
  contactDeviceMax:any

  totalEmp = 0;
  infectedEmp = 0;
  normalEmp = 0;
  activeEmp = 0;
  deallocateEmp =0;

  totmin:any
  pageIndex:any
  pageSize:any


  branch:boolean
  branch1:boolean

  constructor(private api: ApiService,
    private login:LoginCheckService,
    private router:Router,
    public dialog: MatDialog,
    private general:GeneralMaterialsService
  ) { }
  dayss:any;
  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.refreshSetting()
    this.numOfcontactPerDay()
    this.refresh()
    this.timeout=setInterval(()=>{this.refresh()},30*1000)
  }

  refresh(){
    this.date=new Date()
    this.refreshSetting()
    this.numOfcontactPerDay()
  }



  ngOnDestroy() {
    clearInterval(this.timeout)
  }


  refreshSetting(){
    var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      tblName:'deviceSetting'
    }
    this.api.getData(data).then((res:any)=>{
     //  console.log("setting data ======",res);
      if(res.status){
        this.setting = res.success[0]
      }
    })
  }


  progress(val){
var a=2*val;
if(a<33){
var aa={
  'background-color':'red',
  'width':a+'%'
}
return aa
}else if(a>32 && a<=65){
  var aa={
    'background-color':'yellow',
    'width':a+'%'
  }
  return aa
}else if(a>65 && a<=100){
var aa={
  'background-color':'green',
  'width':a+'%'
}
return aa
}
  }



numOfcontactPerDay(){
  var date=new Date()
  var data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
    zone:this.general.getZone(date)
  }
  this.api.getPerDayCount(data).then((res:any)=>{
    //console.log("repeated contacts data ======",res);
    if(res.status){
      this.dataPoints=[]
      this.countPerday = res.success.reverse()
      for (let i = 0; i < this.countPerday.length; i++) {
        var months=['Jan','Feb', 'Mar','Apr','May','Jun','Jul','Aug','sep','Oct','Nov','Dec']
          var dateObj=this.countPerday[i].updatedOn.split('T')
          var date=new Date(dateObj[0])
          this.month[i]=months[date.getMonth()]
          this.day[i]=date.getDate()
          this.hours[i]=moment(date).format('HH:00')
          this.dates[i]=this.hours[i]
          this.dataPoints.push(
             {
              y:this.countPerday[i].dailyCount,
              label:this.dates[i],
             }
           )
      }

      var chart = new CanvasJS.Chart("chartContainer", {
      /*   animationEnabled: true,
        zoomEnabled: true, */
        theme: "light1",
                   /*  title: {
                      text: "No. of contacts",
                      fontColor: "#ef6c00",
                    }, */
                    axisX:{
                      gridThickness: 1
                    },
                    axisY:{
                      gridThickness: 1
                    },
                    dataPointWidth: 30,
                    data: [{
                      type: "column",

                      dataPoints:this.dataPoints
                    }]
                  });

      chart.render();
      chart.destroy()
      chart=null;
      chart = new CanvasJS.Chart("chartContainer", {
       /*  animationEnabled: true,
        exportEnabled: true, */
      /*   title: {
          text: "No. of contacts",
          fontColor: "#ef6c00",
        },
 */
        axisX:{
          gridThickness: 1
        },
        axisY:{
          gridThickness: 1
        },
        dataPointWidth: 30,
        data: [{
          type: "column",

          dataPoints:this.dataPoints
        }]
      });
      chart.render();
    }

  })
 }




}
