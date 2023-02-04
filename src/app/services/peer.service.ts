import { EventEmitter, Injectable } from '@angular/core';
import Peer from 'peerjs';
@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peer: Peer;
  peerId: string = '';
  conn: any;
  messages: any;
  onPeerAdded = new EventEmitter<any>();
  onPeerData = new EventEmitter<any>();
  constructor() {
    this.peer = new Peer();
    this.peer.on('open', (id) => {
      this.peerId = id;
    });
    this.peer.on("connection", (conn) => {
      this.conn = conn;
      this.onPeerAdded.emit(this.conn);
      this.conn.on("data", (msg: string) => {
          this.onPeerData.emit(msg);
      });
    });
  }
  connect(id: any) {
    this.conn = this.peer.connect(id, {
      reliable: true
    });
    if (this.conn) {
      this.conn.on("data", (msg: any) => {
          this.onPeerData.emit(msg);
      });
      return true;
    }
    else {
      return false;
    }

  }
  sendMessage(msg:string){
    this.conn.send(msg)
  }

}
