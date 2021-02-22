import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { identifierModuleUrl } from '@angular/compiler';
import { GeneralMaterialsService } from './general-materials.service';
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ENCRYPT_KEY:string=environment.ENCRYPTKEY
  host:string = environment.apiHost
  encryption:string;
  decryption:string;
  encry:any;
  decryptedData:any;
id:string;
  constructor(private http:HttpClient, private general:GeneralMaterialsService) { }
    dataa:any
  send(data){
    console.log(data)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
     this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
      this.encry={
        data:this.encryption
      }

    let url = this.host+'/login';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        console.log("res",res)
         this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
         var decry=JSON.parse(this.decryption)
        //console.log("decryption",decry)
        resolve(decry);
      })
    })
  }


  deviceRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/deviceRegistration';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  deallocateDevice(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }

    let url = this.host+'/deallocateDevice';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }



  coinRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }

    let url = this.host+'/coinRegistration';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  editDeviceRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/updateDeviceDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }

  editCoinRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/setCoinList';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  EditUserRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/updateUserDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  UserRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/userDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  deletedeviceandUser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/deleteDeviceDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }





  getData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
      this.encry={
        data:this.encryption
      }
    let url = this.host+'/getData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });


  }




  getDeviceData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/getDeviceData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  getDeviceDataCount(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/getDeviceDataCount';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }

  setTime(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/deviceShift';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }



  addDistance(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/deviceSetting';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }

  setDeviceRssi(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/setDeviceRssi';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }
 deleteGeofence(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/deleteDeviceGeofence';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }



  editInfectedPerson(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/updateInfected';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  getCountData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/getPortalHome';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }




  addMaxContactThreshold(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/deviceSettingThreshold';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  getAssignedDevices(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/appAdminAssignView';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }



  getLiveData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
 this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
      this.encry={
        data:this.encryption
      }
    let url = this.host+'/getData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
     //  console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  getExceptionData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/exceptionDashBoard';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }

  getExceptionDataRowCount(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/exceptionDashBoardRowCount';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }

  getLocationData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/locationDashboard';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }

  getDeviceHistoryBasedOnDate(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/deviceHistory';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }
  getDeviceHistoryBasedOnDeviceId(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/historyBasedOnDeviceId';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }
  getDeviceHistoryBasedOnDeviceName(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/historyBasedOnDeviceName';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }

// max Time Contact

  getMaxTimeContact(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/maxTimeContact';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  getMaxContactDevice(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/maxContactDevice';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
     //  console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


  getPerDayCount(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/perDayCount';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }




  getHomeCountData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/getDataType';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }

getDeallocatedDevice(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/getDeallocatedDevice';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
    })
  });
}


  setGatewayDataRate(data)
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/setGatewayDataRate';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
      })
    });
  }


   editShift(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/updateDeviceShift';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
      })
    });
  }

updateScanningInterval(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setScanningInterval';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
    // console.log("decryption",decry)
     resolve(decry);
    })
  });
}


updateMeetingCount(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setMeetingCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
    })
  });
}


getGeofenceReport(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/geofenceReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
   ///  console.log("decryption",decry)
     resolve(decry);
    })
  });

}

getCustomReport(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/getOnlineOfflineReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
    // console.log("decryption",decry)
     resolve(decry);
    })
  });

}

showWarning(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/deviceWarning';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     //console.log("decryption",decry)
     resolve(decry);
     })
   });
 }


 editSettingShift(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/updateSettingsShift';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
      // console.log("decryption",decry)
       resolve(decry);
     })
   });
 }




  adminLogin(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/adminLogin';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
    // console.log("decryption",decry)
     resolve(decry);
     })
   });
 }


 getAdminData(){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   var data = ""
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/getUser';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
     //  console.log("decryption",decry)
       resolve(decry);
     })
   });
 }


 createUser(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/createUser';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
    //   console.log("decryption",decry)
       resolve(decry);
     })
   });
 }


 deleteAdminUser(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/deleteUser';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
     })
   });
 }


 updateBleMac(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/updateMacId';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
     })
   });
 }

getTotalRowCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/getRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
    })
  });

}
getLocationDashBoardRowCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/locationDashboardRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
    // console.log("decryption",decry)
     resolve(decry);
    })
  });

}
getGeofenceReportRowCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/geofenceReportRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
        var decry=JSON.parse(this.decryption)
       //console.log("decryption",decry)
       resolve(decry);
    })
  });

}
getLocationHistoryRowCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/locationHistoryRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}

 addTxPower(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/setTxPower';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
     })
   });
 }


 deleteShift(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/deleteDeviceShift';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
     })
   });
 }



 getLiveDataTotalCount(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
   this.encry={
     data:this.encryption
   }
   let url = this.host+'/getRowCount';
   return new Promise((resolve,reject)=>{
     this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
     })
   });
 }

 getHistoryDateReportTotalCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/deviceHistoryRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

getHistoryNameReportTotalCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/historyBasedOnDeviceNameRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

getDepartmentReportTotalCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/departmentCTReportCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}
getSummaryReport(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/infectedDeviceName';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}
// updateBuzzerControl(data){
//   const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//   let url = this.host+'/setBuzzerControl';
//   return new Promise((resolve,reject)=>{
//     this.http.post(url,data,httpOptions).subscribe(res=>{
//       resolve(res);
//     })
//   });
// }
updateBuzzerConfig(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setBuzzerConfiguration';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

// getInactivityDeviceSetting(data){
//   const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//   let url = this.host+'/inactivityDeviceSetting';
//   return new Promise((resolve,reject)=>{
//     this.http.post(url,data,httpOptions).subscribe(res=>{
//       resolve(res);
//     })
//   });
// }

getInactivityDeviceSetting(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/updateInactivity';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
      })
    });
  }
getBufferDeviceSetting(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }

  let url = this.host+'/bufferDeviceSetting';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

updateWearableType(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setWearableType';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

// updateInactivityStatus(data){
//   const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//   let url = this.host+'/inactivityStatus';
//   return new Promise((resolve,reject)=>{
//     this.http.post(url,data,httpOptions).subscribe(res=>{
//       resolve(res);
//     })
//   });
// }


setGeofenceData(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setDeviceGeofence';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}
getGeofenceData(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/getDeviceGeofence';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}
maxLimit(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setOverCrowdingLimit';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}


setMaxLimit(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setGroupmaxlimit';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}
getGroupData(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/getGroupmaxlimit';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

getLocationHistory(data){

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/locationHistory';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
      })
    });
}


getDurationThreshold(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/durationThreshold';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}

getUsernameSuggestion(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/fetchUserNames';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}

uploadLogo(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/upload-image';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}

uploadDeviceFile(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/upload-file';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

getMaxDistance(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setmaxDistance';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}
twoStepAuth(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setTwostepAuth';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

sendOtp(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/sendOTP';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

confirmOtp(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/confirmOTP';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}

updatePassword(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/updatePassword';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}

createSubUser(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/createSubUser';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

getSubUser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
    this.encry={
      data:this.encryption
    }
    let url = this.host+'/getSubUser';
    return new Promise((resolve,reject)=>{
      this.http.post(url,this.encry,httpOptions).subscribe(res=>{
        this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
      })
    });

}

deleteSubUser(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/deleteSubUser';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}
deleteGroupName(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/deletegroupName';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}
updateGroupName(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/updategroupName';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}
getOnlineCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/getOnlinedevice';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}

deleteOvercrowding(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/deleteOverCrowding';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}
infectedContactalert(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/infectedContactAlert';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}
downloadFile(response,fileName){
  let body = response.body
  let dataType = body.type;
  let binaryData = [];
  binaryData.push(body);
  this.general.loadingFreez.next({status:false})
  let downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
  downloadLink.setAttribute('download', fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
}
/* --------------------------------- */

downloadActiveOfflineUsers(data,fileName){
  this.general.loadingFreez.next({status:true})
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/downloadActiveOfflineUsers';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
     var decry=JSON.parse(this.decryption)
    // resolve(decry);

      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}
downloadDeallocatedDevice(data,fileName){
  this.general.loadingFreez.next({status:true})
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/downloadDeallocatedDevice';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
      console.log("postmethod",res)
      if(res.status==200)
      this.downloadFile(res,fileName)
      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}

downloadReport(data,fileName){
  this.general.loadingFreez.next({status:true})
 this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
      this.encry={
        data:this.encryption
      }
  let url = this.host+'/download';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}
downloadLtReport(data,fileName){

  this.general.loadingFreez.next({status:true})
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }

  let url = this.host+'/download-lt';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
      // console.log("nam--",res)
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}
downloadCummulative(data,fileName){

  this.general.loadingFreez.next({status:true})
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }

  let url = this.host+'/downloadCTReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
       console.log("nam--",res)
      if(res.status==200)
      this.downloadFile(res,fileName)
      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}


downloadDeptCummulative(data,fileName){

  this.general.loadingFreez.next({status:true})
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  console.log("eencryption", this.encry)

  let url = this.host+'/departmentDownloadCTReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
      // console.log("nam--",res)
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}


downloadCustomReport(data,fileName){
  this.general.loadingFreez.next({status:true})
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/downloadOnlineOfflineReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
      console.log("nam--",res)
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}
viewCTReport(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/viewCTReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });

}
editIsolation(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }

  let url = this.host+'/makePersonIsolated';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}
/* --------------------------------------------------------------------------- */
getCountryZone(){
  return new Promise((resolve,reject)=>{
    this.http.get('../../assets/zone.json').subscribe((res:any)=>{
      console.log("responceZone====******",res)
      resolve(res.zone)
    },
    err=>{
      reject(err)
    })
  })
}
/* ----------------------------------------------------------------------------------------- */
getAllDepartment(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/getAllDepartment';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

setDeviceDepartment(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setDeviceDepartment';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}
getDepartmentreport(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/departmentCTReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}



setDeviceMultiShift(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.encryption=CryptoJS.AES.encrypt(JSON.stringify(data),this.ENCRYPT_KEY).toString()
  this.encry={
    data:this.encryption
  }
  let url = this.host+'/setDeviceMultiShift';
  return new Promise((resolve,reject)=>{
    this.http.post(url,this.encry,httpOptions).subscribe(res=>{
      this.decryption=CryptoJS.AES.decrypt(res['result'],this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
      var decry=JSON.parse(this.decryption)
     resolve(decry);
    })
  });
}

}
