import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { AddFindComponent } from '../add-find/add-find.component';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { EditDeviceComponent } from '../edit-device/edit-device.component';
import { GeneralMaterialsService } from '../general-materials.service';
import {FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-manage-finds',
  templateUrl: './manage-finds.component.html',
  styleUrls: ['./manage-finds.component.css']
})
export class ManageFindsComponent implements OnInit {
loginData:any
findData:any=[]
icon1:string='report'
icon2:string='report_off'
icon4:string='keyboard_arrow_up'
elements: any = [];
headElements = ['id','deviceId','deviceName',	'shift',	'infected',	'edit',	'delete'];
shift = new FormControl('');
shifts=[
  {
    name:"Shift1 Morning Shift"
  },
  {
    name:"Shift2 Afternoon Shift"
  },
  {
    name:"Shift3 Night Shift"
  },
]

    

constructor(public dialog: MatDialog,private api: ApiService,private login:LoginCheckService,private general:GeneralMaterialsService,) {}


openDialog(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.height = '50vh';
  dialogConfig.width = '50vw';
  dialogConfig.data = {
    type:"finds"
  }
  const dialogRef = this.dialog.open(AddFindComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    this.refreshFinds()
  });
}


ngOnInit(): void {
  this.loginData = this.login.Getlogin()
  this.loginData = JSON.parse(this.loginData)
  this.refreshFinds()
}



refreshFinds(){
  var data={
    userId:this.loginData.userId,
    tblName:'deviceRegistration'
  }

  this.api.getData(data).then((res:any)=>{
    console.log("find device data ======",res);
    if(res.status){
      this.findData=res.success
      for (let i = 0; i <this.findData.length; i++) {
        this.elements.push(
          { id: this.findData[i].id,
             deviceId: this.findData[i].deviceId,
              deviceName: this.findData[i].deviceName,
              shift: this.findData[i].shiftName ,
              infected: this.findData[i].infected,
              edit:'edit',
              delete:'delete'
          });
      }
    }
  })
}


edit(data){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.height = '50vh';
  dialogConfig.width = '50vw';
  dialogConfig.data = {
    type:"finds",
    data:data
  }
  const dialogRef = this.dialog.open(EditDeviceComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    this.refreshFinds()
  });
}


delete(a){
  if(confirm('Are you sure you want to delete the device')){
    console.log("yes",a)
  }
  var data = {
    id:a.id,
    tblName:'deviceRegistration'
  }
  this.api.deletedeviceandUser(data).then((res:any)=>{
    console.log("find data ======",res);
    if(res.status){
      this.refreshFinds()
      var msg = 'Device Deleted Successfully'
      this.general.openSnackBar(msg,'')
    }
  })
}



infected(a){
  if(confirm('Are you sure to do this operation')){
    console.log("yes",a)
  }

  var inf = a.infected == 0 ? 1 :0
  var data = {
    deviceId:a.deviceId,
    userId:a.userId,
    infected:inf
  }
  this.api.editInfectedPerson(data).then((res:any)=>{
    console.log("infected data ======",res);
    if(res.status){
      this.refreshFinds()
      var msg = 'Employee updated Successfully'
      this.general.openSnackBar(msg,'')
    }
  })
}


onFoodSelection1(a,b){
  console.log("a===",a,"b===",b.value)
}

}
