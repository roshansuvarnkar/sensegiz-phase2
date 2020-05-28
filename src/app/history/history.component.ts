import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { HistoryReportComponent } from '../history-report/history-report.component';
import { OrderContactComponent } from '../order-contact/order-contact.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
loginData:any
findIdForm:FormGroup
findNameForm:FormGroup
dateForm:FormGroup
finds:any=[]
prevDate:any
radioStatus0:boolean=false
radioStatus1:boolean=false
radioStatus2:boolean=false
  constructor(public dialog: MatDialog,
              private fb:FormBuilder,
              private api:ApiService,
              private login:LoginCheckService,
              private general:GeneralMaterialsService
            ) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)



    this.dateForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });


    this.findIdForm = this.fb.group({
      selectedValue: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });


    this.findNameForm = this.fb.group({
      deviceName: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });


    this.refreshFinds()

  }


  onclickDate(data){
    console.log("data==",data)

    var date = new Date();
    this.prevDate=date.setDate(date.getDate() - 1);

    this.radioStatus0= this.radioStatus0==true?false:true
    
    var date = new Date(this.prevDate);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    var tot = year + '-' + month + '-'  + day

    this.dateForm.patchValue({
      fromDate:tot,
      toDate:tot
    })
  }




onclickFindId(data){
  console.log("data==",data)

  var date = new Date();
  this.prevDate=date.setDate(date.getDate() - 1);

  this.radioStatus1= this.radioStatus1==true?false:true

  var date = new Date(this.prevDate);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var tot = year + '-' + month + '-'  + day

   this.findIdForm.patchValue({
      fromDate:tot,
      toDate:tot
    })
}




onclickFindName(data){
  console.log("data==",data)

  var date = new Date();
  this.prevDate=date.setDate(date.getDate() - 1);

  this.radioStatus2= this.radioStatus2==true?false:true

  var date = new Date(this.prevDate);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var tot = year + '-' + month + '-'  + day

  this.findNameForm.patchValue({
      fromDate:tot,
      toDate:tot
  })
}



  refreshFinds(){
    var data={
      userId:this.loginData.userId,
      tblName:'deviceRegistration'
    }
    this.api.getData(data).then((res:any)=>{
      console.log("find data ======",res);
      if(res.status){
        this.finds=res.success
      }
    })
  }

  onSubmitDateForm(data){
    console.log("data====",data)
       var value={
      userId:this.loginData.userId,
      fromDate:data.fromDate,
      toDate:data.toDate,
    }
    this.api.getDeviceHistoryBasedOnDate(value).then((res:any)=>{
      console.log("find data ======",res);
      if(res.status){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '90vh';
        dialogConfig.width = '75vw';
        dialogConfig.data = {
          type:"basedOnDate",
          data:res.success,
          fromDate:data.fromDate,
          toDate:data.toDate,
        }
        const dialogRef = this.dialog.open(HistoryReportComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          this.refreshFinds()
        });
      }
    })
  }


  onSubmitFindId(data){
    console.log("data====",data)
    var value={
      userId:this.loginData.userId,
      deviceId:data.selectedValue,
      fromDate:data.fromDate,
      toDate:data.toDate,
    }
    this.api.getDeviceHistoryBasedOnDate(value).then((res:any)=>{
      console.log("find data ======",res);
      if(res.status){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '90vh';
        dialogConfig.width = '75vw';
        dialogConfig.data = {
          type:"basedOnFindId",
          data:res.success,
          valueSelected:data.selectedValue,
          fromDate:data.fromDate,
          toDate:data.toDate,
        }
        const dialogRef = this.dialog.open(HistoryReportComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          this.refreshFinds()
        });
      }
    })
  }



  onSubmitFindName(data){
    console.log("data====",data)
    var value={
      userId:this.loginData.userId,
      deviceName:data.deviceName,
      fromDate:data.fromDate,
      toDate:data.toDate,

    }
    this.api.getDeviceHistoryBasedOnDeviceName(value).then((res:any)=>{
      console.log("find data ======",res);
      if(res.status){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '90vh';
        dialogConfig.width = '75vw';
        dialogConfig.data = {
          type:"basedOnFindName",
          data:res.success,
          deviceName:data.deviceName,
          fromDate:data.fromDate,
          toDate:data.toDate,
        }
        const dialogRef = this.dialog.open(HistoryReportComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          this.refreshFinds()
        });
      }
    })
  }




}
