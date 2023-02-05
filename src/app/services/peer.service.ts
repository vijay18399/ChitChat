import { EventEmitter, Injectable } from '@angular/core';
import Peer from 'peerjs';
@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peer: Peer;
  peerId: string = '';
  conn: any;
  messages: any[] = [];
  onPeerAdded = new EventEmitter<any>();
  constructor() {
    this.peer = new Peer();
    this.peer.on('open', (id) => {
      this.peerId = id;
    });
    this.peer.on("connection", (conn) => {
      console.log(conn.connectionId)
      this.conn = conn;
      this.onPeerAdded.emit(this.conn);
      this.conn.on("data", (msg: string) => {
        console.log(msg)
        this.messages.push(
          {
            from: 'other',
            text: msg
          }
        )
      });
    });
  }
  connect(id: any) {
    this.conn = this.peer.connect(id, {
      reliable: true
    });
    if (this.conn) {
      this.conn.on("data", (msg: any) => {
        this.messages.push(
          {
            from: 'other',
            text: msg
          }
        )
      });
      return true;
    }
    else {
      return false;
    }

  }
  sendMessage(msg: string) {
    this.messages.push(
      {
        from: 'me',
        text: msg
      }
    )
    this.conn.send(msg)
  }

}
