import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatTableDataSource} from '@angular/material/table';
import { Timestamp } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
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
  checkUrl:any
  dataSource:any
  displayedColumns: string[] = ['icon','deviceName'];

  constructor(private api: ApiService,private login:LoginCheckService,private router:Router) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.refreshFinds()
    //this.checkPage()
  
  
  }

 
  refreshFinds(){
    var data={
      userId:this.loginData.userId,
    }

    this.api.getAssignedDevices(data).then((res:any)=>{
      console.log("find data side bar ======",res);
      if(res.status){
      for(let i=0;i<res.success.length;i+1){
        this.findData.push({
          icon:'label_important',
          deviceName:res.success[i].deviceName
        })
      }
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

  

  
}
