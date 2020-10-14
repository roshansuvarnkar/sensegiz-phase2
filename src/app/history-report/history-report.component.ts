import { Component, OnInit,Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Timestamp } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import { OrderContactComponent } from '../order-contact/order-contact.component';
import * as XLSX from 'xlsx';



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
  liveData:any=[]
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
  displayedColumns: string[] = ['i','baseName','contactName','location','startTime', 'updatedOn', 'totaltime'];
  displayedColumns1: string[] = ['i','contactName','location', 'updatedOn', 'totaltime'];
  displayedColumns2: string[] = ['contactDeviceName','updatedOn'];
  displayedColumns3: string[] = ['i','deviceName','inTime', 'outTime','totTime'];
  displayedColumns4: string[] = ['i','coinName','geofenceStatus','inTime', 'outTime','totTime'];
  displayedColumns5: string[] = ['i','username','count','totTime'];
  fileName:any
  locationData:any=[]
  locationName:any
  locationId:any
  title:any
  time:any
  date1:any
  date2:any
  date:any
  coinData:any=[]

    constructor(
      public dialog: MatDialog,
      private api: ApiService,
      private login:LoginCheckService,
      private general:GeneralMaterialsService,
      private router:Router,
      public dialogRef: MatDialogRef<HistoryReportComponent>,
       @Inject(MAT_DIALOG_DATA)  data,
    ) {
      this.type=data.type
      // console.log("type==",this.type)
      this.liveData = data.data
      console.log("data==",data)
      this.from = data.fromDate
      this.to = data.toDate
      this.from1 = data.fromDate1
      this.to1 = data.toDate1
      this.date=data.date
      this.selectedValue=data.valueSelected
      this.deviceName=data.deviceName
      this.locationName=data.locationName
      this.locationId=data.locationId

     }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)

    this.getTotalCount()
    this.loadData()
  }

  getTotalCount(){
    if(this.type=='basedOnDate'){
      var data={
        userId:this.loginData.userId,
        fromDate: this.from,
        toDate:this.to,
        zone:this.general.getZone(this.date)
      }

      this.api.getHistoryDateReportTotalCount(data).then((res:any)=>{
        // console.log("length of report on date ======",res);
        if(res.status){
          // console.log('\nTotal response: ',res.success[0].count);
          this.currentPageLength = parseInt(res.success[0].count);

        }
      })

    }
  if(this.type=='basedOnFindName'){
    var data1={
      userId:this.loginData.userId,
      deviceName:this.deviceName,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(this.date)
    }

    this.api.getHistoryNameReportTotalCount(data1).then((res:any)=>{
      // console.log("length of report on device name ======",res);
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
      coinId:this.locationId,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(this.date)
    }

    this.api.getLocationHistoryRowCount(data2).then((res:any)=>{
      // console.log("length of location report on device name ======",res);
      if(res.status){
        // console.log('\nTotal response: ',res.success[0].count);
        this.currentPageLength = parseInt(res.success[0].count);
        // this.tempLen=this.currentPageLength
      }
    })

  }
  if(this.type=='geoFenceReport'){
    var data3={
      userId:this.loginData.userId,
      deviceName:this.deviceName,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(this.date)
    }

    this.api.getGeofenceReportRowCount(data3).then((res:any)=>{
      // console.log("length of geo fence report on device name ======",res);
      if(res.status){
        // console.log('\nTotal response: ',res.success[0].count);
        this.currentPageLength = parseInt(res.success[0].count);
        // this.tempLen=this.currentPageLength
      }
    })

  }


  }



  basedOnDate(limit,offset,type){
    console.log(limit,offset)
    var data={
      userId:this.loginData.userId,
      fromDate: this.from,
      toDate:this.to,
      limit:limit,
      offset:offset,
      zone:this.general.getZone(this.date)
    }
    console.log("data==",data)
    this.api.getDeviceHistoryBasedOnDate(data).then((res:any)=>{
      console.log("find data based on date ======",res);
      this.liveData=[]
      if(res.status){
        for(var i=0;i<res.success.length;i++){

          this.liveData.push({
          i:i+1,
          baseName:res.success[i].baseName,
          contactName:res.success[i].contactName,
          location:res.success[i].location,
          updatedOn:this.general.updatedOnDate(res.success[i].updatedOn),
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

    })

  }
  basedOnFindName(limit,offset,type){
    var data={
      userId:this.loginData.userId,
      deviceName:this.deviceName,
      fromDate: this.from,
      toDate:this.to,
      offset:offset,
      limit:limit,
      zone:this.general.getZone(this.date)

    }
    this.api.getDeviceHistoryBasedOnDeviceName(data).then((res:any)=>{
      console.log("find data based on name ======",res);

      if(res.status){
      
        this.liveData=res.success

        this.dataSource = new MatTableDataSource(this.liveData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          // this.paginator.length = this.currentPageLength
        })
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

summaryReport(){

  var data={
    userId:this.loginData.userId,
    deviceName:this.deviceName,
    fromDate: this.from,
    toDate:this.to,
    zone:this.general.getZone(this.date)

  }
  this.api.getSummaryReport(data).then((res:any)=>{
    console.log("summary report======",res);

    this.liveData=[]
    if(res.status){

      var groupUser = this.dataDateReduce(res.success)
      // console.log("groupDate===",groupUser)
      this.liveData = Object.keys(groupUser).map((data)=>{

        return {
          date : groupUser[data],
          data : data
        }
      })
      console.log("live==",this.liveData)

      for(let i=0;i<this.liveData.length;i++){

        for(let j=0;j<this.liveData[i].date.length-1;j++){
          this.liveData[i].date[j].updatedOn = this.liveData[i].date[j].updatedOn.split('T')[0]+','
        }

        this.liveData[i].date[this.liveData[i].date.length-1].updatedOn=this.liveData[i].date[this.liveData[i].date.length-1].updatedOn.split('T')[0]+'.'

       }


    }
  })
}


dataDateReduce(data){
return data.reduce((group,obj)=>{
const name = obj.contactDeviceName
console.log("name---",name)
if(!group[name]){
  group[name]=[]
}
group[name].push(obj)
console.log("group==",group)
return group
},{})
}

cummulativeReport(){
  var date=new Date()

  var data={
    userId:this.loginData.userId,
    fromDate: this.from,
    toDate:this.to,
    zone:this.general.getZone(date)

  }
  console.log("hvhs==",data)
  this.api.viewCTReport(data).then((res:any)=>{
    this.countCummulative=[]
    console.log("cummulative report==",res)
    if(res.status){
      for(let i=0;i<res.data.length;i++){
        this.countCummulative.push({
          i:i+1,
          username:res.data[i].baseDeviceName,
          count:res.data[i].count,
          totTime:this.general.convertTime(res.data[i].totalTime)

        });
      }
      this.dataSource = new MatTableDataSource(this.countCummulative);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
         })
    }
  })

}

locationReport(limit,offset,type){

    var data={
      userId:this.loginData.userId,
      coinId:this.locationId,
      fromDate: this.from,
      toDate:this.to,
      offset:offset,
      limit:limit,
      zone:this.general.getZone(this.date)

    }
    console.log("data3==",data)
    this.api.getLocationHistory(data).then((res:any)=>{
      console.log("LocatSion history======",res);
      this.locationData=[]
      if(res.status){
        
        for(let i=0;i<res.success.length;i++){
          this.locationData.push({
            i:i+1,
            deviceName:res.success[i].deviceName,
            inTime:res.success[i].inTime == '0000-00-00 00:00:00'?'-':res.success[i].inTime,
            outTime:res.success[i].outTime == '0000-00-00 00:00:00'?'-':res.success[i].outTime,
            totTime:this.general.totalTime(res.success[i].inTime,res.success[i].outTime)
            // geofenceStatus:res.success[i].geofenceStatus == 1?'Exited':'Entered',
            // status:res.success[i].status == 'Y'?'Geo fence not configured':'-'

          });
        }


      this.dataSource = new MatTableDataSource(this.locationData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator
        })
     }
  })
}


geofenceAndlocationReport(limit,offset,type){

  var data={
    userId:this.loginData.userId,
    deviceName:this.deviceName,
    fromDate: this.from,
    toDate:this.to,
    offset:offset,
    limit:limit,
    zone:this.general.getZone(this.date)

  }
  // console.log("data3==",data)
  this.api.getGeofenceReport(data).then((res:any)=>{
    // console.log("Location and geo fence history======",res);
    this.locGeoData=[]
    if(res.status){
      for(let i=0;i<res.success.length;i++){
        this.locGeoData.push({
          i:i+1,
          coinName:res.success[i].coinName == null?'Not available':res.success[i].coinName,
          inTime:res.success[i].inTime == '0000-00-00 00:00:00'?'-':res.success[i].inTime,
          outTime:res.success[i].outTime == '0000-00-00 00:00:00'?'-':res.success[i].outTime,
          totTime:this.general.totalTime(res.success[i].inTime,res.success[i].outTime),
          geofenceStatus:res.success[i].geofenceStatus == 0?'Entered location ':res.success[i].geofenceStatus == 1?'Exited location':'Not configured',

        });
      }
  


  this.dataSource = new MatTableDataSource(this.locGeoData);
  setTimeout(() => {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator
     })
   }
})
}

  loadData(limit=10,offset=0,type=0){

      if(this.type == 'basedOnDate'){
        this.basedOnDate(limit=limit,offset=offset,type=type)
      }
      if(this.type == 'cummulative'){
        this.cummulativeReport()
      }
      if(this.type == 'basedOnFindName'){
        this.basedOnFindName(limit=limit,offset=offset,type=type)
      }
      if(this.type == 'summaryReport'){
        this.summaryReport()

      }
      if(this.type == 'locationReport'){
        this.locationReport(limit=limit,offset=offset,type=type)
      }
      if(this.type == 'geoFenceReport'){
        this.geofenceAndlocationReport(limit=limit,offset=offset,type=type)
      }
}


getUpdate(event) {
  // console.log("paginator event",event);
  // console.log("paginator event length", this.currentPageLength);
  var limit = event.pageSize
  var offset = event.pageIndex*event.pageSize
  // console.log("limit==",limit,"offset==",offset)
  this.loadData(limit,offset)
}



// getPages() {

//   var tempLen=this.currentPageLength
//   // console.log("paginator event length",this.currentPageLength);
//   this.loadData(tempLen,0,1)
//   var msg = 'Downloading'
//   this.general.openSnackBar(msg,'')
// //  setTimeout(()=>{
// //     this.downloadPDF()
// //   },5000);

//   setTimeout(()=>{

//     this.openExcel()

//   },6000);

//   setTimeout(()=>{
//     this.loadData(10,0,0)
//   },8000)
//  clearTimeout(8*1000)
// }

getPages(){
  var data={}
  var fileName=''
  var date=new Date()


 if(this.type=='basedOnDate' || this.type=='basedOnFindName'){
    if(this.type=='basedOnDate'){
      data={
      userId:this.loginData.userId,
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
    deviceName:this.deviceName,
    fromDate: this.from,
    toDate:this.to,
    zone:this.general.getZone(date),
    type:this.type
  }
  fileName="Report-of-Find- "+this.deviceName
  }

    console.log("data to send ======",data);

    this.api.downloadReport(data,fileName).then((res:any)=>{

      console.log("report data recieved ======",res);
    })
 }
 if(this.type=='summaryReport'){
    this.general.loadingFreez.next({status:true})
    console.log("hi")
    setTimeout(()=>{

      this.openExcel()
      this.general.loadingFreez.next({status:false})

    },6000);

  }
  if(this.type=='locationReport' || this.type=='geoFenceReport' ){
    if(this.type=='locationReport'){
      data={
      userId:this.loginData.userId,
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
      deviceName:this.deviceName,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(date),
      type:this.type
    }
    fileName="GeoFenceReport_of- "+this.deviceName
    }

    console.log("data to send ======",data);

    this.api.downloadLtReport(data,fileName).then((res:any)=>{

      console.log("report data recieved ======",res);

    })
  }
  if(this.type=='cummulative'){
    data={
      userId:this.loginData.userId,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(date),
      type:this.type
    }
    fileName="CummulativeReport"
    console.log("data to send ======",data);

    //apicall
    
    this.api.downloadCummulative(data,fileName).then((res:any)=>{

      console.log("report data recieved ======",res);
  
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
}
