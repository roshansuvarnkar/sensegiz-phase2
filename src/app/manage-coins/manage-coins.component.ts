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
  loginData:Any
constructor(public dialog: MatDialog,
  private api: ApiService,
  private login:LoginCheckService,
  private general:GeneralMaterialsService,) {}

  

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
  this.loginData = JSON.parse(this.loginData)
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
    
    
    })
  }


}
  
