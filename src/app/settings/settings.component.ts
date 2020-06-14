import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { EditSettingShiftComponent } from '../edit-setting-shift/edit-setting-shift.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  workingForm:FormGroup
  distanceForm:FormGroup
  maxContactForm:FormGroup
  txPowerForm:FormGroup
  inactivityStatusForm:FormGroup
  bufferForm:FormGroup
  loginData:any
 
  constructor(public dialog: MatDialog,private fb:FormBuilder,private api:ApiService,private login:LoginCheckService,private general:GeneralMaterialsService) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)



    this.workingForm = this.fb.group({
      shift: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required]
    });


    this.distanceForm = this.fb.group({
      distance: ['', Validators.required],
    });


    this.maxContactForm = this.fb.group({
      threshold: ['', Validators.required],
    });


    this.txPowerForm = this.fb.group({
      txPower: ['', Validators.required],
    });

    this.inactivityStatusForm = this.fb.group({
      inactivity: ['',Validators.required]
    });
    this.bufferForm = this.fb.group({
      buffer: ['',Validators.required]
    })
  }


  onSubmitWorkForm(data) {
     if (this.workingForm.valid) {
       try {
         console.log("time data===",data)
         data.userId = this.loginData.userId
         this.api.setTime(data).then((res:any)=>{
           console.log("time insrted or updated",res)
           if(res.status){
             var msg = 'Shift time updated Successfully'
             this.general.openSnackBar(msg,'')
           }
         })
       } catch (err) {
       }
     }
   }



  onSubmitDistanceForm(data) {
     if (this.distanceForm.valid) {
       try {
         console.log("distance ===",data)
         data.userId = this.loginData.userId
         this.api.addDistance(data).then((res:any)=>{
           console.log("distance insrted or updated",res)
           if(res.status){
             var msg = 'Minimum distance updated Successfully'
             this.general.openSnackBar(msg,'')
           }
         })
       } catch (err) {
       }
     }
   }


  onSubmitmaxContactForm(data) {
     if (this.maxContactForm.valid) {
       try {
         console.log("threshold ===",data)
         data.userId = this.loginData.userId
         this.api.addMaxContactThreshold(data).then((res:any)=>{
           console.log("contact threshold insrted or updated",res)
           if(res.status){
             var msg = 'Max contact threshold updated Successfully'
             this.general.openSnackBar(msg,'')
           }
         })
       } catch (err) {
       }
     }
   }



  onSubmittxPowerForm(data) {
     if (this.txPowerForm.valid) {
       try {
         console.log("threshold ===",data)
         data.userId = this.loginData.userId
         this.api.addTxPower(data).then((res:any)=>{
           console.log("tx power updated",res)
           if(res.status){
             var msg = 'Transmission power updated Successfully'
             this.general.openSnackBar(msg,'')
           }
         })
       } catch (err) {
       }
     }
   }


   onSubmitInactivityStatusForm(value){
   
    if (this.bufferForm.valid) {
      try {
        console.log("inactivity data==",value)
        var data={
        userId : this.loginData.userId,
        inactivity : value.inactivity

        }
        
        this.api.getInactivityDeviceSetting(data).then((res:any)=>{
          console.log("Inactivity response===",res)
          // if(res.status){
          //   var msg = 'Transmission power updated Successfully'
          //   this.general.openSnackBar(msg,'')
          // }
        })
      } catch (err) {
      }
    }
  

   }
  

   onSubmitBufferForm(value){
    
    if (this.bufferForm.valid) {
      try {
        console.log("buffer data==",value)
        var data={
        userId : this.loginData.userId,
        buffer : value.buffer

        }
        
        this.api.getBufferDeviceSetting(data).then((res:any)=>{
          console.log("Buffer response===",res)
          // if(res.status){
          //   var msg = 'Transmission power updated Successfully'
          //   this.general.openSnackBar(msg,'')
          // }
        })
      } catch (err) {
      }
    }
   }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '60vh';
    dialogConfig.width = '70vw';
    dialogConfig.data = {
      type:"shifts"
    }
    const dialogRef = this.dialog.open(EditSettingShiftComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
