import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { AddFindComponent } from '../add-find/add-find.component';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { EditDeviceComponent } from '../edit-device/edit-device.component';
import { GeneralMaterialsService } from '../general-materials.service';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-manage-coins',
  templateUrl: './manage-coins.component.html',
  styleUrls: ['./manage-coins.component.css']
})
export class ManageCoinsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loginData:any
  userType:any
  coinData:any=[]
  coindDataTemp:any=[]
  dataSource: any = [];
  inserted:any=[]
  currentPageLength:any=10
currentPageSize:any=10
limit:any=10
offset:any=0
  displayedColumns = ['i','coinId','coinName','coinType','gatewayId','batteryStatus',	'edit',	'delete'];


constructor(public dialog: MatDialog,
  private api: ApiService,
  private login:LoginCheckService,
  private general:GeneralMaterialsService,) {}



  ngOnInit(): void {
  this.loginData = this.login.Getlogin()
  this.loginData = JSON.parse(this.loginData)
  this.userType=this.loginData.type
  this.refreshCoins(this.limit,this.offset)
  this.getDataCount()
  }


  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '60vw';
    dialogConfig.data = {
      type:"coins"
    }
    const dialogRef = this.dialog.open(AddFindComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.refreshCoins(this.limit,this.offset)
      this.getDataCount()
    });


  }
  refreshCoins(limit,offset){
    this.loadData(limit=limit,offset=offset)
    }
  loadData(limit=10,offset=0){
    var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      limit:limit,
      offset:offset,
      tblName:'coinRegistration'
    }
    //console.log("coin data ======",data);
    this.api.getData(data).then((res:any)=>{
      //console.log("coin data ======",res);
      if(res.status){

        this.coinData=[]

      for (let i = 0; i <res.success.length; i++) {

        this.coinData.push(
          {
              i: i+1,
              id:res.success[i].id,
              coinId: res.success[i].coinId,
              coinName: res.success[i].coinName,
              coinType: res.success[i].coinType == 'LO'? 'Location Coin' : 'Aggregator Coin',
              gatewayId:res.success[i].gatewayId==''?'-':res.success[i].gatewayId,
              batteryStatus:res.success[i].batteryStatus,
              battryStatusUpdatedTime:res.success[i].battryStatusUpdatedTime,
              latestStatus:res.success[i].latestStatus,
              coinStatus:res.success[i].coinStatus,
              edit:'edit',
              delete:'delete',

          });


      }
      this.dataSource = new MatTableDataSource(this.coinData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
        // this.paginator.length = this.currentPageSize
      })
      this.coindDataTemp=this.coinData
      }else{
        if(res.code=='403'){
          this.login.logout()
        }
      }
    })
  }
// getInsertedOn(value){
// return value
// }
  getBatteryStatus(value){
    // console.log("status===",value)
    if((value.batteryStatus == 5 && value.coinType == 'Location Coin') || (value.batteryStatus == 1 && value.coinType == 'Aggregator Coin')){
      var a = {
        'background-color':'green',
        'width':'31px'
      }
      return a
    }
    else if((value.batteryStatus == 6 && value.coinType == 'Location Coin') || (value.batteryStatus == 2 && value.coinType == 'Aggregator Coin')){
      var a = {
        'background-color':'#ffc107',
        'width':'18px'
      }
      return a
    }
    else if((value.batteryStatus == 7 && value.coinType == 'Location Coin') || (value.batteryStatus == 3 && value.coinType == 'Aggregator Coin')){
      var a = {
        'background-color':'red',
        'width':'10px'
      }
      return a
    }
    else{
      return {}
    }
  }

edit(data){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.height = '50vh';
  dialogConfig.width = '60vw';
  dialogConfig.data = {
    type:"coins",
    data:data
  }
  const dialogRef = this.dialog.open(EditDeviceComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    this.refreshCoins(this.limit,this.offset)
    this.getDataCount()
  });
}

delete(value){
  if(confirm('Are you sure you want to delete the device')){
    //console.log("yes",value)
    var data = {
      id:value.id,
      tblName:'coinRegistration',
      userId:this.loginData.userId,
      coinId:value.coinId,
      coinName:value.coinName
    }
  //  console.log("delete coin===",data)
    this.api.deletedeviceandUser(data).then((res:any)=>{
      //console.log("coin data ======",res);
      if(res.status){
        this.refreshCoins(this.limit,this.offset)
        this.getDataCount()
        var msg = 'Coin deleted Successfully'
        this.general.openSnackBar(msg,'')
      }
    })
  }

}

search(a){
/*   var data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
    search:a,
    tblName:'coinRegistration'
  }
  console.log("a==",data)
  this.api.addCoinSearch(data).then((res:any)=>{
    if(res.status){
      this.dataSource = new MatTableDataSource(this.coinData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       // this.dataSource.filter =a.trim().toLowerCase()

      })
    }
  }) */
  // if(data.length>0){
  //   this.coinData = this.coindDataTemp.filter(obj=>{
  //     return ((obj.coinName.toString().toLowerCase().indexOf(data)>-1) || (obj.coinId.toString().toLowerCase().indexOf(data)>-1))
  //   })


  // }
  // else{
  //   this.coinData= this.coindDataTemp

  // }
  this.dataSource = new MatTableDataSource(this.coinData);
  setTimeout(() => {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   this.dataSource.filter =a.trim().toLowerCase()

  })
}
getUpdate(event) {
  // console.log("paginator event",event);
  // console.log("paginator event length", this.currentPageLength);
  this.limit = event.pageSize
 this.offset = event.pageIndex*event.pageSize
  // console.log("limit==",limit,"offset==",offset)
 this.refreshCoins(this.limit,this.offset)
}
getDataCount(){
  var data={
    userId:this.loginData.userId,
    subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
    tblName:'coinRegistration'
  }
  this.api.getDataCount(data).then((res:any)=>{
      //console.log("length of location report on device name ======",res);
       if(res.status){
         //console.log('\nTotal response: ',res.success[0].count);
         this.currentPageLength = parseInt(res.success[0].count);
       }
     })
}

}
