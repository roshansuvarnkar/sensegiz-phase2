import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-over-crowd',
  templateUrl: './edit-over-crowd.component.html',
  styleUrls: ['./edit-over-crowd.component.css']
})
export class EditOverCrowdComponent implements OnInit {

	overCrowdForm:FormGroup
	type:any

	coinData:any
	loginData:any
	gateway:any

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditOverCrowdComponent>,
    @Inject(MAT_DIALOG_DATA)  data,
    private api: ApiService,
    private login:LoginCheckService,
    private general:GeneralMaterialsService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    
    this.overCrowdForm = this.fb.group({
			data:this.fb.array([])
      });
      this.refreshCoins()
  }

  refreshGateway(){
		var data={
			userId:this.loginData.userId,
			tblName:'gatewayRegistration'
		  }
	  
		this.api.getData(data).then((res:any)=>{
		//   console.log("gateway data ======",res);
		  if(res.status){
			this.gateway=res.success
	  
		  }
	  
		})
	  }

	refreshCoins(){
		var data={
		  userId:this.loginData.userId,
		  tblName:'coinRegistration'
		}
	  
		this.api.getData(data).then((res:any)=>{
		//   console.log("coin data ======",res);
		  if(res.status){
			this.coinData=res.success
			const control = <FormArray>this.overCrowdForm.controls.data;
			control.controls = [];
			
		  for (let i = 0; i <this.coinData.length; i++) {
			control.push(this.fb.group(
				{
					id:[this.coinData[i].id],
					coinId:[this.coinData[i].coinId],
					coinName: [this.coinData[i].coinName],
					// gatewayId:[this.coinData[i].gatewayId],
					maxLimit:[this.coinData[i].maxLimit]
					
				}
			));	
		  }	
		//   console.log("control==",control)
		}
	})
 }
 
 submitOvercrowd(data){
	
	data.coinId=[data.coinId]
	data.userId=this.loginData.userId
	//  console.log("data==",data)
	  this.api.maxLimit(data).then((res:any)=>{
		// console.log("limit response===",res)
		if(res.status){
		  var msg='Max limit updated Successfully'
		  this.general.openSnackBar(msg,'')
		  this.refreshCoins()
		}
	  })

  }

}
