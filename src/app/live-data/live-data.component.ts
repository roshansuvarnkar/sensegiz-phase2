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
@ViewChild(MatSort) sort: MatSort;
liveData:any=[]
dataSource:any
loginData:any
displayedColumns: string[] = ['i','baseName', 'contactName', 'updatedOn'];


  constructor(
    private api: ApiService,
    private login:LoginCheckService,
    private router:Router
  ) {
   
    console.log(this.sort)
 
   }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)

    this.refreshData()
    this.dataSource.sort=this.sort
    
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
        })
      }
    })
      }
    })
   
  }

}


