// import { Component, OnInit,ViewChild } from '@angular/core';
// import { ApiService } from '../api.service';
// import { LoginCheckService } from '../login-check.service';
// import {Router} from '@angular/router';
// import {MatSort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';
// import { Timestamp } from 'rxjs';
//
//
//

// export class LiveDataComponent implements OnInit {
// @ViewChild(MatSort, {static: true}) sort: MatSort;
// liveData:any=[]
// dataSource:any
// loginData:any
// displayedColumns: string[] = ['Sl_No','Contact_1', 'Contact_2', 'Time'];
//
//   constructor(
//     private api: ApiService,
//     private login:LoginCheckService,
//     private router:Router
//   ) {
//    }
// // ngAfterViewInit(){
// //    this.refreshData()
// // }
//
//   ngOnInit(): void {
//     this.loginData = this.login.Getlogin()
//     this.loginData = JSON.parse(this.loginData)
//
//     this.refreshData()
//
//
//
//
//
//   }
//
//
//   refreshData(){
//     var data={
//       userId:this.loginData.userId,
//       tblName:'deviceData'
//     }
//
//     this.api.getLiveData(data).then((res:any)=>{
//       console.log("live data ======",res);
//       if(res.status){
//         this.liveData=res.success
//         this.dataSource = new MatTableDataSource(this.liveData);
//         console.log("dataSource==",this.dataSource)
//         this.dataSource.sort=this.sort
//       }
//     })
//   }
//
// }

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.css']
})

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export class TableSortingExample implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
