import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { EditSettingShiftComponent } from '../edit-setting-shift/edit-setting-shift.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import * as moment from 'moment'


@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  txPowerForm:FormGroup
  distanceForm:FormGroup
  scanningForm:FormGroup
  scanCountForm:FormGroup
  inactivityForm:FormGroup
  timeForm:FormGroup
  bufferForm:FormGroup
  workingForm:FormGroup
  sendDataForm:FormGroup
  multishiftingselect:FormGroup
  setting:any=[]
  min:any=[]
  sec:any=[]
  shifts:any=[]
  multishift:any=[]
  inactivityStatusValue:any=[]
  dataGet:any
  statusCustomise:boolean=false
  selectedValue:boolean=false
  selectStatus1:boolean=false
  selectStatus2:boolean=false
  minStatus:boolean=false
  secStatus:boolean=false
  requiredStatus1:boolean=false
  requiredStatus2:boolean=false
  timeFormStatus:boolean=true
  bufferValue:boolean=false
  multipleShift:boolean=false
  timeExceed:boolean=false
  selectfind:boolean=false
  custom:boolean=false
  standered:boolean=true
  constructor(private fb:FormBuilder,public dialog: MatDialog,private api:ApiService,private login:LoginCheckService,private general:GeneralMaterialsService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bufferForm = this.fb.group({
      buffer: ['',[Validators.required, Validators.min(0)]]
    })

    this.txPowerForm = this.fb.group({
      txPower: ['', Validators.required],
    });
    this.distanceForm = this.fb.group({
      distance: ['', Validators.required],
      rssi: ['',Validators.pattern(/^[A-Z][A-Z 0-9]{1}$/)],
      wearable:['',Validators.required],
      customize:['']

    });
    this.scanningForm=this.fb.group({
      seconds:['',[Validators.required,Validators.max(75), Validators.min(1)]],
    })
    this.scanCountForm=this.fb.group({
      count:['',[Validators.required,Validators.max(253), Validators.min(0)]],
    })
    this.timeForm=this.fb.group({
      minutes:[{value:'',disabled: false},Validators.required],
      seconds:[{value:'',disabled: false},Validators.required]
    })

    this.workingForm = this.fb.group({
      shift: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required]
    });

    this.sendDataForm = this.fb.group({
      rate:['',[Validators.required,Validators.max(255), Validators.min(1)]],
    });

    this.inactivityForm = this.fb.group({
      inactivity: ['',Validators.required],
      type:['']
    });

    this.multishiftingselect=this.fb.group({
      shiftName:[''],
      deviceId:[''],
      status:['',Validators.required],
      type:['',Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.dataGet = JSON.parse(params.record) ;
      // console.log("data==",this.dataGet.userId)
  })

  this. refreshSetting()
  this.minThresholdMinsec()
  this.refreshShift()
  }

  refreshShift(){
    var data={
      userId:this.dataGet.userId,
      subUserId: (this.dataGet.hasOwnProperty('id') && this.dataGet.type==4 && this.dataGet.id!=0) ? this.dataGet.id : 0,
      tblName:'deviceShift'
    }

    this.api.getData(data).then((res:any)=>{
      // console.log("shift data ======",res);
      if(res.status){
        this.shifts=res.success
        this.multishift=res.success
        this.multishiftingselect.patchValue({
          shiftName:this.multishift[0]
        })
      }
    })
  }
  refreshSetting(){
    var data={
      userId:this.dataGet.userId,
      tblName:'deviceSetting'
    }
   // console.log("data get==",data)
    this.api.getData(data).then((res:any)=>{
    //  console.log("setting data page ======",res);

      if(res.status){
        this.setting = res.success[0]
        this.bufferForm.patchValue({
          buffer: res.success[0].buffer,
        })
        if(res.success[0].durationThreshold<=55){
          this.minStatus=true
          this.timeFormStatus=false
          this.timeForm.patchValue({
            minutes:'none',
            seconds:(res.success[0].durationThreshold).toString()
          })
        }else if(res.success[0].durationThreshold>55){
          this.secStatus=true
          this.timeFormStatus=false
          this.timeForm.patchValue({
            seconds:'none',
            minutes:res.success[0].durationThreshold/60,
          })
        }
        this.distanceForm.patchValue({
          distance: res.success[0].distance.toString(),
          rssi: res.success[0].rssi,
          wearable:res.success[0].type.toString()
        })
        this.txPowerForm.patchValue({
          txPower: res.success[0].txPower,
        })
        this.scanningForm.patchValue({
          seconds:res.success[0].scanningInterval.toString()
        })
      /*   this.scanCountForm.patchValue({
          count:res.success[0].scanCount.toString()
        }) */
        this.sendDataForm.patchValue({
          rate:res.success[0].gatewayDataRate.toString()
        })
        if( res.success[0].inactivityStatus == 1){
          this.inactivityStatusValue = {
            value:true,
            status:'Disable'
          }
          this.inactivityForm.patchValue({
            inactivity: res.success[0].inactivity,
            type : res.success[0].inactivityStatus
         })
        }
       /*  else{
          this.inactivityStatusValue = {
            value:false,
            status:'Enable'
          }
          this.inactivityForm.patchValue({
            inactivity: res.success[0].inactivity,
            type : res.success[0].inactivityStatus
         })
        } */
        if( res.success[0].inactivityStatus == 2){
          this.inactivityStatusValue = {
            value:false,
            status:'Enable'
          }
         /*  this.inactivityForm.patchValue({
            inactivity: res.success[0].inactivity
         }) */
        }
      }else{
        if(res.code == '403'){
          this.login.logout()
        }
      }
    })
  }

  minThresholdMinsec(){
    var seconds=''
    for(let i =0;i<=5;i++){
      var minutes=i==0?'none':i
      this.min.push(minutes)
     }
    for(let i =-1;i<=11;i++){
      if(i==1|| i==2 || i==3){
      }
      else{
        if(i==-1){
          seconds='none'
        }
        else{
         seconds=(i*5).toString()
        }
        this.sec.push(seconds)
      }
    }
  }


  onSubmitDistanceForm(data) {
   // console.log("data=",data)

     if (this.distanceForm.valid) {
       try {
         var value={}
         data.customize=data.customize==''?0:data.customize
        if(data.customize==1){
          value={
            userId:this.dataGet.userId,
            type:data.wearable,
            distance:data.distance,
            customize:data.customize,
            rssi:data.rssi
          }
        }
        else{
          value={
            userId:this.dataGet.userId,
            type:data.wearable,
            distance:data.distance,
            customize:data.customize,

            }
        }
        // console.log("distance ===",value,data)
         this.api.setDeviceRssi(value).then((res:any)=>{
          //console.log("distance insrted or updated",res)
           if(res.status){
            var msg = 'Minimum distance and wearable type updated Successfully'
            this.general.openSnackBar(msg,'')
            this.refreshSetting()
        //      this.api.updateWearableType(value).then((res:any)=>{
        //      if(res.status){
        //       console.log("type",res)
        //       var msg = 'Minimum distance and wearable type updated Successfully'
        //      this.general.openSnackBar(msg,'')
        //      this.refreshSetting()
        //      }


        //  })
        }
        })
       } catch (err) {
       }
     }
   }
  customizeoff(){
    this.statusCustomise=false
    this.distanceForm.patchValue({
      customize:0,
    })
  }
  onSubmittxPowerForm(data) {
    if (this.txPowerForm.valid) {
      try {
        // console.log("threshold ===",data)
        data.userId = this.dataGet.userId
        this.api.addTxPower(data).then((res:any)=>{
        //  console.log("tx power updated",res)
          if(res.status){
            this.refreshSetting()
            var msg = 'Transmission power updated Successfully'
            this.general.openSnackBar(msg,'')
          }
        })
      } catch (err) {
      }
    }
  }


  customise(event){
    //console.log("event===",event)
    this.statusCustomise = this.statusCustomise == true ? false : true
    this.distanceForm.patchValue({
      customize:event.checked==true?1:0
    })
  }
  onclick(event){
    //console.log("radio value==",event.value)
    if(event.value==0){
      this.distanceForm.patchValue({
        wearable:"0"
      })
      if(this.setting.distance == "1" ){
        this.distanceForm.patchValue({
          rssi:'BE'
        })
      }
      else if(this.setting.distance == "2" ){
        this.distanceForm.patchValue({
          rssi:'BC'
        })

      }
      else if(this.setting.distance  == "3" ){
        this.distanceForm.patchValue({
          rssi:'B6'
        })
      }
    }
    if(event.value==1){
      this.distanceForm.patchValue({
        wearable:"1"
      })
      if(this.setting.distance == "1"){
        this.distanceForm.patchValue({
          rssi:'AC'
        })
      }
      else if(this.setting.distance == "2" ){
        this.distanceForm.patchValue({
          rssi:'A9'
        })

      }
      else if(this.setting.distance  == "3" ){
        this.distanceForm.patchValue({
          rssi:'A5'
        })
      }
    }
  }

  changeDistance(event){
   // console.log(this.distanceForm.get('wearable').value,event)
    if(this.distanceForm.get('wearable').value==0 ){
      if(event.value == 1 ){
        this.distanceForm.patchValue({
          rssi:'BE'
        })
      }
      else if(event.value == 2){
        this.distanceForm.patchValue({
          rssi:'BC'
        })
      }
      else if(event.value == 3){
        this.distanceForm.patchValue({
          rssi:'B6'
        })
      }
    }
    else if( this.distanceForm.get('wearable').value==1 ){
      if(event.value == 1 ){
        this.distanceForm.patchValue({
          rssi:'AC'
        })
      }
      else if(event.value == 2){
        this.distanceForm.patchValue({
          rssi:'A9'
        })
      }
      else if(event.value == 3){
        this.distanceForm.patchValue({
          rssi:'A5'
        })
      }
    }
  }


  onSubmitScanningForm(data){
    // console.log("data==",data)
    if (this.scanningForm.valid) {
      try {
        data.userId=this.dataGet.userId
        this.api.updateScanningInterval(data).then((res:any)=>{
          // console.log("Scanning Interval===",res)
          if(res.status){
            this.refreshSetting()
            this.meetingcount()
            var msg='Interval second updated Successfully'
            this.general.openSnackBar(msg,'')
          }
        }).catch(err=>{
         // console.log("err===",err);
        })
      } catch (err) {
      }
    }
  }

  //scan count == meeting count

  onSubmitScanCountForm(data){
  //  console.log("data==",data)
    if (this.scanCountForm.valid){
      try {
        data.userId=this.dataGet.userId
        this.api.updateMeetingCount(data).then((res:any)=>{
         // console.log("Scanning Interval===",res)
          if(res.status){
            this.refreshSetting()
            this.scanCountForm.reset()
          var msg='Scan count updated Successfully'
            this.general.openSnackBar(msg,'')
          }
        }).catch(err=>{
         // console.log("err===",err);
        })
      } catch (err) {
      }
    }
  }
 meetingcount(){
    var data={
      userId:this.dataGet.userId,
      tblName:'deviceSetting'
    }
    this.api.getData(data).then((res:any)=>{
      if(res.status){
        this.scanCountForm.patchValue({
          count:res.success[0].scanCount.toString()
        })
      }
    })
  }

  onSubmitTimeForm(data){
    //  console.log(" time data===",data);

       data.seconds=data.minutes!=="none"?data.minutes*60:data.seconds



     var second=data.seconds <=9 && data.seconds >= 0 ?"0"+data.seconds:data.seconds
     var data1={
       userId:this.dataGet.userId,
       seconds:second
     }
     //console.log("data1==",data1)

     this.api.getDurationThreshold(data1).then((res:any)=>{
       console.log("duration==",res)
      if(res.status){

        this.refreshSetting()
        var msg = 'Minimum duration threshold updated Successfully'
        this.general.openSnackBar(msg,'')
      }
    })

   }
   onSubmitWorkForm(data) {
		var cdt1= moment(data.fromTime, 'HH:mm:ss')
		var cdt2= moment(data.toTime, 'HH:mm:ss')
		var times1=moment(cdt1).format("YYYY/MM/DD HH:mm:ss")
		var times2=moment(cdt2).format("YYYY/MM/DD HH:mm:ss")
		//console.log("times22==",times1>times2)

		if(times1>times2 || (data.fromTime == "00:00" &&  data.toTime == "00:00")){
			//.log("yes")
				times2=moment(cdt2).add(1,'days').format("YYYY/MM/DD HH:mm:ss")

		}
	//	console.log("false")
		var times=moment(times2,"YYYY/MM/DD HH:mm:ss").diff(moment(times1,"YYYY/MM/DD HH:mm:ss"))

		//console.log("times==",times1,times2,times)

		var d = moment.duration(times)
		//console.log("dd==",d)

		var minhour=(d.hours()+ ":" + d.minutes()).split(":")
   // console.log("minhour==",minhour[0],minhour[1])

		if((parseInt(minhour[0]) >= 9 && (parseInt(minhour[1]) >= 0 && parseInt(minhour[1]) <=59)) ){
      this.timeExceed=false
      var dateobj=new Date()

      var year = dateobj.getFullYear();
      var month = dateobj.getMonth() + 1
      var day = dateobj.getDate()
      var date = month + '/' + day + '/'  + year

      var time1=date+" "+data.fromTime
      var time2=date+" "+data.toTime

      time1=new Date(time1).toUTCString()
      time2=new Date(time2).toUTCString()
      var h=new Date(time1).getUTCHours()
      var m=new Date(time1).getUTCMinutes()
      var h1=new Date(time2).getUTCHours()
      var m1=new Date(time2).getUTCMinutes()
      var hh = h <= 9 && h >= 0 ? "0"+h : h;
      var mm = m <= 9 && m >= 0 ? "0"+m : m;
      var hh1 = h1 <= 9 && h1 >= 0 ? "0"+h1 : h1;
      var mm1 = m1 <= 9 && m1 >= 0 ? "0"+m1 : m1;

      data.fromTime = hh + ':' + mm
      data.toTime = hh1 + ':' + mm1
      // console.log("data====",data)


       if (this.workingForm.valid) {
         try {
          //  console.log("time data===",data)
           data.userId = this.dataGet.userId
           this.api.setTime(data).then((res:any)=>{
            //  console.log("time insrted or updated",res)
            if(res.status){
              this.timeExceed=false
              this.multipleShift=false
              var msg = 'Shift time update Successfully'
              this.general.openSnackBar(msg,'')
              this.workingForm.reset();
             }
             else{
              this.timeExceed=false
              this.multipleShift=true
             }
           })

         } catch (err) {
         }
       }
    }
    else if((parseInt(minhour[0]) == 9 && parseInt(minhour[1]) < 0 ) || parseInt(minhour[0]) < 9){
      this.timeExceed=true
      this.multipleShift=false
    }
   }

   onSubmitSendDataForm(data){
    if (this.scanningForm.valid){
      try {
        data.userId=this.dataGet.userId
        this.api.setGatewayDataRate(data).then((res:any)=>{
         // console.log("setGatewayDataRate ===",res)
          if(res.status){
            this.refreshSetting()
            var msg='Gateway data rate updated successfully'
            this.general.openSnackBar(msg,'')
          }
        }).catch(err=>{
         // console.log("err===",err);
        })
      } catch (err) {
      }
    }
   }


   onSubmitBufferForm(value){

    if (this.bufferForm.valid) {
      try {
        // console.log("buffer data==",value)
        var data={
        userId : this.dataGet.userId,
        buffer : value.buffer

        }


        this.api.getBufferDeviceSetting(data).then((res:any)=>{
          // console.log("Buffer response===",res)
          if(res.status){
            this.refreshSetting()
            var msg = 'Buffer updated Successfully'
            this.general.openSnackBar(msg,'')
          }
        }).catch(err=>{
          // console.log("err===",err);
        })

      } catch (err) {
      }
    }
   }
   bufferval(event){
    // console.log(event.target.value)
      this.bufferValue=event.target.value>5?true:false
   }

   onSubmitInactivityForm(value){

    if (this.inactivityForm.valid) {
      try {
       // console.log("inactivity data==",value)
        value.inactivity= value.type == '2'? 0 : value.inactivity
        var data={
          userId : this.dataGet.userId,
          inactivity : value.inactivity,
          type : value.type
        }

        this.api.getInactivityDeviceSetting(data).then((res:any)=>{
          // console.log("Inactivity response===",res)
          if(res.status){
            this.refreshSetting()
            var msg = 'Inactivity updated Successfully'
            this.general.openSnackBar(msg,'')
          }
        })
      } catch (err) {
      }
    }


   }
   inactivityChange(event){
    // console.log("event===",event)
     if(event.checked == true){
      this.inactivityStatusValue = {
        value:true,
        status:'Disable'
      }
      this.inactivityForm.patchValue({
        type:1
      })
    }
    else if(event.checked == false){
      this.inactivityStatusValue = {
        value:false,
        status:'Enable'
      }
      this.inactivityForm.patchValue({
        type:2
      })
    }
  //   var data={
  //     userId : this.dataGet.userId,
  //     status : checked
  //   }
  //  //  console.log("data====",data)
  //   this.api.updateInactivityStatus(data).then((res:any)=>{
  //     if(res.status){
  //       this.refreshSetting()
  //       var msg = 'Inactivity updated Successfully'
  //       this.general.openSnackBar(msg,'')
  //     }
  //   }).catch(err=>{
  //    //  console.log("err===",err);
  //   })

  }

  onMultiShiftselect(values){
    if(this.multishiftingselect.valid){
    try{
      var data={
        userId : this.dataGet.userId,
        shiftId : values.shiftName.id,
        shiftName : values.shiftName.shiftName,
        deviceId : values.deviceId,
        status: values.status,
        type :values.type,
        }
        //console.log(data)
          this.api.setDeviceMultiShift(data).then((res:any)=>{
           // console.log("multishift data sent===",res)
            if(res.status){
              this.multishiftingselect.reset()
              this.refreshShift()
              var msg='Multishift Select updated Successfully'
              this.general.openSnackBar(msg,'')
            }
          }).catch(err=>{
            //console.log("err===",err);
          })
    }catch (err) {

    }
    }



}

username:any=[]

  userSuggestion(event){
    //console.log("data=",event)
    var data={
      value:event.target.value,
      userId:this.dataGet.userId,
      subUserId: (this.dataGet.hasOwnProperty('id') && this.dataGet.type==4 && this.dataGet.id!=0) ? this.dataGet.id : 0,
      tblName:'deviceData'
    }
   // console.log("data==",data)
    this.api.getAssignedDevices(data).then((res:any)=>{
    // console.log("getAssignedDevices res==******",res)
      if(res.status){
        this.username=[]
       for(let i=0;i<res.success.length;i++){
        this.username.push(res.success[i])
       }
      }
    })

  }

selectfinds(event){
  this.selectfind=event.value='1' || '2'?false:true;
 // console.log(this.selectfind)

}




   getMin(event){
    // console.log("event==",event)
    if(event.value=="none"){
      this.minStatus=true
      this.secStatus=false
      this.requiredStatus1=false
      this.requiredStatus2=true
      this.timeFormStatus=true


    }
    else{
      this.minStatus=false
      this.secStatus=true
      this.requiredStatus1=true
      this.requiredStatus2=false
      this.timeFormStatus=false


    }

  }

  getSec(event){
    if(event.value=="none"){
      this.minStatus=false
      this.secStatus=true
      this.requiredStatus1=true
      this.requiredStatus2=false
      this.timeFormStatus=true

    }
    else{
      this.minStatus=true
      this.secStatus=false
      this.requiredStatus1=false
      this.requiredStatus2=true
      this.timeFormStatus=false
    }
  }
  openDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '60vh';
    dialogConfig.width = '70vw';
    dialogConfig.data = {
      type:"shifts"
    }
    const dialogRef = this.dialog.open(EditSettingShiftComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openDialog1(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '60vh';
    dialogConfig.width = '70vw';
    dialogConfig.data = {
      type:"multishifts"
    }
    const dialogRef = this.dialog.open(EditSettingShiftComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  scannIntravaleLimit(valees){
    if(valees==1){
      this.custom=false
      this.standered=true
    }else{
      this.custom=true
      this.standered=false
    }
  }

}
