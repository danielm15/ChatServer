import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatService {

  socket: any;

  constructor() {
    this.socket = io("http://localhost:8080");
    this.socket.on("connect", function() {
    });
  }

  login(userName: string): Observable<boolean> {
    let observable = new Observable(observer => {
      this.socket.emit("adduser", userName, succeeded => {
        observer.next(succeeded);
      });
    });
    return observable;
  }

  getRoomList(): Observable<string[]> {
    let obs = new Observable(observer => {
      this.socket.emit("rooms");
      this.socket.on("roomlist", (lst) => {
        let strArr: string[] = [];
        for (var x in lst) {
          strArr.push(x);
        }
        observer.next(strArr);
      });
    });
    return obs;
  }

  joinRoom(roomInfo: any): Observable<boolean> {
    let observable = new Observable(observer => {
      this.socket.emit("joinroom", roomInfo, (succeeded,reason) => {
        observer.next(succeeded);
      });
    });
    return observable;
  }

  leaveRoom(roomName: string){
    let obervable = new Observable(observer => {
      this.socket.emit("partroom", roomName);
    });
    return obervable;
  }

  getAllConnectedUsers(){
    let obervable = new Observable(observer => {
      this.socket.emit("users");

      this.socket.on("userlist", (lst) => {
        let strArr: string[] = [];
        for (var x in lst) {
          strArr.push(x);
        }
        observer.next(strArr);
      });

    });
    return obervable;
  }

}
