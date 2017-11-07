import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserDto } from '../../dto/UserDto';

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

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public loadingCtrl:LoadingController, 
              private storage: Storage) {

    storage.get("User").then((user) => {
      this.userDto = user;
    });

  }

}
