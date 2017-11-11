import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//User
import { UserDto } from '../../dto/UserDto';
//Services
import { ConversationService } from '../../service/ConversationService';
//Interface
import { ConversationResponse } from '../../interface/ConversationResponse';
import { Conversation } from '../../interface/Conversation';
import { FriendResponse } from '../../interface/FriendResponse';
import { Friend } from '../../interface/Friend';
import { MessageRequest } from '../../interface/MessageRequest';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.component.html'
})
export class ChatPage {
  sendMessageText: string = "";
  userDto: UserDto = 
  {
    username: "",
    password: "",
    token: "",
    userId: ""
  };
  messageDto: Conversation = 
  {
    message: "",
    messageSent: "",
    receivingDisplayName: "",
    receivingUserId: "",
    sendingDisplayName: "",
    sendingUserId: ""
  };
  messageList: Conversation[] = null;
  friendDto: Friend = 
  {
    displayName: "",
    userId: ""
  };
  messageRequest: MessageRequest = 
  {
    message: "",
    receivingUser: "",
    sendingUser: ""
  }
  statusMessage = "";
  friendList: Friend[] = null;
  loader;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public loadingCtrl:LoadingController, 
              private storage: Storage,
              private conversationService: ConversationService,
              public navParams: NavParams) {
    this.loader = this.loadingCtrl.create({
      content: "Loading Conversation..."
    });
    this.loader.present();
    storage.get("User").then((user) => {
      this.userDto = user;
      this.friendDto.displayName = this.navParams.get("displayName");
      this.friendDto.userId = this.navParams.get("userId");
      this.conversationService
        .getConversation(this.userDto.userId, this.friendDto.userId)
        .subscribe((result) => this.displayConversation(result));
    });
  }

  displayConversation(apiData): void {
    this.loader.dismissAll();
    if (apiData.success) {
      if (apiData.messages != null) {
        this.messageList = apiData.messages;
        this.sendMessageText = "";
      } 
    }
    else {
      this.statusMessage = apiData.errorMessage + " " + apiData.reason;
    }
  }
  sendMessage(): void {
    this.messageRequest.message = this.sendMessageText;
    this.messageRequest.sendingUser = this.userDto.userId;
    this.messageRequest.receivingUser = this.friendDto.userId;

    this.conversationService
      .sendMessage(this.messageRequest)
      .subscribe((result) => this.displayConversation(result));
  }
}
