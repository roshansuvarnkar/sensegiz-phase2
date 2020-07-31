import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { environment } from '../environments/environment'
import{Observable} from 'rxjs'
import { map } from  'rxjs/operators';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class GeneralMaterialsService {
  _timezone: any = null;
  _timeZoneAbbr: any
  // SERVER_URL: string =  environment.apiHost; 
 
  SERVER_URL:"C:/Users/Namratha N M/Documents"

  constructor(private _snackBar: MatSnackBar,private httpClient: HttpClient) {}

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
        XLSX.read(header)

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

 

public upload(formData) {

  return this.httpClient.post<any>(this.SERVER_URL, formData, {  
     reportProgress: true,  
     observe: 'events'  
  });  
}
postFile(fileToUpload: File){
  const endpoint = this.SERVER_URL;
  const formData: FormData = new FormData();
  formData.append('fileKey', fileToUpload, fileToUpload.name);
  return this.httpClient
    .post(endpoint, formData, { headers:{'Content-Type': fileToUpload.type }})

}
}
