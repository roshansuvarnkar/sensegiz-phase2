import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { LoginCheckService } from 'src/app/login-check.service';
import {Router} from '@angular/router'
import { GeneralMaterialsService } from 'src/app/general-materials.service';
import * as CanvasJS from 'src/app/../assets/canvasjs-2.3.2/canvasjs.min';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { HomeCountViewComponent } from 'src/app/home-count-view/home-count-view.component';
  import * as moment from 'moment';
  import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-liverepoorting',
  templateUrl: './liverepoorting.component.html',
  styleUrls: ['./liverepoorting.component.css']
})
export class LiverepoortingComponent implements OnInit {

  color = 'primary';
  value = 50;

updatedTime:any;
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
  locationOccupency:any=[]
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
   // this.numOfcontactPerDay()
    this.locationAccupencygetData()
    this.refresh()
    this.timeout=setInterval(()=>{this.refresh()},30*1000)
  }

  refresh(){
    this.refreshSetting()
   // this.numOfcontactPerDay()
    this.locationAccupencygetData()
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
locationAccupencygetData(){
  var data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
  }
  //console.log(data)
 this.api.locationAccupencyData(data).then((res:any)=>{

   this.updatedTime=new Date(res.lastUpdatedAt)
  // console.log(this.updatedTime)
   //this.locationOccupency=[]
   if(res.success){
    this.locationOccupency=[]
    // this.locationOccupency=res.success
   for (let i = 0; i <res.success.length; i++) {
      this.locationOccupency.push(
        {
          coinId:res.success[i].coinId,
          coinName:res.success[i].coinName,
          latestStatus:res.success[i].latestStatus,
          maximumOccupancy: res.success[i].maximumOccupancy,
          remainingOccupancy:res.success[i].remainingOccupancy<0 ? '0':res.success[i].remainingOccupancy,
          t2C: res.success[i].t2C,
          totalOccupancy: res.success[i].totalOccupancy,
          userId: res.success[i].userId,
        })
     }
   }

 })
}

  progress(val){
var a=Math.round((val.remainingOccupancy/val.maximumOccupancy)*100)
 if(a<33){
  if(a==0){
    var aa={
      'background-color':'red',
      'width':100+'%'
    }
    return aa
  }else if(a>=0 && a<33){
    var aa={
      'background-color':'red',
      'width':a+'%'
    }
    return aa
  }
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


/*
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
       //animationEnabled: true,
        //zoomEnabled: true,
        theme: "light1",
                 //  title: {
                    //  text: "No. of contacts",
                    //  fontColor: "#ef6c00",
                  //  },
                    axisX:{
                      gridThickness: 1
                    },
                    axisY:{
                      gridThickness: 1
                    },
                    dataPointWidth: 30,
                    data: [{
                      type: "column",
                      color:'#56d22d',
                      dataPoints:this.dataPoints
                    }]
                  });

      chart.render();
      chart.destroy()
      chart=null;
      chart = new CanvasJS.Chart("chartContainer", {
       // animationEnabled: true,
       // exportEnabled: true,
      //  title: {
         /// text: "No. of contacts",
        //  fontColor: "#ef6c00",
       // },

        axisX:{
          gridThickness: 1
        },
        axisY:{
          gridThickness: 1
        },
        dataPointWidth: 30,

        data: [{
          type: "column",
          color:'#56d22d',
          dataPoints:this.dataPoints
        }]
      });
      chart.render();
    }

  })
 } */


}
