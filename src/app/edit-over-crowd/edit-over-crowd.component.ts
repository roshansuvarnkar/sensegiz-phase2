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
	overCrowdGroupForm:FormGroup
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
	this.groupCoinData=data.groupdata


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


    this.overCrowdGroupForm = this.fb.group({
		  items:this.fb.array([])
		});

	  this.refreshCoins()
	  this.refreshGroupCoins()
  }

	refreshCoins(){
		var data={
		  userId:this.loginData.userId,
		  tblName:'coinRegistration'
		}

		this.api.getData(data).then((res:any)=>{
		 console.log("coin data ======",res);
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
      console.log(" group  data ======",res);
      this.groupCoinData=[]
      if(res.status){
        this.groupCoinData = res.success;

        var groupData=this.dataDateReduce(this.groupCoinData)
        console.log("groupData===",groupData)

        this.groupCoinData = Object.keys(groupData).map((data)=>{
          return {
            name : data,
            data : groupData[data]
          }
        })

        console.log("this.groupCoinData==",this.groupCoinData)

        const control = <FormArray>this.overCrowdGroupForm.controls.items;
        control.controls = [];
        for(var i=0;i<this.groupCoinData.length;i++){
          control.push(this.fb.group(
            {
              name:[this.groupCoinData[i].name],
              maxLimit:[this.groupCoinData[i].data[0].groupMaxlimit],
              data:this.setData(this.groupCoinData[i])
            })
          )
          console.log("this.overCrowdGroupForm==",this.overCrowdGroupForm);
        }
        console.log("this.overCrowdGroupForm11111==",this.overCrowdGroupForm);
        // for(var j=0 ; j<this.groupCoinData[i].data ; i++){
        //   control.push(this.fb.group(
        //     {
        //       id:[this.groupCoinData[i].id],
        //       coinId:[this.groupCoinData[i].coinId],
        //       coinName: [this.groupCoinData[i].coinName],
        //       gatewayId:[this.groupCoinData[i].gatewayId],
        //       maxLimit:[this.groupCoinData[i].groupMaximit],
        //       groupName:[this.groupCoinData[i].groupName],
        //       isGroup:[this.groupCoinData[i].isGroup],
        //       userId:[this.groupCoinData[i].userId],
        //       overCrowd:[this.groupCoinData[i].overCrowd],
        //     }
        //   ))
        // }


// 	var groupData=this.dataDateReduce(res.success)
// console.log("groupData===",groupData)
// 	this.groupCoinData = Object.keys(groupData).map((data)=>{
//
// 	  return {
// 		name : data,
// 		data : groupData[data]
// 	  }
// 	})
//   console.log("groupCoinData===",this.groupCoinData)
//
//
//
//       for(let i=0;i<this.groupCoinData.length;i++){
//
//         for(let j=0;j<this.groupCoinData[i].data.length-1;j++){
//           this.groupCoinData[i].data[j].coinName = this.groupCoinData[i].data[j].coinName+','
//         }
//
//         this.groupCoinData[i].data[this.groupCoinData[i].data.length-1].coinName=this.groupCoinData[i].data[this.groupCoinData[i].data.length-1].coinName+'.'
//
//       }
//       console.log("group data reduced==",this.groupCoinData)
//
    }

  })
}


setData(x) {
  let arr = new FormArray([])
  console.log("x===",x)
  x.data.forEach(y => {
    console.log("y===",y)
    arr.push(this.fb.group({
      id:[y.id],
      coinId:[y.coinId],
      coinName: [y.coinName],
      gatewayId:[y.gatewayId],
      maxLimit:[y.groupMaximit],
      groupName:[y.groupName],
      isGroup:[y.isGroup],
      userId:[y.userId],
      overCrowd:[y.overCrowd]
    }))
  })
  return arr;
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
