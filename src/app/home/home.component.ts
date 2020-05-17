import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router'
import { GeneralMaterialsService } from '../general-materials.service';
import * as CanvasJS from '../../assets/canvasjs-2.3.2/canvasjs.min';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { HomeCountViewComponent } from '../home-count-view/home-count-view.component';


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
setting:any
contactTimeMax:any
contactDeviceMax:any
countPerday:any
totalEmp = 0;
infectedEmp = 0;
normalEmp = 0;
activeEmp = 0;
totMin:any=[]
date:any=[]
month:any=[]
day:any=[]
  constructor(private api: ApiService,
  private login:LoginCheckService,
  private router:Router,
  public dialog: MatDialog,
  private general:GeneralMaterialsService
) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    // this.checkUrl = this.router.url
    this.refreshFinds()
    this.refreshCount()
    this.refreshSetting()
    this.maximumContactTime()
    this.repeatedContacts()
    this.numOfcontactPerDay()



}

sendWarning(){
  var data={
    userId:this.loginData.userId
  }
  // var msg="This feature is not avilable"
  // this.general.openSnackBar(msg,'')

}
refreshFinds(){
  var data={
    userId:this.loginData.userId,
  }

  this.api.getAssignedDevices(data).then((res:any)=>{
    console.log("find data ======",res);
    if(res.status){
      this.findData=res.success
        this.findLen=this.findData.length
    }
  })
}

activeUser(){
  var data={
    userId:this.loginData.userId,
    type:'active'
  }
  this.api.getHomeCountData(data).then((res:any)=>{
        if(res.status){
           this.activeEmp = res.success
           console.log("Active users===",this.activeEmp)
           const dialogConfig = new MatDialogConfig();
           dialogConfig.disableClose = true;
           dialogConfig.autoFocus = true;
           dialogConfig.height = '90vh';
           dialogConfig.width = '75vw';
           dialogConfig.data = {
             type:"activeUserData",
             data:this.activeEmp
             
           }
           const dialogRef = this.dialog.open(HomeCountViewComponent, dialogConfig);
   
           dialogRef.afterClosed().subscribe(result => {
             this.refreshFinds()
           });
      
    }
  })

}
infectedUser(){
  var data={
    userId:this.loginData.userId,
    type:'infected'
  }
  this.api.getHomeCountData(data).then((res:any)=>{
    console.log("count data ======",res);
    if(res.status){
      this.infectedEmp = res.success
      console.log("Infected users===",this.infectedEmp)
           const dialogConfig = new MatDialogConfig();
           dialogConfig.disableClose = true;
           dialogConfig.autoFocus = true;
           dialogConfig.height = '90vh';
           dialogConfig.width = '75vw';
           dialogConfig.data = {
             type:"infectedUserData",
             data:this.infectedEmp
             
           }
           const dialogRef = this.dialog.open(HomeCountViewComponent, dialogConfig);
   
           dialogRef.afterClosed().subscribe(result => {
             this.refreshFinds()
           });
      
    }
  })

}
normalUser(){
  var data={
    userId:this.loginData.userId,
    type:'normal'
  }
  this.api.getHomeCountData(data).then((res:any)=>{
    console.log("count data ======",res);
    if(res.status){
      this.normalEmp = res.success
      console.log("Normal users===",this.normalEmp)
           const dialogConfig = new MatDialogConfig();
           dialogConfig.disableClose = true;
           dialogConfig.autoFocus = true;
           dialogConfig.height = '90vh';
           dialogConfig.width = '75vw';
           dialogConfig.data = {
             type:"normalUserData",
             data:this.normalEmp
             
           }
           const dialogRef = this.dialog.open(HomeCountViewComponent, dialogConfig);
   
           dialogRef.afterClosed().subscribe(result => {
             this.refreshFinds()
           });
      
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



refreshSetting(){
  var data={
    userId:this.loginData.userId,
    tblName:'deviceSetting'
  }
  this.api.getData(data).then((res:any)=>{
    console.log("setting data ======",res);
    if(res.status){
      this.setting = res.success[0]
    }
  })
}



maximumContactTime(){
  var data={
    userId:this.loginData.userId,
  }
  this.api.getMaxTimeContact(data).then((res:any)=>{
    console.log("max contact time ======",res);
    if(res.status){
      this.contactTimeMax = res.success
      for(var i=0;i<this.contactTimeMax.length;i++){
        var hms = this.contactTimeMax[i].totTime
        var a = hms.split(':')
        this.totMin[i]=Math.round((+a[0]*60) + (+a[1] ) + ((+a[2])/60) )

      }
        for(var i=0;i<this.contactTimeMax.length;i++){
          console.log("minutes==",this.totMin[i])
        }
    }
  })

}

repeatedContacts(){
  var data={
    userId:this.loginData.userId,
  }
  this.api.getMaxContactDevice(data).then((res:any)=>{
    console.log("max contact devices data ======",res);
    if(res.status){
      this.contactDeviceMax = res.success

    }
  })

}

numOfcontactPerDay(){
  var data={
    userId:this.loginData.userId,
  }
  this.api.getPerDayCount(data).then((res:any)=>{
    console.log("repeated contacts data ======",res);
    if(res.status){
      this.countPerday = res.success
      // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      //   for(let i=0;i<this.countPerday.length-1;i++){
      //     var dateObj=new Date(this.countPerday[i].updatedOn)
      //     console.log("date==",dateObj)
      //    this.month[i] = months[dateObj.getUTCMonth()]
      //    console.log("updatedon==",this.month[i])
      //    this.day[i] = dateObj[0].getUTCDate() -i
      // }
      // for (let i = 0; i < 10; i++) {
      //   this.date[i] =this.month[i] + " "+ this.day[i]
      //     console.log(this.date[i])
      // }

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
                        { y: this.countPerday[0].dailyCount, label: 'May 1'},
                        { y: this.countPerday[0].dailyCount, label: 'May 2'},
                        { y: this.countPerday[1].dailyCount, label: 'May 3'},
                        { y: this.countPerday[2].dailyCount, label: 'May 4'},
                        { y: this.countPerday[3].dailyCount, label: 'May 5'},
                        { y: this.countPerday[4].dailyCount, label: 'May 6'}



                        // { y: this.countPerday[0].dailyCount, label: this.date[9] },
                        // { y: this.countPerday[1].dailyCount, label: this.date[8] },
                        // { y: this.countPerday[2].dailyCount, label: this.date[7] },
                        // { y: this.countPerday[3].dailyCount, label: this.date[6] },
                        // { y: this.countPerday[4].dailyCount, label: this.date[5] },
                        // { y: this.countPerday[5].dailyCount, label: this.date[4] },
                        // { y: this.countPerday[6].dailyCount, label: this.date[3] },
                        // { y: this.countPerday[7].dailyCount, label: this.date[2] },
                        // { y: this.countPerday[8].dailyCount, label: this.date[1] },
                        // { y: this.countPerday[9].dailyCount, label: this.date[0] }
                      ]
                    }]
                  });

  chart.render();
    }
  })

}

}
