import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, BehaviorSubject,Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class GeneralMaterialsService {
  _timezone: any = null;
  _timeZoneAbbr: any;
  SERVER_URL: string = environment.apiHost;
  date1: any;
  date2: any;
  time: any;
  cof:any;

  ENCRYPT_KEY: string = environment.ENCRYPTKEY;
  public loadingFreez: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public deviceHistory = new Subject<any>()
  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  exportToExcel(table: any, excelFileName: string, header: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, excelFileName);
  }

  exportAsExcelFile(json: any[], excelFileName: string, header: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // console.log("ws===",ws)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // console.log("wb===",wb)

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.read(header)

    XLSX.writeFile(wb, excelFileName);
  }

  setObject(key, obj) {
    //console.log(obj)
    localStorage.setItem(key, this.encrypt(obj));
   //console.log('get==', this.getObject('sensegizlogin'));
  }

  getObject(key) {
   // var d =localStorage.getItem('sensegizlogin');
    //console.log(d)
    return this.decrypt(localStorage.getItem(key));
  }

  updateItem(key, property, value) {
    var obj = this.getObject(key);
    obj[property] = value;
    console.log('obj===', obj);
    this.setObject(key, obj);
  }

  updatedOnDate(date) {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var dateObj = new Date(date);
    var year = dateObj.getFullYear();
    var month = months[dateObj.getMonth()];
    var day = ('0' + dateObj.getDate()).slice(-2);
    var from = month + ',' + day + ',' + year;

    var h = dateObj.getHours();
    var m = dateObj.getMinutes();
    var s = dateObj.getSeconds();
    var hh = h <= 9 && h >= 0 ? '0' + h : h;
    var mm = m <= 9 && m >= 0 ? '0' + m : m;
    var ss = s <= 9 && s >= 0 ? '0' + s : s;
    var datetime = from + ', ' + hh + ':' + mm + ':' + ss;
    return datetime;
  }
  startTime(data1, data2) {
    var date = new Date(data2);
    if (data1 != '00:00:00' || data1 != '-') {
      var a = data1.split(':');
      date.setHours(date.getHours() - a[0]);
      date.setMinutes(date.getMinutes() - a[1]);
      date.setSeconds(date.getSeconds() - a[2]);
      // console.log("new date==",date)
    }
    if (data1 == '00:00:00' || data1 == '-') {
      date.setSeconds(date.getSeconds() - 5);
    }

    return date;
  }
  convertTime(a) {
    // console.log(a)

    var timeArr = a.split(':');

    var date = '';
    if (timeArr[0] != '00') {
      date += timeArr[0] + ' hour ';
    }
    if (timeArr[1] != '00') {
      date += timeArr[1] + ' minute ';
    }
    if (timeArr[2] != '00') {
      date += timeArr[2] + ' second ';
    }
    if (date == '' || date == '-') {
      date = '05 second';
    }
    return date;
  }
  totalTime(inTime, outTime) {
   // console.log('time===', inTime, outTime);
    this.date1 = new Date(inTime);
    this.date2 =
      outTime == null ? new Date('0000-00-00 00:00:00') : new Date(outTime);

    //console.log('time2===', this.date1, this.date2);

    if (this.date1 != 'Invalid Date') {
      if (this.date2 != 'Invalid Date') {
        var diff = Math.abs(this.date2 - this.date1);
      } else {
        return '-';
      }

      let ms = diff % 1000;
      diff = (diff - ms) / 1000;
      let s = diff % 60;
      diff = (diff - s) / 60;
      let m = diff % 60;
      diff = (diff - m) / 60;
      let h = diff;

      let ss = s <= 9 && s >= 0 ? '0' + s : s;
      let mm = m <= 9 && m >= 0 ? '0' + m : m;
      let hh = h <= 9 && h >= 0 ? '0' + h : h;

      this.time = hh + ':' + mm + ':' + ss;
      //  console.log("time======",this.time)
      return this.convertTime(this.time);
    }
  }

  pingAlertStatus(inTime) {
    var pigTime = moment(inTime);
    var date = moment(new Date());
    var pigsplt = moment(date).diff(moment(pigTime));
    var pigArt = moment.duration(pigsplt);
    var momemts = Math.floor(pigArt.asMinutes());
   // console.log('pingAlertStatus in mints', momemts);
    return momemts;
  }

  getZone(date) {
   // console.log('time zone==', date);
    var timezone = date.getTimezoneOffset();
  //console.log('time zone==', timezone);

    let m = timezone % 60;
    // console.log("m==",m)
    timezone = (timezone - m) / 60;
    let h = timezone;
    // console.log("h==",m)

    let mm = m <= 9 && m >= 5 ? '0' + m : m;
    let hh = h <= 9 && h >= 5 ? '0' + h : h;

    var timezones = -timezone;
   //console.log("time zone==",timezones)

    if (timezones < 0) {
      var timeZone = '-' + (hh + ':' + mm).toString();

    } else {
      timeZone = '+' + (-hh + ':' + -mm).toString();

    }

    return timeZone;
  }
/* ------------------------------------------------------------------------ */

  temperatureconver(val,formate){
   // console.log(val,formate)
    if(formate == "C"){
      if(val == 'NA'){
        return val
      }else{
        return val+'°C'
      }
    }else{
      if(val=="NA"){
        return val
      }else{
        let temp = (Number(val) * 9/5) + 32;
        this.cof = Math.floor(temp * 100) / 100;
        return temp+"°F"
      }

    }

     }

/* ------------------------------------------------------- ------------------------*/
  decrypt(data) {
    if(data){
      var deData = CryptoJS.AES.decrypt(data, this.ENCRYPT_KEY);
      return JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    }
    else{
      return null;
    }
  }
  encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.ENCRYPT_KEY).toString();
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }


}
