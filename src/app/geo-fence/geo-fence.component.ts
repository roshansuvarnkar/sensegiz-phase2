import { Component, OnInit ,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { EditDeviceComponent } from '../edit-device/edit-device.component';
import { GeneralMaterialsService } from '../general-materials.service';
import {FormControl, FormBuilder,Validators,FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-geo-fence',
  templateUrl: './geo-fence.component.html',
  styleUrls: ['./geo-fence.component.css']
})
export class GeoFenceComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  deviceSelectForm:FormGroup
  loginData:any
  findData:any=[]
  coinData:any=[]
  coin:any=[]
  geofenceData:any=[]
  geoFenceStatus:boolean=false
  dataSource: any = [];
  displayedColumns = ['i','deviceName','coinName','delete']; 
  constructor(private fb: FormBuilder,private api: ApiService,private login:LoginCheckService,private general:GeneralMaterialsService) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.refreshFinds()
    this.refreshCoins()
    this.refreshGeoFence() 

    this.deviceSelectForm=this.fb.group({
      findSelect:['',Validators.required],
      coinSelect:['',Validators.required]
    })



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
   
      }
    })
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
  
      }
    })
  }
  
   
     
  
  refreshGeoFence(){
    var data={
      userId:this.loginData.userId
    }
    this.api.getGeofenceData(data).then((res:any)=>{
      console.log("Geo fence device get data ======",res);
      if(res.status && res.data.length>=0){
        this.geofenceData=[]
         for(let i=0;i<res.data.length;i++){
           this.geofenceData.push({
             i:i+1,
             id:res.data[i].id,
             deviceName:res.data[i].deviceName,
             coinName:res.data[i].coinName,
             coinId:res.data[i].geofence,
             delete:'delete'
           })
         }
       
         this.dataSource = new MatTableDataSource(this.geofenceData);
         setTimeout(() => {
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;
          //  this.paginator.length = this.currentPageSize
         })
      }
      else{
        this.geoFenceStatus=true
      }
    })
  }



  submit(data){
    console.log("data====",data)
   
    var msg = 'Geofence updated Successfully'
        this.general.openSnackBar(msg,'')
    var value=this.coinData.filter((element)=>{
      return data.coinSelect.includes(element.coinId)
    });
    
      if(value.length>0){
        this.coin=[]
        for(let i=0;i<value.length;i++){
          this.coin.push(value[i].coinName)
        }
       
    }
    var data1={
      userId:this.loginData.userId,
      deviceId:data.findSelect,
      coinId:data.coinSelect,
      coinName:this.coin

    }
     console.log("data1==",data1)
     this.api.setGeofenceData(data1).then((res:any)=>{
      console.log("Geo fence device set data ======",res);
      if(res.status){

        this.refreshGeoFence()
      
      }
     
    })
    
  
  }

 delete(value){
   console.log("delete geofence===",value)
 if(confirm("Do you sure want to deassign geofence?")){
  var data={
    id:value.id,
    userId:this.loginData.userId,
    coinId:value.coinId.split(','),
    coinName:value.coinName.split(','),

  }
  console.log("delete geofence data===",data)
  this.api.deleteGeofence(data).then((res:any)=>{
   console.log("Geo fence device set data ======",res);
   if(res.status){
      var msg = 'Geofence Deassigned Successfully'
      this.general.openSnackBar(msg,'')   
     this.refreshGeoFence()
     this.refreshCoins()
   }
  
 })
 }
 }

 search(a){

  this.dataSource = new MatTableDataSource(this.geofenceData);
  setTimeout(() => {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter =a.trim().toLowerCase()
  })
}
}
