import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//Pages
import { HomePage } from '../home/home.component';
//Services
import { LoginService } from '../../service/LoginService';
import { AccountService } from '../../service/AccountService';
//Request
import { LoginRequest } from '../../interface/LoginRequest';
import { UserCreateRequest } from '../../interface/UserCreateRequest';
//Response
import { TokenResponse } from '../../interface/TokenResponse';
//DTO
import { UserDto } from '../../dto/UserDto';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginPage {

  showLogin:boolean = true;
  username:string = '';
  password:string = '';
  firstname:string = '';
  lastname:string = '';
  email:string = '';
  loader;
  loginRequest: LoginRequest = 
  {
    username: "",
    password: "",
    mobile_version: "1.0"
  };
  userCreateRequest: UserCreateRequest = 
  {
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: ""
  };
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
              private storage: Storage,
              public loginService:LoginService,
              public accountService:AccountService) {
                
                      this.loader = this.loadingCtrl.create({
                        content: "Logging in..."
                      });

              }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }
  
  loginUser() {
    if(this.showLogin) {
      console.log('process login');

      if(this.username === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Login Error', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }     
      this.loader.present();

      this.loginRequest.password = this.password;
      this.loginRequest.username = this.username;
      
      this.loginService
              .postLogin(this.loginRequest)
              .subscribe((result) => this.setLoginUser(result));
    } else {
      this.showLogin = true;
    }
  }

  registerUser() {
    if(!this.showLogin) {
      console.log('process register');

      /*
      do our own initial validation
      */
      if(this.firstname === '' || this.lastname === '' || this.username === '' || this.password === '' || this.email === '') {
        let alert = this.alertCtrl.create({
          title:'Register Error', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }
      
      this.loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      this.loader.present();

      this.userCreateRequest.email = this.email;
      this.userCreateRequest.firstname = this.firstname;
      this.userCreateRequest.lastname = this.lastname;
      this.userCreateRequest.password = this.password;
      this.userCreateRequest.username = this.username;
      
      this.accountService
              .createAccount(this.userCreateRequest)
              .subscribe((result) => this.setLoginUser(result));
     
    } else {
      this.showLogin = false;
    }
  }
  
  setLoginUser(apiData: TokenResponse): void {
      this.loader.dismissAll();
      if (apiData.success) {
        this.userDto.username = this.username;
        this.userDto.password = this.password;
        this.userDto.token = apiData.token;
        this.userDto.userId = apiData.userId;
        this.storage.set("User", this.userDto);
        this.navCtrl.setRoot(HomePage);    
      } else {
        let alert = this.alertCtrl.create({
          title:'Login Error', 
          subTitle:apiData.reason,
          buttons:['OK']
        });
        alert.present();
        this.navCtrl.setRoot(LoginPage);  
      }
  }

}