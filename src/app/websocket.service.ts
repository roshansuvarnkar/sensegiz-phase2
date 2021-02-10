import { Injectable } from '@angular/core';
import {io} from 'socket.io-client'
import {Observable, Subject, Subscriber} from 'rxjs';
import { environment } from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  host:string = environment.websocket
  socket;

  constructor() {
this.socket=io(this.host)
   // this.socket=new WebSocket(this.host)
 console.log("socket=====",this.socket)
 /*    this.socket.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  }) */


  }


isDeletedws(eventName,data){
  console.log(data)
return new Promise((resolve,reject)=>{
  this.socket= io(this.host)
 /*  if(data.isDeleted=="Y"){
    this.socket.on('disconnect',(Socket) =>{
      console.log(data)
      Socket.emit(data).subscribe((data)=>{
        this.socket.disconnected()
        resolve(data)
      })
    })
  }else{
    this.socket.on('connect',(Socket) =>{
      console.log(data)
      Socket.emit(data).subscribe((data)=>{
        this.socket.connected()
        resolve(data)
      })
    })
  } */
  console.log(this.socket)

})

}
/* --------



connect(): Rx.Subject<MessageEvent> {

  this.socket = io(this.host);
  let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("Received message from Websocket Server")
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
  });
  let observer = {
      next: (data: Object) => {
          this.socket.emit('message', JSON.stringify(data));
      },
  };
  return Rx.Subject.create(observer, observable);
}
 */
}
