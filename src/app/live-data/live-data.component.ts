import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';


@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.css']
})

export class LiveDataComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

liveData:any=[]
dataSource:any
loginData:any
count= 0
displayedColumns: string[] = ['i','baseName', 'contactName', 'updatedOn'];


  constructor(
    private api: ApiService,
    private login:LoginCheckService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.count=0
    this.refreshData(this.count)
    console.log("count",this.count)
    // this.dataSource.paginator = this.paginator;

  }

  prevDayData(){
   
    this.count++;
    console.log("count",this.count)
      var data={
        userId:this.loginData.userId,
        tblName:'deviceData',
        count:this.count
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

  refreshData(value){
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
