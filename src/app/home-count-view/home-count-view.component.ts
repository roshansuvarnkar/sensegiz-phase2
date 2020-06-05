import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-home-count-view',
  templateUrl: './home-count-view.component.html',
  styleUrls: ['./home-count-view.component.css']
})
export class HomeCountViewComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

findData:any=[]
loginData:any
type:any
data:any
load:any
deviceName:any
dataSource:any
displayedColumns: string[] = ['i', 'deviceId', 'deviceName'];
  constructor(private api: ApiService,
    private login:LoginCheckService,
    public dialogRef: MatDialogRef<HomeCountViewComponent>,
       @Inject(MAT_DIALOG_DATA)  data,) {
        this.type=data.type
        console.log("type==",this.type)
        this.data=data.data
        }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    // this.checkUrl = this.router.url
    this.dataSource = new MatTableDataSource(this.data);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;


        })
  }

}
