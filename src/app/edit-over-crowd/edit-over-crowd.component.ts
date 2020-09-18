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
	groupByoverCrowdForm:FormGroup
	type:any
	coinData:any
	loginData:any
	gateway:any
	groupCoinData=[]

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditOverCrowdComponent>,
    @Inject(MAT_DIALOG_DATA)  data,
    private api: ApiService,
    private login:LoginCheckService,
    private general:GeneralMaterialsService,
    private route: ActivatedRoute

  ) {
	this.type=data.type

	

   }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
	this.loginData = JSON.parse(this.loginData)
    
    this.overCrowdForm = this.fb.group({
			data:this.fb.array([])
	  });
	  
	  this.groupByoverCrowdForm=this.fb.group({
		coinSelect:[''],
		coinId:[''],
		maxLimit:[''],
		groupName:[''],
		})
	  this.refreshCoins()
	  this.refreshGroupCoins()
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
 refreshGroupCoins(){
    var data={
      userId:this.loginData.userId,
  
    }

    this.api.getGroupData(data).then((res:any)=>{
	  console.log(" group  data ======",this.groupCoinData);
      this.groupCoinData=[]
      if(res.status){
	// 	const control = <FormArray>this.groupByoverCrowdForm.controls.Groupdata;
	// 	control.controls = [];
		
	//   for (let i = 0; i <this.groupCoinData.length; i++) {
	// 	for(let j=0;j<this.groupCoinData[i].data.length;j++){
	// 		control.push(this.fb.group(
	// 			{
	// 				id:[this.groupCoinData[i].data[j].id],
	// 				coinId:[this.groupCoinData[i].data[j].coinId],
	// 				coinName: [this.groupCoinData[i].data[j].coinName],
	// 				gatewayId:[this.groupCoinData[i].data[j].gatewayId],
	// 				maxLimit:[this.groupCoinData[i].data[j].groupMaximit],
	// 				groupName:[this.groupCoinData[i].data[j].groupName]
					
	// 			}
	// 		));	
	// 	}
	//   }

	  
	var groupData=this.dataDateReduce(res.success)
        
	this.groupCoinData = Object.keys(groupData).map((data)=>{
	   
	  return {
		name : data,
		data : groupData[data]
	  }
	})
         
       
       
	  for(let i=0;i<this.groupCoinData.length;i++){

			for(let j=0;j<this.groupCoinData[i].data.length-1;j++){
			this.groupCoinData[i].data[j].coinName = this.groupCoinData[i].data[j].coinName+','
			}
	 
			this.groupCoinData[i].data[this.groupCoinData[i].data.length-1].coinName=this.groupCoinData[i].data[this.groupCoinData[i].data.length-1].coinName+'.'

	   }
    console.log("group data reduced==",this.groupCoinData)

      }
     
	})
}
dataDateReduce(data){
    return data.reduce((group,obj)=>{
      const name = obj.groupName
      if(!group[name]){
        group[name]=[]
      }
      group[name].push(obj)
      return group
    },{})
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

  deleteOvercrowd(value){
	
	  var data = {
		id:value.id,
		tblName:'coinRegistration'
	  }
	  this.api.deletedeviceandUser(data).then((res:any)=>{
		// console.log("coin data ======",res);
		if(res.status){
		  this.refreshCoins()
		  var msg = 'Coin Deleted Successfully'
		  this.general.openSnackBar(msg,'')
		}
	  })
  
  }


}
