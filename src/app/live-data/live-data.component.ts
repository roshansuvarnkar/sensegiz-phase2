import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.css']
})

export class LiveDataComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
index:any
liveData:any=[]
dataSource:any
loginData:any
currentLength:any
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
    setInterval(()=>{this.refresh()},60*1000)
  }
refresh(){
  this.refreshData(this.count)
}
  prevDayData(){
    var limit=this.paginator.pageSize
    var offset=this.paginator.pageIndex*this.paginator.pageSize
    this.count = this.count + 1;
    console.log("count==",this.count);
    // this.refreshData1(this.count)
    this.refreshData(this.count,limit,offset)
    
  }

  nextDayData(){
    var limit=this.paginator.pageSize
    var offset=this.paginator.pageIndex*this.paginator.pageSize
    this.count = this.count - 1;
    console.log("count==",this.count);
    // this.refreshData1(this.count)
    this.refreshData(this.count,limit,offset)
    
  }




  refreshData(value,limit=10,offset=0){

    var data={
      userId:this.loginData.userId,
      tblName:'deviceData',
      count:value,
      limit:limit,
      offset:offset
    }
    console.log("data===",data)
    this.api.getTotalRowCount(data).then((resp:any)=>{
      console.log("get row count==",resp)
      if(resp.status){
        this.api.getLiveData(data).then((res:any)=>{
          console.log("live data ======",res);
      
          if(res.status){
         
            this.liveData=res.success
            this.dataSource = new MatTableDataSource(this.liveData);

            setTimeout(() => {
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator 
              this.currentLength = resp.success[0].count
              console.log("length====",this.currentLength)
              
            })
          }
        })
      }
    })
 
 }

 



    getCount(a){
      console.log("event==",a)
      
      var offset = a.pageIndex*a.pageSize
      var limit = a.pageSize
          this.refreshData( 0,limit,offset)
    }

}
