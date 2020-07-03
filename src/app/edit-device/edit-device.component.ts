import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {
type:any
deviceData:any
Findform:FormGroup
gatewayform:FormGroup
userform:FormGroup
coinform:FormGroup
loginData:any
gateway:any=[]
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA)  data,
    private api: ApiService,
    private login:LoginCheckService,
    private general:GeneralMaterialsService
  ) {
    // console.log("data===",data)
    this.type=data.type
    this.deviceData=data.data
  }

  ngOnInit(): void {

    
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.Findform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: [{value: '', disabled: true}, Validators.required],
      empId:[''],
      mobileNum:[''],
      emailId:[''],

    });



    this.gatewayform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: [{value: '', disabled: true}, Validators.required]
    });



    this.userform = this.fb.group({
      mobileNum: ['', Validators.required],
      emailId: ['', Validators.required]
    });

    this.coinform=this.fb.group({
      coinId: [{value: '', disabled: true}, Validators.required],
      coinName: ['', Validators.required],
      gatewayId:['', Validators.required],
    });

    if(this.type=='finds'){
      this.Findform.patchValue({
        deviceName: this.deviceData.deviceName,
        deviceId: this.deviceData.deviceId,
        empId:this.deviceData.empId,
        mobileNum:this.deviceData.mobileNum,
        emailId:this.deviceData.emailId
      });
    }

    else if(this.type=='gateways'){
      this.gatewayform.patchValue({
        deviceName: this.deviceData.gatewayName,
        deviceId: this.deviceData.gatewayId
      });
    }

    else if(this.type=='users'){
      this.userform.patchValue({
        mobileNum: this.deviceData.mobileNum,
        emailId: this.deviceData.emailId
      });
    }
    else if(this.type=='coins'){
      this.coinform.patchValue({
        coinId: this.deviceData.coinId,
        coinName: this.deviceData.coinName,
        gatewayId:this.deviceData.gatewayId,
      });
    }

    this.refreshGateway()
  }


  Findsubmit(data){
    if (this.Findform.valid) {
      try {
        // console.log("find edit===",data)
        data.tblName='deviceRegistration'
        data.id=this.deviceData.id
        data.userId=this.deviceData.userId
        this.api.editDeviceRegister(data).then((res:any)=>{
          // console.log("find submit====",res);
          if(res.status){
            var msg = 'Device Updated Successfully'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Device Name Already exists, try different Name'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Device Name or Device Id Already exists, try different Device'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'The Employee ID already exist'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Mobile number Already exists, try with different Mobile number'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Email Id Already exists, try with different Email Id'
            this.general.openSnackBar(msg,'')
          }
        })
      } catch (err) {
      }
    }
  }



  Gatewaysubmit(data){
    if (this.gatewayform.valid) {
      try {
        data.tblName='gatewayRegistration'
        data.id=this.deviceData.id
        data.userId=this.deviceData.userId
        this.api.editDeviceRegister(data).then((res:any)=>{
          // console.log("gateway submit==",res)
          if(res.status){
            var msg = 'Gateway Registered Successfully'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Gateway Already exists, try different gateway'
            this.general.openSnackBar(msg,'')
          }
        })
      } catch (err) {
      }
    }
  }


  Usersubmit(data){

    if (this.userform.valid) {
      try {
        data.id=this.deviceData.id
        this.api.EditUserRegister(data).then((res:any)=>{
          // console.log("user submit==",res)
          if(res.status){
            var msg = 'User Registered Successfully'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Device Already exists, try different device'
            this.general.openSnackBar(msg,'')
          }
        })
      } catch (err) {
      }
    }
  }


  coinsubmit(data){
    if (this.coinform.valid) {
      try {
        data.id=this.deviceData.id
        this.api.editCoinRegister(data).then((res:any)=>{
          console.log("coin submit==",res)
          if(res.status){
            var msg = 'coin Registered Successfully'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Coin Already exists, try different Coin'
            this.general.openSnackBar(msg,'')
          }
        })
      } catch (err) {
      }
    }

  }
  refreshGateway(){
    var data={
        userId:this.loginData.userId,
        tblName:'gatewayRegistration'
      }
  
    this.api.getData(data).then((res:any)=>{
      console.log("gateway data ======",res);
      if(res.status){
        this.gateway=res.success
  
  
      }
  
    })
  }

}
