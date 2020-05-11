import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  workingForm:FormGroup
  distanceForm:FormGroup
  maxContactForm:FormGroup
  loginData:any

  constructor(private fb:FormBuilder,private api:ApiService,private login:LoginCheckService,private general:GeneralMaterialsService) { }

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
             this.workingForm.reset()
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
             this.workingForm.reset()
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
             this.maxContactForm.reset()
           }
         })
       } catch (err) {
       }
     }
   }

}
