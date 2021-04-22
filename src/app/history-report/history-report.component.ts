import { Component, OnInit,Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Timestamp } from 'rxjs';

import { OrderContactComponent } from '../order-contact/order-contact.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { exit } from 'process';



@Component({
  selector: 'app-history-report',
  templateUrl: './history-report.component.html',
  styleUrls: ['./history-report.component.css']
})
export class HistoryReportComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('htmlData') htmlData:ElementRef;

  type:any
  dateBased:any
  findNameBased:any
  summaryData:any=[]
  excelData:any=[]
  locGeoData:any=[]
  countCummulative=[]
  dataSource:any
  loginData:any
  from:any
  to:any
  from1:any
  to1:any
  index:any
  selectedValue:any
  deviceName:any
  currentPageLength:any=10
  currentPageSize:any=10
  displayedColumns: string[] = ['i','baseName','contactName','empId','department','location','startTime', 'updatedOn', 'totaltime'];
  displayedColumns1: string[] = ['i','contactName','department','location', 'updatedOn', 'totaltime'];
  displayedColumns2: string[] = ['contactDeviceName','updatedOn'];
  displayedColumns3: string[] = ['i','deviceName','department','inTime', 'outTime','totTime'];
  displayedColumns4: string[] = ['i','coinName','department','geofenceStatus','inTime', 'outTime','totTime'];
  displayedColumns5: string[] = ['i','username','department','count','totTime'];
  displayedColumns6: string[] = ['i','deviceId','deviceName','department','dataReceivedTime','updatedOnLoc'];
  displayedColumns7: string[] = ['i','username','department','count','totTime'];
  displayedColumns8: string[] = ['i','deviceName','temperature','temperatureTimestamp']
  department:any
  fileName:any
  locationData:any=[]
  locationName:any
  locationId:any
  title:any
  time:any
  date:any
  date2:any
  coinData:any=[]
  liveData:any=[]
  totTime:any=[]
  limit:any
  offset:any
  selectMin:FormGroup
  inDate:any
  outDate:any
  inoutTime:any
  deviceIdData:any
  status:any
  customData:any
  sync:any;
    constructor(
      public dialog: MatDialog,
      private api: ApiService,
      private login:LoginCheckService,
      private general:GeneralMaterialsService,
      private router:Router,
      private fb:FormBuilder,
      public dialogRef: MatDialogRef<HistoryReportComponent>,
       @Inject(MAT_DIALOG_DATA)  data,
    ) {
      this.type=data.type
     // console.log("type==",this.type)
      this.liveData = data.data
     // console.log("data==",data)
      this.from = data.fromDate
      this.to = data.toDate
      this.from1 = data.fromDate1
      this.to1 = data.toDate1
      this.date=data.date
      this.selectedValue=data.valueSelected
      this.deviceName=data.deviceName
      this.locationName=data.locationName
      this.locationId=data.locationId
      this.date=data.date
      this.status=data.status
      this.department=data.department
      this.sync=data.sync
     }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.selectMin=this.fb.group({
      minute:['']
    })
    this.getTotalCount()
    this.loadData()
  }

  getTotalCount(){
    if(this.type=='basedOnDate'){
      var data={
        userId:this.loginData.userId,
        subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
        fromDate: this.from,
        toDate:this.to,
        zone:this.general.getZone(this.date)
      }

      this.api.getHistoryDateReportTotalCount(data).then((res:any)=>{
      //  console.log("length of report on date ======",res);
        if(res.status){
          // console.log('\nTotal response: ',res.success[0].count);
          this.currentPageLength = parseInt(res.success[0].count);

        }
      })

    }
    if(this.type=='custom'){
      var date=new Date()
      var data23={
        userId:this.loginData.userId,
        sync:this.sync,
        zone:this.general.getZone(date),
        fromDate: this.from,
        subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      }
      this.api.OnlineOfflineReportCount(data23).then((res:any)=>{
        //console.log(res)
        if(res.status){
          this.currentPageLength = parseInt(res.success[0].count);
        }

      })
    }
  if(this.type=='basedOnFindName'){
    var data1={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      deviceName:this.deviceName,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(this.date)

    }

    this.api.getHistoryNameReportTotalCount(data1).then((res:any)=>{
    //  console.log("length of report on device name ======",res);
      if(res.status){
        // console.log('\nTotal response: ',res.success[0].count);
        this.currentPageLength = parseInt(res.success[0].count);
        // this.tempLen=this.currentPageLength
      }
    })

  }

  if(this.type=='locationReport'){
    var data2={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      coinId:this.locationId,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(this.date)
    }

    this.api.getLocationHistoryRowCount(data2).then((res:any)=>{
     //console.log("length of location report on device name ======",res);
      if(res.status){
        // console.log('\nTotal response: ',res.success[0].count);
        this.currentPageLength = parseInt(res.success[0].count);
        // this.tempLen=this.currentPageLength
      }
    })

  }
  /* ---------------------------------------------------------------------------------------- */

  if(this.type=='cummulative'){
    date=new Date()
    var data9={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(date)
    }
     this.api.viewCTReportCount(data9).then((res:any)=>{
    //console.log("length of location report on device name ======",res);
      if(res.status){
        // console.log('\nTotal response: ',res.success[0].count);
        this.currentPageLength = parseInt(res.success[0].count);
        // this.tempLen=this.currentPageLength
      }else{
        this.currentPageLength = parseInt(res.success[0].count);
      }
    })

  }
  /* -------------------------------------------------------------- */
  if(this.type=='geoFenceReport'){
    var data3={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      deviceName:this.deviceName,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(this.date)
    }

      this.api.getGeofenceReportRowCount(data3).then((res:any)=>{
       // console.log("length of geo fence report on device name ======",res);
        if(res.status){
           //console.log('\nTotal response: ',res.success[0].count);
          this.currentPageLength = parseInt(res.success[0].count);
          // this.tempLen=this.currentPageLength
        }
      })

    }

     if(this.type=='temperature'){
      var data5={
        userId:this.loginData.userId,
        subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
        deviceName:this.deviceName,
        fromDate: this.from,
        toDate:this.to,
        zone:this.general.getZone(this.date)
      }

        this.api.temperatureDataCount(data5).then((res:any)=>{
      //  console.log("length of geo fence report on device name ======",res);
          if(res.status){
            // console.log('\nTotal response: ',res.success[0].count);
            this.currentPageLength=parseInt(res.success[0].count);

          // console.log( this.currentPageLength)
            // this.tempLen=this.currentPageLength
          }
        })

      }

    if(this.type=='deptcummulative'){
      var date=new Date()
      var data6={
        userId:this.loginData.userId,
        subUserId:this.department,
        deviceName:this.deviceName,
        fromDate: this.from,
        toDate:this.to,
        zone:this.general.getZone(date)
      }

        this.api.getDepartmentReportTotalCount(data6).then((res:any)=>{
       //  console.log("length of deportment wise report on device name ======",res);

          if(res.status){
            this.currentPageLength=parseInt(res.count)
         // console.log('\nTotal response: ',res.count);
           // this.currentPageLength = parseInt(res.success[0].count);
            // this.tempLen=this.currentPageLength
          }else{
            this.currentPageLength=parseInt(res.count)
          }
        })

      }


  }



  basedOnDate(limit,offset){
   // console.log(limit,offset)
    var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      fromDate: this.from,
      toDate:this.to,
      limit:limit,
      offset:offset,
      zone:this.general.getZone(this.date)
    }
   // console.log("data==",data)
    this.api.getDeviceHistoryBasedOnDate(data).then((res:any)=>{
    //  console.log("find data based on date ======",res);
      this.liveData=[]
      this.totTime=[]
      if(res.status){
        this.totTime=res.success
        // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
        for(var i=0;i<res.success.length;i++){

          this.liveData.push({
          i:i+1,
          baseName:res.success[i].baseName,
          contactName:res.success[i].contactName,
          empId:res.success[i].empId==null || res.success[i].empId==''?'-':res.success[i].empId,
          department:res.success[i].department,
          location:res.success[i].location,
          updatedOn:res.success[i].updatedOn,
          startTime:this.general.startTime(res.success[i].totalTime,res.success[i].updatedOn),
          totalTime:this.general.convertTime(res.success[i].totalTime)

        })
        }

        this.dataSource = new MatTableDataSource(this.liveData);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          // this.paginator.length = this.currentPageLength
        })
      }
    // }
    // else{
    //   this.totTime=res.success
    //   console.log("this.tottttttt===",this.totTime)

    //   if(this.selectMin.get('minute').value!=''){
    //     console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)

    //     this.filterTotTime(this.selectMin.get('minute').value)

    //   }
    // }

    })

  }

  basedOnFindName(limit,offset){
    var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      deviceName:this.deviceName,
      fromDate: this.from,
      toDate:this.to,
      offset:offset,
      limit:limit,
      zone:this.general.getZone(this.date)

    }
    this.liveData=[]
    this.totTime=[]
    this.api.getDeviceHistoryBasedOnDeviceName(data).then((res:any)=>{
    // console.log("find data based on name ======",res);

      if(res.status){

          this.liveData=res.success

          this.totTime=res.success

        // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
        this.dataSource = new MatTableDataSource(this.liveData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          // this.paginator.length = this.currentPageLength
        })
        // }
        // else{
        //   this.totTime=res.success
        //   console.log("this.tottttttt===",this.totTime)

        //   if(this.selectMin.get('minute').value!=''){
        //     console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)

        //     this.filterTotTime(this.selectMin.get('minute').value)

        //   }
        // }
      }
    })

  }

//   summaryReport(){

//       var data={
//         userId:this.loginData.userId,
//         deviceName:this.deviceName,
//         fromDate: this.from,
//         toDate:this.to,
//         zone:this.general.getZone(this.date)

//       }
//       this.api.getSummaryReport(data).then((res:any)=>{
//         console.log("summary report======",res);

//         this.liveData=[]
//         if(res.status){

//           var groupDate = this.dataDateReduce(res.success)
//           // console.log("groupDate===",groupDate)
//           this.liveData = Object.keys(groupDate).map((data)=>{

//             return {
//               date : data,
//               data : groupDate[data]
//             }
//           })

//           for(let i=0;i<this.liveData.length;i++){

//             for(let j=0;j<this.liveData[i].data.length-1;j++){
//               this.liveData[i].data[j].contactDeviceName = this.liveData[i].data[j].contactDeviceName+','
//             }

//             this.liveData[i].data[this.liveData[i].data.length-1].contactDeviceName=this.liveData[i].data[this.liveData[i].data.length-1].contactDeviceName+'.'

//            }


//         }
//       })
//     }


// dataDateReduce(data){
//   return data.reduce((group,obj)=>{
//     const date = obj.updatedOn.split('T')[0]
//     if(!group[date]){
//       group[date]=[]
//     }
//     group[date].push(obj)
//     return group
//   },{})
// }

summaryReport(limit,offset){
  var date=new Date()
  var data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
    deviceName:this.deviceName,
     fromDate: this.from,
     toDate:this.to,
    type:this.status,
    limit:limit,
    offset:offset,
    zone:this.general.getZone(date)
  }
 //console.log("Sumaary data==",data)
  this.api.getSummaryReport(data).then((res:any)=>{
  //console.log("summary report======",res);
    this.liveData=[]
    this.locationData=[]
    this.deviceIdData=[]

    if(res.status){
      this.deviceIdData=this.deviceId(res.success)
      var groupUser = this.dataDateReduce(res.success)
     this.locationData=this.location(res.success)
    //  console.log("locationData===",this.locationData)
      this.liveData = Object.keys(groupUser).map((data)=>{
        // for(let i=0;i<res.success.length;i++){
        //   if(res.success[i].contactDeviceName ==this.deviceName || res.success[i].baseDeviceName ==this.deviceName ){
        //     this.department=res.success[i].department != null? res.success[i].department: '-'
        //     break;
        //   }
        // }
        return {
          date : groupUser[data],
          data : data
        }
      })
      // console.log("live==",this.liveData)

      // for(let i=0;i<this.liveData.length;i++){

      //   for(let j=0;j<this.liveData[i].date.length-1;j++){
      //     this.liveData[i].date[j].updatedOn = this.liveData[i].date[j].updatedOn.split('T')[0]+','
      //   }

      //   this.liveData[i].date[this.liveData[i].date.length-1].updatedOn=this.liveData[i].date[this.liveData[i].date.length-1].updatedOn.split('T')[0]+'.'

      //  }


    }
  })
}


dataDateReduce(data){
  return data.reduce((group,obj)=>{
  // console.log(obj.contactDeviceName.toLowerCase() == this.deviceName.toLowerCase())
  const name = obj.contactDeviceName.toLowerCase().trim() == this.deviceName.toLowerCase().trim()?obj.baseDeviceName.trim(): obj.contactDeviceName.trim()

  // console.log("this.deviceName====",this.deviceName)
  if(name.toLowerCase().trim()!=this.deviceName.toLowerCase()){
      if(!group[name]){
        group[name]=[]
      }
      group[name].push(obj)
    }
   // console.log("group==",group , name)
    return group

  },{})
}
callUpdatedon(date){
  var a=[]
  var data=date.filter((obj,index)=>{
    //  console.log(obj.updatedOn)
     if(!a.includes(obj.updatedOn)){
       a.push(obj.updatedOn)
     }

  })
  // console.log("aaa==",a)
  return a
}

departments(date){
  var a=[]
  var data=date.filter((obj,index)=>{
    //  console.log(obj.updatedOn)
    if(obj.department!= null){
      if(!a.includes(obj.department)){

        a.push(obj.department)

     }

    }


  })
  // console.log("aaa dept==",a)
  return a
}

location(loc){
   //console.log("loc===",loc)
  var a=[]
  var locArr=[]
  for(let i=0;i<loc.length;i++){
    var arr=loc[i].location.split(',')
    for(let j=0;j<arr.length;j++){
      // locArr.push(arr[j].toUpperCase())
      if(!a.includes(arr[j])){
        if(arr[j]!='-' && arr[j] !='')
          {
            a.push(arr[j])
          }
      }
    }
  }

  a[a.length-1]= a[a.length-1]+'.'
  return a
}
cummulativeReport(limit,offset){
  var date=new Date()
  var data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
    fromDate: this.from,
    toDate:this.to,
    limit:limit,
    offset:offset,
    zone:this.general.getZone(date)
  }
  //console.log("hvhs======",data)
  this.api.viewCTReport(data).then((res:any)=>{
    this.liveData=[]
    this.totTime=[]
  //console.log("cummulative report==========",res)
    if(res.status){
      this.totTime=res.success;
      // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
        //console.log("this.selectMin.get('minute').value else===",this.selectMin.get('minute').value)
        for(let i=0;i<res.success.length;i++){
          this.liveData.push({
            i:i+1,
            username:res.success[i].baseDeviceName,
            count:res.success[i].count,
            department:res.success[i].department,
            totTime:this.general.convertTime(res.success[i].totalTime)

          });
        }
        this.dataSource = new MatTableDataSource(this.liveData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
         // this.dataSource.paginator = this.paginator
           })

      // }
      // else{
      //   this.totTime=res.success
      //   console.log("this.tottttttt===",this.totTime)

      //   if(this.selectMin.get('minute').value!=''){
      //     console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)

      //     this.filterTotTime(this.selectMin.get('minute').value)

      //   }
      // }

    }
  })

}



departmentReport(limit,offset){
  var date=new Date()
  var data={
    userId:this.loginData.userId,
    subUserId:this.department,
    fromDate: this.from,
    toDate:this.to,
    offset:offset,
    limit:limit,
    department:this.department,
    zone:this.general.getZone(date),
  }

//        console.log("data3==",data)

  this.api.getDepartmentreport(data).then((res:any)=>{
     // console.log("department history======",res);
    this.liveData=[]
    this.totTime=[]
    if(res.status){
      this.totTime=res.success
     // console.log("location ====",this.totTime)
      // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
        for(let i=0;i<res.success.length;i++){
          this.liveData.push({
            i:i+1,
            username:res.success[i].baseDeviceName,
            count:res.success[i].count,
            department:res.success[i].department,
            totTime:this.general.convertTime(res.success[i].totalTime)

          });
        }

    this.dataSource = new MatTableDataSource(this.liveData);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator
      })
    // }
    // else{
    //   this.totTime=res.success
    //   console.log("this.tottttttt===",this.totTime)

    //   if(this.selectMin.get('minute').value!=''){
    //     console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)

    //     this.filterTotTime(this.selectMin.get('minute').value)

    //   }
    // }

   }
})
}





locationReport(limit,offset){

    var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      coinId:this.locationId,
      fromDate: this.from,
      toDate:this.to,
      offset:offset,
      limit:limit,
      zone:this.general.getZone(this.date)

    }
   // console.log("data3==",data)
    this.api.getLocationHistory(data).then((res:any)=>{
     // console.log("LocatSion history======",res);
      this.liveData=[]
      this.totTime=[]
      if(res.status){
        this.totTime=res.success
      //  console.log("location ====",this.totTime)
        // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
        for(let i=0;i<res.success.length;i++){
          this.liveData.push({
            i:i+1,
            deviceName:res.success[i].deviceName,
            department:res.success[i].department,
            inTime:res.success[i].inTime == '0000-00-00 00:00:00' || res.success[i].inTime == null?'-':res.success[i].inTime,
            outTime:res.success[i].outTime == '0000-00-00 00:00:00'  || res.success[i].outTime == null?'-':res.success[i].outTime,
            totTime:this.general.totalTime(res.success[i].inTime,res.success[i].outTime)
            // geofenceStatus:res.success[i].geofenceStatus == 1?'Exited':'Entered',
            // status:res.success[i].status == 'Y'?'Geo fence not configured':'-'

          });
        }


      this.dataSource = new MatTableDataSource(this.liveData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator
        })
      // }
      // else{
      //   this.totTime=res.success
      //   console.log("this.tottttttt===",this.totTime)

      //   if(this.selectMin.get('minute').value!=''){
      //     console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)

      //     this.filterTotTime(this.selectMin.get('minute').value)

      //   }
      // }

     }
  })
}


geofenceAndlocationReport(limit,offset){
  var data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
    deviceName:this.deviceName,
    fromDate: this.from,
    toDate:this.to,
    offset:offset,
    limit:limit,
    zone:this.general.getZone(this.date)
  }
   //console.log("data3==+++",data)
  this.api.getGeofenceReport(data).then((res:any)=>{
   // console.log("Location and geo fence history======",res);
    this.liveData=[]
    this.totTime=[]
    if(res.status){
      this.totTime=res.success
      // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
      for(let i=0;i<res.success.length;i++){

        this.liveData.push({
          i:i+1,
          coinName:res.success[i].coinName == null?'Not available':res.success[i].coinName,
          department:res.success[i].department,
          inTime:res.success[i].inTime == '0000-00-00 00:00:00'|| res.success[i].inTime == null?'-':res.success[i].inTime,
          outTime:res.success[i].outTime == '0000-00-00 00:00:00' || res.success[i].outTime == null?'-':res.success[i].outTime,
          totTime:this.general.totalTime(res.success[i].inTime,res.success[i].outTime),
          geofenceStatus:res.success[i].geofenceStatus == 0?'Entered location ':res.success[i].geofenceStatus == 1?'Exited location':'Not configured',
        });
      }


  this.dataSource = new MatTableDataSource(this.liveData);
  setTimeout(() => {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator
     })
   }
  // }
  // else{
  //   this.totTime=res.success
  //   console.log("this.tottttttt===",this.totTime)

  //   if(this.selectMin.get('minute').value!=''){
  //     console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)

  //     this.filterTotTime(this.selectMin.get('minute').value)

  //   }
  // }
})
}
/* -------------------------------------- */
temperatureData(limit,offset){
  var data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
    deviceName:this.deviceName,
    fromDate: this.from,
    toDate:this.to,
    offset:offset,
    limit:limit,
    zone:this.general.getZone(this.date)
  }

 // console.log(data)
  this.api.temperatureData(data).then((res:any)=>{
  //console.log(res)
    this.liveData=[]
    this.totTime=[]
    for(let i=0;i<res.success.length;i++){
    if(res.status){
      this.liveData.push({
        i:i+1,
        deviceName:res.success[i].deviceName,
        temperature:this.general.temperatureconver(res.success[i].temperature,this.loginData.temperature),
        temp:res.success[i].temperature,
        temperatureTimestamp:res.success[i].timestamp,

      /*   i:i+1,
        coinName:res.success[i].coinName == null?'Not available':res.success[i].coinName,
        department:res.success[i].department,
        inTime:res.success[i].inTime == '0000-00-00 00:00:00'|| res.success[i].inTime == null?'-':res.success[i].inTime,
        outTime:res.success[i].outTime == '0000-00-00 00:00:00' || res.success[i].outTime == null?'-':res.success[i].outTime,
        totTime:this.general.totalTime(res.success[i].inTime,res.success[i].outTime),
        geofenceStatus:res.success[i].geofenceStatus == 0?'Entered location ':res.success[i].geofenceStatus == 1?'Exited location':'Not configured', */
      });
    }
    this.dataSource = new MatTableDataSource(this.liveData);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    //  this.dataSource.paginator = this.paginator
       })
  }
  })

}
/* ---------------------------------- */
customReport(limit,offset){
  var date=new Date()
  var data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
    sync:this.sync,
    fromDate: this.from,
    limit:limit,
    offset:offset,
    zone:this.general.getZone(date)
  }
   // console.log(" custom data======",data)
  this.api.getCustomReport(data).then((res:any)=>{
  // console.log("Custom Report res==",res)
    this.customData=[]
    if(res.status){
      this.customData=res.success
      this.dataSource = new MatTableDataSource(this.customData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
       // this.dataSource.paginator = this.paginator
      })
    }
  })
}
  loadData(limit=10,offset=0){

      if(this.type == 'basedOnDate'){
        this.basedOnDate(limit=limit,offset=offset)
      }
      if(this.type == 'cummulative'){
        this.cummulativeReport(limit=limit,offset=offset)
      }
      if(this.type == 'basedOnFindName'){
        this.basedOnFindName(limit=limit,offset=offset)
      }
      if(this.type == 'summaryReport'){
        this.summaryReport(limit=limit,offset=offset)
      }
      if(this.type == 'locationReport'){
        this.locationReport(limit=limit,offset=offset)
      }
      if(this.type == 'geoFenceReport'){
        this.geofenceAndlocationReport(limit=limit,offset=offset)
      }
      if(this.type == 'custom'){
        this.customReport(limit=limit,offset=offset)

      }
      if(this.type == 'deptcummulative'){
        this.departmentReport(limit=limit,offset=offset)
      }
      if(this.type == 'temperature'){
        this.temperatureData(limit=limit,offset=offset)
      }
}


getUpdate(event) {
  // console.log("paginator event",event);
  // console.log("paginator event length", this.currentPageLength);
  this.limit = event.pageSize
 this.offset = event.pageIndex*event.pageSize
  // console.log("limit==",limit,"offset==",offset)
  this.loadData(this.limit,this.offset)
}


getPages(){
  var data={}
  var fileName=''
  var date=new Date()

  if(this.type=='basedOnDate' || this.type=='basedOnFindName'){
      if(this.type=='basedOnDate'){
        data={
        userId:this.loginData.userId,
        subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
        fromDate: this.from,
        toDate:this.to,
        zone:this.general.getZone(date),
        type:this.type
        }
        fileName="GenericReport"
    }
    if(this.type=='basedOnFindName'){
        data={
        userId:this.loginData.userId,
        subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
        deviceName:this.deviceName,
        fromDate: this.from,
        toDate:this.to,
        zone:this.general.getZone(date),
        type:this.type
      }
      fileName="Report-of-Find- "+this.deviceName
      }

     // console.log("data to send ======",data);

      this.api.downloadReport(data,fileName).then((res:any)=>{

       // console.log("report data recieved ======",res);
      })
  }
  if(this.type=='summaryReport'){
      this.general.loadingFreez.next({status:true})
     // console.log("hi")
      setTimeout(()=>{
        this.openExcel()
        this.general.loadingFreez.next({status:false})
      },6000);

    }
    if(this.type=='locationReport' || this.type=='geoFenceReport' ){
      if(this.type=='locationReport'){
          data={
          userId:this.loginData.userId,
          subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
          coinId:this.locationId,
          fromDate: this.from,
          toDate:this.to,
          zone:this.general.getZone(date),
          type:this.type
        }
        fileName="Report-of-location- "+this.locationName
      }
      if(this.type=='geoFenceReport'){
        data={
          userId:this.loginData.userId,
          subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
          deviceName:this.deviceName,
          fromDate: this.from,
          toDate:this.to,
          zone:this.general.getZone(date),
          type:this.type
        }
        fileName="GeoFenceReport_of- "+this.deviceName
      }

     // console.log("data to send ======",data);

      this.api.downloadLtReport(data,fileName).then((res:any)=>{

       // console.log("report data recieved ======",res);

      })
    }
    if(this.type=='cummulative'){
      data={
        userId:this.loginData.userId,
        subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
        fromDate: this.from,
        toDate:this.to,
        zone:this.general.getZone(date),
        type:this.type
      }
      fileName="CummulativeReport"
     // console.log("data to send ======",data);

      //apicall

      this.api.downloadCummulative(data,fileName).then((res:any)=>{

       // console.log("report data recieved ======",res);

      })
    }
if(this.type=='temperature'){
  data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
    deviceName:this.deviceName,
    fromDate: this.from,
    toDate:this.to,
    zone:this.general.getZone(date),
    type:this.type
  }
 // console.log(data)

  fileName="Temperature- "+this.deviceName
  this.api.downloadTemperatureData(data,fileName).then((res:any)=>{
    //console.log(res)
  })
}

if(this.type=='deptcummulative'){
  data={
    userId:this.loginData.userId,
    subUserId:this.department,
    fromDate: this.from,
    toDate:this.to,
    zone:this.general.getZone(date),
    type:this.type
  }
  fileName="Department wise CummulativeReport"
 // console.log("data to send ======",data);

  //apicall

  this.api.downloadDeptCummulative(data,fileName).then((res:any)=>{

  //  console.log("report data recieved ======",res);

  })

}


    if(this.type=='custom'){
      var date=new Date()
      data={
        userId:this.loginData.userId,
        subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
        zone:this.general.getZone(date),
        fromDate: this.from,
        sync:this.sync
      }
      fileName="CustomReport"
      //console.log("data to send ======",data);

      //apicall

      this.api.downloadCustomReport(data,fileName).then((res:any)=>{

      //  console.log("report data recieved ======",res);

      })
    }

}


  orderContactOpen(a){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '90vh';
    dialogConfig.width = '75vw';
    dialogConfig.data = {
      data:a,
      order:2,
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      fromDate : this.from,
      toDate : this.to
    }
    const dialogRef = this.dialog.open(OrderContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  convertDate(a){
    // console.log("a===",a)
    var timeArr = a.split(':')
    var date = ''
    if(timeArr[0]!='00'){
      date += timeArr[0] + ' hour '
    }
    if(timeArr[1]!='00'){
      date += timeArr[1] + ' minute '
    }
    if(timeArr[2]!='00'){
      date += timeArr[2] + ' second '
    }

    if(date=='' || date=='-'){
      date = '05 second'
    }
    return date
  }

filterTotTime(event){
   // console.log("event value===",event.value)
    var arr=[]

  if(event.value !="0"){
    if(this.type == 'basedOnDate'  ){

      this.totTime.filter((obj,index)=>{

        if((parseInt(obj.totalTime.split(':')[1])>=parseInt(event.value) )|| (parseInt(obj.totalTime.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
          arr.push({

            baseName:obj.baseName,
            contactName:obj.contactName,
            empId:obj.empId==null ||obj.empId==''?'-':obj.empId,
            updatedOn:obj.updatedOn,
            startTime:this.general.startTime(obj.totalTime,obj.updatedOn),
            totalTime:this.general.convertTime(obj.totalTime)

          })
          // console.log("arrr==",arr)
          return arr
        }


      })


      this.dataSource = new MatTableDataSource(arr);
      setTimeout(() => {
        this.dataSource.sort = this.sort;


      })

    }
    if(this.type == 'basedOnFindName'  ){

      this.totTime.filter((obj,index)=>{

        if((parseInt(obj.totalTime.split(':')[1])>=parseInt(event.value) )|| (parseInt(obj.totalTime.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
          arr.push(obj)
          // console.log("arrr==",arr)
          return arr
        }


      })


      this.dataSource = new MatTableDataSource(arr);
      setTimeout(() => {
        this.dataSource.sort = this.sort;


      })

    }
    if(this.type == 'cummulative' ){

      this.totTime.filter((obj,index)=>{

        if((parseInt(obj.totalTime.split(':')[1])>=parseInt(event.value) )|| (parseInt(obj.totalTime.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
          arr.push({
            username:obj.baseDeviceName,
            count:obj.count,
            totTime:this.general.convertTime(obj.totalTime)

            })
            // console.log("arrr==",arr)
            return arr
          }


        })


        this.dataSource = new MatTableDataSource(arr);
        setTimeout(() => {
          this.dataSource.sort = this.sort;

        })
    }

    /* ----------------------------- */
    if(this.type == 'deptcummulative' ){

      this.totTime.filter((obj,index)=>{

        if((parseInt(obj.totalTime.split(':')[1])>=parseInt(event.value) )|| (parseInt(obj.totalTime.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
          arr.push({
            username:obj.baseDeviceName,
            count:obj.count,
            totTime:this.general.convertTime(obj.totalTime)

            })
            // console.log("arrr==",arr)
            return arr
          }


        })
        this.dataSource = new MatTableDataSource(arr);
        setTimeout(() => {
          this.dataSource.sort = this.sort;

        })
    }






    /* ------------------------------------------- */
    if(this.type=='geoFenceReport'){

      this.totTime.filter((obj,index)=>{
        var data=this.returnTotTime(obj.inTime,obj.outTl̥ime) == '-'? '00:00:00' : this.returnTotTime(obj.inTime,obj.outTime)
        if((parseInt(data.split(':')[1])>=parseInt(event.value) )|| (parseInt(data.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
          arr.push({

          coinName:obj.coinName == null?'Not available':obj.coinName,
          inTime:obj.inTime == '0000-00-00 00:00:00'?'-':obj.inTime,
          outTime:obj.outTime == '0000-00-00 00:00:00'?'-':obj.outTime,
          totTime:this.general.totalTime(obj.inTime,obj.outTime),
          geofenceStatus:obj.geofenceStatus == 0?'Entered location ':obj.geofenceStatus == 1?'Exited location':'Not configured',


          })
          // console.log("arrr==",arr)
          return arr
        }


      })

      this.dataSource = new MatTableDataSource(arr);
      setTimeout(() => {
        this.dataSource.sort = this.sort;

      })

    }
    if(this.type=='locationReport'){

      this.totTime.filter((obj,index)=>{
        var data=this.returnTotTime(obj.inTime,obj.outTl̥ime) == '-'? '00:00:00' : this.returnTotTime(obj.inTime,obj.outTime)
        if((parseInt(data.split(':')[1])>=parseInt(event.value) )|| (parseInt(data.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
          arr.push({
          deviceName:obj.deviceName,
          inTime:obj.inTime == '0000-00-00 00:00:00'?'-':obj.inTime,
          outTime:obj.outTime == '0000-00-00 00:00:00'?'-':obj.outTime,
          totTime:this.general.totalTime(obj.inTime,obj.outTime),

          })
         // console.log("arrr==",arr)
          return arr
        }
      })


      this.dataSource = new MatTableDataSource(arr);
      setTimeout(() => {
        this.dataSource.sort = this.sort;


      })

    }
  }
  else{
    this.loadData(this.limit,this.offset)

  }

  }

  openExcel(){

    if(this.type=='summaryReport'){
      this.fileName='summaryReport-of-infectedUser-'+this.deviceName+'.xlsx'
      this.title = 'Summary Report of Find Name'+this.deviceName;
      let element = document.getElementById('htmlData');
      this.general.exportToExcel(element,this.fileName, this.title)
    }
    // else{
    //   console.log("this.excelData====",this.excelData)
    //   if(this.type=='basedOnDate'){
    //     this.fileName='Generic_Report.xlsx'
    //     this.title = 'Based on date'+this.from+" "+this.to;

    //     this.general.exportAsExcelFile(this.excelData,this.fileName, this.title)

    //   }
    //   if(this.type=='basedOnFindName'){
    //     this.fileName='Report_of_Find-'+this.liveData[0].baseName+'.xlsx'
    //     this.title = 'Based on Find Name'+this.deviceName;
    //     let element = document.getElementById('htmlData');

    //     this.general.exportAsExcelFile(this.excelData,this.fileName, this.title)

    //   }
    //     if(this.type=='locationReport'){
    //       this.fileName='Report_Of_Location-'+this.locationName+'.xlsx'
    //       this.title = 'Based on Find Name'+this.deviceName;
    //       let element = document.getElementById('htmlData');

    //       this.general.exportAsExcelFile(this.excelData,this.fileName, this.title)

    //     }
    //     if(this.type=='geoFenceReport'){
    //       this.fileName='GeoFenceReport_of-'+this.deviceName+'.xlsx'
    //       this.title = 'Based on Find Name'+this.deviceName;
    //       let element = document.getElementById('htmlData');

    //       this.general.exportAsExcelFile(this.excelData,this.fileName, this.title)

    //     }
    //   // console.log("excel data===",this.excelData)

    // }



  }
  returnTotTime(inTime,outTime){

   // console.log("time===",inTime,outTime)
    var date=new Date()
     this.inDate  = new Date(inTime)
     this.outDate = outTime==null? new Date('0000-00-00 00:00:00'):new Date(outTime)


    if(this.inDate !="Invalid Date" ){

      if(this.outDate!="Invalid Date" ){
        var diff = Math.abs(this.outDate - this.inDate)
      }

      else{
        return '-'
      }


      let ms = diff % 1000;
      diff = (diff - ms) / 1000;
      let s = diff % 60;
      diff = (diff - s) / 60;
      let m = diff % 60;
      diff = (diff - m) / 60;
      let h = diff

      let ss = s <= 9 && s >= 0 ? "0"+s : s;
      let mm = m <= 9 && m >= 0 ? "0"+m : m;
      let hh = h <= 9 && h >= 0 ? "0"+h : h;


      this.inoutTime = hh +':' + mm + ':' +ss
            return this.inoutTime;
    }
  }

  deviceId(data){
    var a=[]
    data.filter((obj)=>{
      obj.contactDevice=obj.contactDeviceName== this.deviceName?obj.baseDevice: obj.contactDevice
        if(!a.includes(obj.contactDevice)){
          a.push(obj.contactDevice)
        }
    })
    return a
  }
  sendWarning(){
    var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      deviceId:this.deviceIdData,
      infectedPersonName:this.deviceName,
      adminEmailId:this.loginData.userName
    }
   // console.log("sendwarning data=====",data)
    this.api.infectedContactalert(data).then((res:any)=>{
      if(res.status){
       // console.log("infectedContactalert res===",res)
        var msg = 'Warning Sent Successfully'
        this.general.openSnackBar(msg,'')
      }

    })
  }

  temapraturecolors(val){
      if(val < 38){
        var a = {
            'color':'green',
        }
        return a
      }
      else if(val >=38){
        var a = {
          'color':'red',
        }
        return a
      }
  }
}
