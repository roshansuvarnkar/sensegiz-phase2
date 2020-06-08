import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';


@Component({
  selector: 'app-edit-setting-shift',
  templateUrl: './edit-setting-shift.component.html',
  styleUrls: ['./edit-setting-shift.component.css']
})
export class EditSettingShiftComponent implements OnInit {

	shiftForm:FormGroup
	type:any
	shifts:any
	loginData:any


    constructor(
	    private fb: FormBuilder,
	    public dialogRef: MatDialogRef<EditSettingShiftComponent>,
	    @Inject(MAT_DIALOG_DATA)  data,
	    private api: ApiService,
	    private login:LoginCheckService,
	    private general:GeneralMaterialsService
  	){
		this.type=data.type
		this.shiftForm = this.fb.group({
		  items:this.fb.array([])
		});
  	}

	ngOnInit(): void {
	  this.loginData = this.login.Getlogin()
	  this.loginData = JSON.parse(this.loginData)
	  this.refreshShift()
	}

	refreshShift(){
	  var data={
	    userId:this.loginData.userId,
	    tblName:'deviceShift'
	  }

	  this.api.getData(data).then((res:any)=>{
	    console.log("shift  data ======",res);
	    if(res.status){
	      this.shifts=res.success

  		    const control = <FormArray>this.shiftForm.controls.items;
			control.controls = [];
			for(var i=0;i<this.shifts.length;i++){
				control.push(this.fb.group(
				  {
				    id:[this.shifts[i].id],
				    userId:[this.shifts[i].userId],
				    shiftName:[this.shifts[i].shiftName],
				    fromTime:[this.shifts[i].fromTime],
				    toTime:[this.shifts[i].toTime],
				  }
				))
			}
  		  console.log("controls=",control)
	    }
	  })
	}



	submit(a){
		console.log("a===",a)
		this.api.editSettingShift(a).then((res:any)=>{
        console.log("shift edit==",res)
        if(res.status){
          var msg = 'Shift updated Successfully'
          this.general.openSnackBar(msg,'')
        }
        this.refreshShift()
      })
	}


  delete(a){
    console.log("delete===",a);
    if(confirm("Are you sure you want to delete the shift")){
      this.api.deleteShift(a).then((res:any)=>{
        console.log("shift delete==",res)
        if(res.status){
          var msg = 'Shift deleted Successfully'
          this.general.openSnackBar(msg,'')
        }
        this.refreshShift()
      })
    }
  }

}
