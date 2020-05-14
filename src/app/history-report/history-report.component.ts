import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Timestamp } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-history-report',
  templateUrl: './history-report.component.html',
  styleUrls: ['./history-report.component.css']
})
export class HistoryReportComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  type:any
  liveData:any=[]
  dataSource:any
  loginData:any
  from:Date
  to:Date
  selectedValue:any
  deviceName:any
  displayedColumns: string[] = ['i','baseName', 'contactName', 'updatedOn'];
  
  
    constructor(
      private api: ApiService,
      private login:LoginCheckService,
      private router:Router,
      public dialogRef: MatDialogRef<HistoryReportComponent>,
       @Inject(MAT_DIALOG_DATA)  data,
    ) {
      this.type=data.type
      console.log("type==",this.type)
      this.liveData = data.data
      this.from = data.from
      this.to = data.to
      this.selectedValue=data.valueSelected
      this.deviceName=data.deviceName
     }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)

   
    // basedOnDate

    this.dataSource = new MatTableDataSource(this.liveData);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    })
  }
  refreshData(){
    var data={
      userId:this.loginData.userId,
      tblName:'deviceData'
    }

    this.api.getLiveData(data).then((res:any)=>{
      console.log("live data ======",res);
      if(res.status){
        this.liveData=res.success

        this.dataSource = new MatTableDataSource(this.liveData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
        })
      }
    })
   }
}
