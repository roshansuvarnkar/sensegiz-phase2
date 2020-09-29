import { Component, OnInit,Inject,ViewChild,ElementRef  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'; 
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators'; 
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-find',
  templateUrl: './add-find.component.html',
  styleUrls: ['./add-find.component.css']
})
export class AddFindComponent implements OnInit {
  @ViewChild('fileInput') fileInput : ElementRef;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef
  SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.India];
  Findform:FormGroup
  gatewayform:FormGroup
  userform:FormGroup
  coinForm:FormGroup
  uploadForm:FormGroup
  gateway:any=[]
  type:any
  loginData:any
  findStatus:boolean=false
  gatewayStatus:boolean=false
  userStatus:boolean=false
  error:boolean=false
  storeData: any; 
  fileUploaded: File;  
  worksheet: any; 
  fileToUpload: File = null;
  files:any=[]
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddFindComponent>,
    @Inject(MAT_DIALOG_DATA)  data,
    private api: ApiService,
    private login:LoginCheckService,
    private general:GeneralMaterialsService
  ) {
      this.type=data.type
  }



  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)


    this.Findform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: ['', Validators.required],
      employeeId: [''],
      mobileNum: [''],
      emailId: ['',[Validators.email]]

    });



    this.gatewayform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: ['', [Validators.required,Validators.minLength(12), Validators.maxLength(12)]]
    });



    this.userform = this.fb.group({
      mobileNum: ['',[ Validators.required]],
      emailId: ['',[Validators.email]]
    });

    this.coinForm =this.fb.group({
      coinName: ['', Validators.required],
      coinId: ['', Validators.required],
      gatewayId:['', Validators.required]
    });
    
    this.uploadForm =this.fb.group({
      excelFile:null
    });

    this.refreshGateway()

  }

onNoClick(): void {
  this.dialogRef.close();
}

Findsubmit(data){
  if (this.Findform.valid) {
    try {
      console.log("find submit====",data)
      data.tblName ='deviceRegistration'
      data.userId=this.loginData.userId
      data.mobileNum=data.mobileNum!=null ||data.mobileNum!=undefined  ?data.mobileNum.e164Number:''

      this.api.deviceRegister(data).then((res:any)=>{
        // console.log("find submit====",res);
        if(res.status){
          var msg = 'Find Registered Successfully'
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          var msg = 'Device Name or Device Id Already exists, try different device'
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
      data.userId=this.loginData.userId
      this.api.deviceRegister(data).then((res:any)=>{
        // console.log("gateway submit==",res)
        if(res.status){
          var msg = 'Gateway Registered Successfully'
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          var msg = 'Gateway Name or Gateway Id Already exists, try different gateway'
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
      data.userId=this.loginData.userId
      this.api.UserRegister(data).then((res:any)=>{
        // console.log("user submit==",res)
        if(res.status){
          var msg = 'User Registered Successfully'
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          var msg = 'Email id or Mobile Number Already exists, try different user'
          this.general.openSnackBar(msg,'')
        }
      })
    } catch (err) {
    }
  }
}

coinSubmit(data){
  console.log("data======",data)
  if (this.coinForm.valid) {
    try {
      data.userId=this.loginData.userId
      console.log("data======",data)
      this.api.coinRegister(data).then((res:any)=>{
        console.log("coin submit==",res)
        if(res.status){
          var msg = 'Coin Registered Successfully'
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          var msg = 'Coin Name or Coin Id Already exists, try different coin'
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
