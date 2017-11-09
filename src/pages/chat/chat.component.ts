import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//User
import { UserDto } from '../../dto/UserDto';
//Services
import { FriendService } from '../../service/FriendService';
//Interface
import { FriendResponse } from '../../interface/FriendResponse';
import { Friend } from '../../interface/Friend';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.component.html'
})
export class ChatPage {

  userDto: UserDto = 
  {
    username: "",
    password: "",
    token: "",
    userId: ""
  };
  statusMessage = "";
  friendList: Friend[] = null;
  loader;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public loadingCtrl:LoadingController, 
              private storage: Storage,
              private friendService: FriendService) {
    this.loader = this.loadingCtrl.create({
      content: "Loading friends..."
    });
    this.loader.present();
    storage.get("User").then((user) => {
      this.userDto = user;
    });

  }
}
