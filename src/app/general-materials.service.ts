import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from  '@angular/common/http';  
import { environment } from '../environments/environment'
import{Observable, BehaviorSubject} from 'rxjs'
import { map } from  'rxjs/operators';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class GeneralMaterialsService {
  _timezone: any = null;
  _timeZoneAbbr: any
  SERVER_URL: string =  environment.apiHost; 
  date1:any
  date2:any
  time:any

  public loadingFreez : BehaviorSubject<any> = new BehaviorSubject<any>([])
  constructor(private _snackBar: MatSnackBar,private http: HttpClient) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


exportToExcel(table:any,excelFileName: string,header: string){


  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(table);


  const wb: XLSX.WorkBook = XLSX.utils.book_new();


  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


  XLSX.writeFile(wb, excelFileName);

}

exportAsExcelFile(json: any[], excelFileName: string,header: string){
  const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(json);
      // console.log("ws===",ws)

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      // console.log("wb===",wb)

      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // XLSX.read(header)

      XLSX.writeFile(wb, excelFileName);

}

setObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
    console.log("get==",this.getObject('sensegizlogin'))
}

getObject(key) {
    return JSON.parse(localStorage.getItem(key));
}

updateItem(key, property, value)
{
    var obj = this.getObject(key);
    obj[property] = value;
    console.log("obj===",obj)

    this.setObject(key, obj);
}

updatedOnDate(date){
  
  var months=['Jan','Feb', 'Mar','Apr','May','Jun','Jul','Aug','sep','Oct','Nov','Dec']

  var dateObj=new Date(date)
  var year = dateObj.getFullYear();
  var month = months[dateObj.getMonth()];
  var day = ("0" + dateObj.getDate()).slice(-2);
  var from = month  + ',' + day + ','  +year 

  var h=dateObj.getHours()
  var m=dateObj.getMinutes()
  var s=dateObj.getSeconds()
  var hh = h <= 9 && h >= 0 ? "0"+h : h;
  var mm = m <= 9 && m >= 0 ? "0"+m : m;
  var ss=  s <= 9 && s >= 0 ? "0"+s : s;
  var datetime=from +', '+hh+':'+mm+':'+ss
  return datetime


}
startTime(data1,data2){
  console.log(data1,data2)
  var date=new Date(data2)
  if(data1!="00:00:00" || data1!='-'){
    var a=data1.split(':')
    date.setHours(date.getHours() -a[0]);
    date.setMinutes(date.getMinutes() - a[1]); 
    date.setSeconds(date.getSeconds() - a[2]); 
    // console.log("new date==",date)
  }
  if(data1=="00:00:00" || data1=='-'){
    date.setSeconds(date.getSeconds() - 5); 
  }
 

  return date
}
convertTime(a){
  // console.log(a)

  var timeArr = a.split(':')
  
  var date = ''
  if(timeArr[0]!='00'){
    date += timeArr[0] + ' hour '
  }
  if(timeArr[1]!='00'){
    date += timeArr[1] + ' minute '
  }
  if(timeArr[2]!='00'){
    date += timeArr[2] + ' second '
  }
  if(date == '' ||   date == '-'){
    date = '05 second'
  }
  return date
}

totalTime(inTime,outTime){
  console.log("time===",inTime,outTime)
  this.date1  = new Date(inTime)
  this.date2=new Date(outTime)
  var date=new Date()

  if(this.date1 !="Invalid Date"){

    if(this.date2!="Invalid Date"){
      var diff = Math.abs(this.date2 - this.date1)
    }

    else{
      this.date2=date
      diff= Math.abs(this.date2 - this.date1)
    }


    let ms = diff % 1000;
    diff = (diff - ms) / 1000;
    let s = diff % 60;
    diff = (diff - s) / 60;
    let m = diff % 60;
    diff = (diff - m) / 60;
    let h = diff

    let ss = s <= 9 && s >= 0 ? "0"+s : s;
    let mm = m <= 9 && m >= 0 ? "0"+m : m;
    let hh = h <= 9 && h >= 0 ? "0"+h : h;

   this.time = hh +':' + mm + ':' +ss
   console.log("time======",this.time)
   return this.convertTime(this.time)
  }
}
getZone(date){
  var timezone=date.getTimezoneOffset()
  console.log("time zone==",timezone)

  let m = timezone % 60;
  console.log("m==",m)
  timezone = (timezone - m) / 60;
  let h = timezone
  console.log("h==",m)

  let mm = m <= 9 && m >= 0 ? "0"+m : m;
  let hh = h <= 9 && h >= 0 ? "0"+h : h;

  var timezones=-(timezone)
  console.log("time zone==",timezone)

  if(timezones<0 ){
    var timeZone= '-'+((hh)+':'+(mm)).toString()
  }
  else{
    timeZone= '+'+ ((-hh)+':'+ (-mm)).toString()
  }

  return timeZone
}
}
