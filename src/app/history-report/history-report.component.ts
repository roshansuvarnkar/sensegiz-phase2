import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Timestamp } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import { OrderContactComponent } from '../order-contact/order-contact.component';

@Component({
  selector: 'app-history-report',
  templateUrl: './history-report.component.html',
  styleUrls: ['./history-report.component.css']
})
export class HistoryReportComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  type:any
  dateBased:any
  findNameBased:any
  liveData:any=[]
  liveDataTemp:any=[]
  dataSource:any
  loginData:any
  from:Date
  to:Date
  index:any
  selectedValue:any
  deviceName:any
  currentPageLength:any=10
  currentPageSize:any=7
  displayedColumns: string[] = ['i','baseName', 'contactName', 'updatedOn', 'totaltime'];
  displayedColumns1: string[] = ['i','contactName', 'updatedOn'];


    constructor(
      public dialog: MatDialog,
      private api: ApiService,
      private login:LoginCheckService,
      private router:Router,
      public dialogRef: MatDialogRef<HistoryReportComponent>,
       @Inject(MAT_DIALOG_DATA)  data,
    ) {
      this.type=data.type
      console.log("type==",this.type)
      this.liveData = data.data
      this.liveDataTemp = data.data
      this.from = data.fromDate
      this.to = data.toDate
      this.selectedValue=data.valueSelected
      this.deviceName=data.deviceName
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
      }
    
      this.api.getHistoryDateReportTotalCount(data).then((res:any)=>{
        console.log("length of report on date ======",res);
        if(res.status){
          console.log('\nTotal response: ',res.success[0].count);
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
    }
  
    this.api.getHistoryNameReportTotalCount(data1).then((res:any)=>{
      console.log("length of report on device name ======",res);
      if(res.status){
        console.log('\nTotal response: ',res.success[0].count);
        this.currentPageLength = parseInt(res.success[0].count);
  
      }
    })
  
  }
  }

  loadData(limit=10,offset=0){

      if(this.type=='basedOnDate'){
        var data={
          userId:this.loginData.userId,
          fromDate: this.from,
          toDate:this.to,
          limit:limit,
          offset:offset
        }
        this.api.getDeviceHistoryBasedOnDate(data).then((res:any)=>{
          console.log("find data based on date ======",res);
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
      if(this.type=='basedOnFindName'){
        var data1={
          userId:this.loginData.userId,
          deviceName:this.deviceName,
          fromDate: this.from,
          toDate:this.to,
          offset:offset,
          limit:limit
          
        }
        this.api.getDeviceHistoryBasedOnDeviceName(data1).then((res:any)=>{
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
      if(this.type=='summaryReport'){
        var data2={
          userId:this.loginData.userId,
          deviceName:this.deviceName,
          fromDate: this.from,
          toDate:this.to,
          // limit:limit,
          // offset:offset
        }
        this.api.getSummaryReport(data2).then((res:any)=>{
          console.log("summary report ======",res);
          if(res.status){
            for(let i=0;i<res.success.lenght;i++){
              this.liveData.push({
                i:i+1,
                contactName:res.success[i].contactName,
                updatedOn:res.success[i].updatedOn
              })
            }

            
           this.dataSource = new MatTableDataSource(this.liveData);
            setTimeout(() => {
              this.dataSource.sort = this.sort;
          
            })
          }
        })

      } 
      this.liveData=[]
}


getUpdate(event) {
  console.log("paginator event",event);
  console.log("paginator event length", this.currentPageLength);
  var limit = event.pageSize
  var offset = event.pageIndex*event.pageSize 
  console.log("limit==",limit,"offset==",offset)
  this.loadData(limit,offset)
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
    else if(timeArr[1]!='00'){
      date += timeArr[1] + ' minute '
    }
    else if(timeArr[2]!='00'){
      date += timeArr[2] + ' second '
    }
    return date
  }

}
