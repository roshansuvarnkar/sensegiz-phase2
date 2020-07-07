import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  locationData:any=[]
  dataSource:any
  loginData:any
  currentPageLength:any=10
  currentPageSize:any=10
  displayedColumns: string[] = ['i','userName','userCurrentLocation', 'geofence'];
  constructor(
    private api: ApiService,
    private login:LoginCheckService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.refreshData()
  }


  refreshData(limit=10,offset=0,type=0){

    var data={
      userId:this.loginData.userId,
      // limit:limit,
      // offset:offset
    
    }

    this.api.getLocationData(data).then((res:any)=>{
      console.log("location data ======",res);
      // if(res.status){
      //   this.locationData=[]
      //  for(let i=0;i<res.success.length;i++){
      //    this.locationData.push({
      //      i:i+1,
      //      deviceName:res.success[i].deviceName,
      //      geofence:res.success[i].geofence
      //    })
      //  }
      //   this.dataSource = new MatTableDataSource(this.locationData);
      //   setTimeout(() => {
      //     this.dataSource.sort = this.sort;
      //     this.dataSource.paginator = this.paginator;
      //     // this.paginator.length = this.currentPageSize
      //   })
      // }
    })

 }
 
getUpdate(event) {
  // console.log("paginator event",event);
  // console.log("paginator event length", this.currentPageLength);
  var limit = event.pageSize
  var offset = event.pageIndex*event.pageSize
  // console.log("limit==",limit,"offset==",offset)
  this.refreshData(limit,offset)
}



getPages() {

  var tempLen=this.currentPageLength
  // console.log("paginator event length",this.currentPageLength);
  this.refreshData(tempLen,0,1)
  // var msg = 'Downloading'
  // this.general.openSnackBar(msg,'')
//  setTimeout(()=>{
//     this.downloadPDF()
//   },5000);

  // setTimeout(()=>{

  //   this.openExcel()

  // },5000);

  setTimeout(()=>{
    this.refreshData(10,0,0)
  },6000)
 clearTimeout(60*1000)
}

}
