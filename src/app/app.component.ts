import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Peer } from "peerjs";
import { PeerService } from './services/peer.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentMode :string = 'init';
  code:string = '';
  message:string ='';
  messages:any[]=[];
  id='';
  constructor(public peerservice:PeerService,private router:Router) {
    this.peerservice.onPeerAdded.subscribe(data => {
      console.log(data)
      this.currentMode = 'chat';
    });
    this.peerservice.onPeerData.subscribe((data:any) => {
     let message = {
      from : 'other',
      text : data
     }
      this.messages.push(message)  
    });
  }
  createRoom(){
    if(this.peerservice.peerId){
      this.id = this.peerservice.peerId;
      this.currentMode = 'wait'
    }
    else{
      alert("Unable to create Room")
    }

  }
  joinRoom(){
    if(this.peerservice.connect(this.code)){
      this.currentMode = 'chat';
      this.peerservice.sendMessage("Partner Joined")
    }
   
  }
  sendMessage(){
     this.peerservice.sendMessage(this.message);
  
     let data = {
      from : 'me',
      text : this.message
     }
     this.messages.push(data)  
        this.message='';
  }
}
