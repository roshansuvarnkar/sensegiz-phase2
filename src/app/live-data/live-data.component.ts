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
<<<<<<< HEAD
dataSource:any
loginData:any
displayedColumns: string[] = ['Sl_No','Contact_1', 'Contact_2', 'Time'];
=======
dataSource:any=[]
loginData:any
displayedColumns: string[] = ['i','baseName', 'contactName', 'updatedOn'];
>>>>>>> 3c5160d70b815049642b25c0ec765c3867808df3

  constructor(
    private api: ApiService,
    private login:LoginCheckService,
    private router:Router
  ) {
<<<<<<< HEAD
   
    console.log(this.sort)
 
   }
=======
   }

>>>>>>> 3c5160d70b815049642b25c0ec765c3867808df3

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)

    this.refreshData()
<<<<<<< HEAD
  
    
=======
    this.dataSource.sort=this.sort
>>>>>>> 3c5160d70b815049642b25c0ec765c3867808df3
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
<<<<<<< HEAD

        this.dataSource = new MatTableDataSource(this.liveData);
        this.dataSource.sort = this.sort;
         console.log(this.dataSource)
=======
        this.dataSource = new MatTableDataSource(this.liveData);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
        })
>>>>>>> 3c5160d70b815049642b25c0ec765c3867808df3
      }
    })
   
  }



}


