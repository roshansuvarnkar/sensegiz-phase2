import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css']
})
export class ExceptionComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loginData:any
  exception:any=[]
  dataSource:any=[]
  displayedColumns: string[] = ['i','userName', 'coinName', 'updatedOn','alertType'];
  constructor(
    private api: ApiService,
    private login:LoginCheckService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.refreshException()
  }
  

  refreshException(){
  
      var data={
        userId:this.loginData.userId,
        
      }
    
      this.api.getExceptionData(data).then((res:any)=>{
        console.log("Exception ======",res);
        if(res.status){
          this.exception=[]
          for(let i=0;i<res.success.length;i++){
            this.exception.push({
              i:i+1,
              userName:res.success[i].userName,
              coinName:res.success[i].coinName,
              updatedOn:res.success[i].updatedOn,
              alertType:res.success[i].alertType == 1? 'Over crowded' :'-'
            })
          }
          this.dataSource = new MatTableDataSource(this.exception);
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            // this.paginator.length = this.currentPageSize
          })
    
        }
      })
    }

  }

