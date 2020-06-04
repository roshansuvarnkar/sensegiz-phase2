import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loginData:any
  findData:any=[]
  findDataTemp:any=[]
  checkUrl:any
  dataSource:any
  displayedColumns: string[] = ['i','deviceName'];
  deviceClickStatus:boolean
  totmin:any
  color:any
  time:any
  systime:any
  constructor(private api: ApiService,private login:LoginCheckService,private router:Router) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.refreshFinds()
    //this.checkPage()
    this.changeColor()
    setInterval(()=>{this.refreshFinds()},60*1000)

  }

  
  refreshFinds(){
    var data={
      userId:this.loginData.userId,
    }

    this.api.getAssignedDevices(data).then((res:any)=>{
      console.log("find data side bar ======",res);
      if(res.status){
        for(let i=0;i<res.success.length;i++){

          //systime in minutes
          var date = new Date();
          var hh = date.getHours();
          var mm = date.getMinutes();
          var ss = date.getSeconds()
        
      
          var tottime= hh + ':' + mm + ':' + ss;
          var a=tottime.split(':')
          this.systime = Math.round((+a[0]*60) + (+a[1] ) + ((+a[2])/60) )
        
          console.log("min",this.systime)


          var dateObj=new Date(res.success[i].updatedOn)
          var h=dateObj.getUTCHours()
          var m=dateObj.getUTCMinutes()
          var s=dateObj.getUTCSeconds()
          var hour = h < 10 ? '0'+h : h; 
          var min = m < 10 ? '0'+m : m;
          var sec = s<10? '0'+s :s;
          this.time= hour + ":" + min + ":" + sec
          var b=this.time.split(':')
          this.totmin  = Math.round((+b[0]*60) + (+b[1] ) + ((+b[2])/60) )
          
          if(isNaN(h || h || s)){
            this.time='00:00:00'
          }else{
            this.time= hour + ":" + min + ":" + sec
            if(this.totmin<this.systime || isNaN(h || m || s) ){
            this.color="green"

            }
             else if(this.totmin>=this.systime && this.totmin<= 3*this.systime){
              this.color="yellow"
              console.log(this.color)
            }
            else{
              this.color="red"
              console.log(this.color)
            }
          }
         
         
          console.log("tot time==",this.totmin)
          console.log("time==",this.time)
          this.findData.push({
            i:i,
            deviceName:res.success[i].deviceName,
            time:this.time,
            
          })

        }
        // this.findData=res.success 
        this.findDataTemp=res.success
        // this.dataSource = new MatTableDataSource(res.success);
        this.dataSource = new MatTableDataSource(this.findData)
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;

        })
      }

      this.dataSource = new MatTableDataSource(this.findData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;

      });
      
    })
  }

checkPage(){

    console.log(window.location.pathname)  // array of states
  this.checkUrl=window.location.pathname

}

  clickDevice(data){

    console.log("data====",data)
    this.router.navigate(['/device-history'], { queryParams: { record: JSON.stringify(data) } });
  }


  search(a){
  if(a.length>0){
    this.findData = this.findDataTemp.filter(obj=>{
      return ((obj.deviceName.toString().toLowerCase().indexOf(a)>-1) || (obj.deviceId.toString().toLowerCase().indexOf(a)>-1))
    })
    this.dataSource = new MatTableDataSource(this.findData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    })
  }
  else{

    this.dataSource = new MatTableDataSource(this.findDataTemp);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;

    })
  }
}

changeColor(){
  var data={
    userId:this.loginData.userId,
  }
  this.api.getAssignedDevices(data).then((res:any)=>{
    console.log("max contact time ======",res);
    if(res.status){
      
    }
    for(let i=0;i<res.success.length;i++){
      var dateObj=new Date(res.success[i].updatedOn)
      var hour=dateObj.getUTCHours()
      var min=dateObj.getUTCMinutes()
      var sec=dateObj.getUTCSeconds()
      this.time= hour + ":"+min+":"+sec
      console.log("time==",this.time)

    }
  }) 
}


}
