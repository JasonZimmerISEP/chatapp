import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//Pages
import { ChatPage } from '../../pages/chat/chat.component';
//User
import { UserDto } from '../../dto/UserDto';
//Services
import { FriendService } from '../../service/FriendService';
//Interface
import { FriendResponse } from '../../interface/FriendResponse';
import { Friend } from '../../interface/Friend';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomePage {

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
      this.friendService.getFriends(this.userDto.userId, "1.0")
        .subscribe((result) => this.displayFriends(result));
    });

  }
  displayFriends(apiData: FriendResponse): void {
    this.loader.dismissAll();
    if (apiData.success) {
      this.friendList = apiData.friends;
    }
    else {
      this.statusMessage = apiData.errorMessage + " " + apiData.reason;
    }
  }

  chatwith(friend: Friend): void {
    this.navCtrl.push(ChatPage, friend);
  }
}
