import { Component, ElementRef, ViewChild } from '@angular/core';
import { PeerService } from './services/peer.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentMode: string = 'init';
  otherid: string = '';
  message: string = '';
  id = '';
  callActive = false;
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  localStream: MediaStream | undefined;
  remoteStream: MediaStream | undefined;
  constructor(public peerservice: PeerService) {
    this.peerservice.onPeerAdded.subscribe(data => {
      this.currentMode = 'chat';
    });
    this.peerservice.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(localStream => {
        this.localStream = localStream;
        call.answer(this.localStream);
        call.on('stream', (remoteStream) => {
          this.localVideo.nativeElement.srcObject = localStream;
          this.remoteVideo.nativeElement.srcObject = remoteStream;
        });
      });

    });
  }
  createRoom() {
    if (this.peerservice.peerId) {
      this.id = this.peerservice.peerId;
      this.currentMode = 'wait'
    }
    else {
      alert("Unable to create Room")
    }

  }
  joinRoom() {
    if (this.peerservice.connect(this.otherid)) {
      this.currentMode = 'chat';
    }

  }
  sendMessage() {
    this.peerservice.sendMessage(this.message);
    this.message = '';
  }
  startCall() {
    this.callActive = true;
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      this.localStream = stream;
      this.localVideo.nativeElement.srcObject = stream;
      const call = this.peerservice.peer.call(this.otherid, stream);
      call.on('stream', (remoteStream: any) => {
        this.remoteStream = remoteStream;
        this.remoteVideo.nativeElement.srcObject = stream;
      });
    }, (err) => {
      console.log(err)
    });
  }

  endCall() {
    location.reload();
  }
}
