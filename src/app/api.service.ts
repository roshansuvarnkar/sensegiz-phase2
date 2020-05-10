import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host:string = environment.apiHost

  constructor(private http:HttpClient) { }

  send(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/login';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }


  deviceRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deviceRegistration';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




  editDeviceRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateDeviceDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




  EditUserRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateUserDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }


  UserRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/userDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }





  deletedeviceandUser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deleteDeviceDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }





  getData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




  getDeviceData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getDeviceData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




  setTime(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deviceSetting';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }



  addDistance(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deviceDistance';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }



  editInfectedPerson(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateInfected';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }

  
  getCountData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getPortalHome';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }





}
