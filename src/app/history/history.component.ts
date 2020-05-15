import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
loginData:any
findIdForm:FormGroup
findNameForm:FormGroup
dateForm:FormGroup
finds:any=[]
  constructor(private fb:FormBuilder,private api:ApiService,private login:LoginCheckService,private general:GeneralMaterialsService) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)



    this.dateForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });


    this.findIdForm = this.fb.group({
      selectedValue: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });


    this.findNameForm = this.fb.group({
      deviceName: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });


    this.refreshFinds()
  }

  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '50vw';
    dialogConfig.data = {
      type:"finds"
    }
    const dialogRef = this.dialog.open(HistoryReportComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.refreshFinds()
    });
  }
  refreshFinds(){
    var data={
      userId:this.loginData.userId,
      tblName:'deviceRegistration'
    }
    this.api.getData(data).then((res:any)=>{
      console.log("find data ======",res);
      if(res.status){
        this.finds=res.success
      }
    })
  }

  onSubmitDateForm(data){
    console.log("data====",data)
  }


  onSubmitFindId(data){
    console.log("data====",data)
  }



  onSubmitFindName(data){
    console.log("data====",data)
  }

}
