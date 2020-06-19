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
  coinData:any=[]
  coindDataTemp:any=[]
  dataSource: any = [];
  displayedColumns = ['i','coinId','coinName','gatewayId',	'edit',	'delete'];


constructor(public dialog: MatDialog,
  private api: ApiService,
  private login:LoginCheckService,
  private general:GeneralMaterialsService,) {}

  

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
  this.loginData = JSON.parse(this.loginData)

  this.refreshCoins()
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '50vw';
    dialogConfig.data = {
      type:"coins"
    }
    const dialogRef = this.dialog.open(AddFindComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      
    });

    
  }

  refreshCoins(){
    var data={
      userId:this.loginData.userId,
      tblName:'coinRegistration'
    }
  
    this.api.getData(data).then((res:any)=>{
      console.log("coin data ======",res);
      if(res.status){
        this.coinData=[]
      for (let i = 0; i <res.success.length; i++) {
        this.coinData.push(
          {
              i: i+1,
              id:res.success[i].id,
              coinId: res.success[i].coinId,
              coinName: res.success[i].coinName,
              gatewayId:res.success[i].gatewayId,
              edit:'edit',
              delete:'delete',
              
          });
    

      }
      this.dataSource = new MatTableDataSource(this.coinData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.paginator.length = this.currentPageSize
      })
      this.coindDataTemp=this.coinData
      }
    })
  }
edit(data){

}

delete(value){
  if(confirm('Are you sure you want to delete the device')){
    console.log("yes",value)
    var data = {
      id:value.id,
      tblName:'coinRegistration'
    }
    this.api.deletedeviceandUser(data).then((res:any)=>{
      console.log("coin data ======",res);
      if(res.status){
        this.refreshCoins()
        var msg = 'Coin Deleted Successfully'
        this.general.openSnackBar(msg,'')
      }
    })
  }

}

search(data){
  // console.log("a==",a)
  if(data.length>0){
    this.coinData = this.coindDataTemp.filter(obj=>{
      return ((obj.coinName.toString().toLowerCase().indexOf(data)>-1) || (obj.coinId.toString().toLowerCase().indexOf(data)>-1))
    })


  }
  else{
    this.coinData= this.coindDataTemp

  }
  this.dataSource = new MatTableDataSource(this.coinData);
  setTimeout(() => {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  })
}

}
  
