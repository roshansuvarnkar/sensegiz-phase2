import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Timestamp } from 'rxjs';



@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.css']
})
export class LiveDataComponent implements OnInit {
@ViewChild(MatSort, {static: true}) sort: MatSort;
liveData:any=[]
dataSource:any=[]
loginData:any
displayedColumns: string[] = ['Sl_No','Contact_1', 'Contact_2', 'Time'];
// dataSource = new MatTableDataSource(this.liveData);
  constructor(
    private api: ApiService,
    private login:LoginCheckService,
    private router:Router
  ) {


    this.dataSource.sort = this.sort;
   }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)

    this.refreshData()




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
        this.dataSource  =  this.liveData;

        this.dataSource.sort = this.sort;
        console.log(this.dataSource)
      }
    })
  }

}
