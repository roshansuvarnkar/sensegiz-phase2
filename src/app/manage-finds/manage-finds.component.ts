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

elements: any = [];
headElements = ['id','deviceId','deviceName',	'shift',	'infected',	'edit',	'delete'];
shift = new FormControl('');
shifts:any=[]
elementsTemp:any=[]

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
  this.refreshShift()
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
      this.elements=[]
      for (let i = 0; i <this.findData.length; i++) {
        this.elements.push(
          { 
              id: this.findData[i].id,
              deviceId: this.findData[i].deviceId,
              deviceName: this.findData[i].deviceName,
              shift: this.findData[i].shiftName ,
              infected: this.findData[i].infected,
              edit:'edit',
              delete:'delete',
          });
      }
      this.elementsTemp = this.elements
    }
  })
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
    userId:this.loginData.userId,
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


onShiftSelection(a){
  console.log("a===",a)
    var data = {
    shiftId:a.shift,
    userId:this.loginData.userId,
    deviceId:a.deviceId
  }
  this.api.editShift(data).then((res:any)=>{
    console.log("shift update data ======",res);
    if(res.status){
      this.refreshFinds()
      var msg = 'Employee Shift updated Successfully'
      this.general.openSnackBar(msg,'')
    }
  })
}



search(a){
  if(a.length>0){
    this.elements = this.elementsTemp.filter(obj=>{
      return ((obj.deviceName.toString().toLowerCase().indexOf(a)>-1) || (obj.deviceId.toString().toLowerCase().indexOf(a)>-1))
    })
  }
  else{
    this.elements = this.elementsTemp
  }
}

}
