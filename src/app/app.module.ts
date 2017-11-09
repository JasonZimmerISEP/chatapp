import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '013473e5'
  }
};

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.component';
import { LoginPage } from '../pages/login/login.component';
//Services
import { LoginService } from '../service/LoginService';
import { AccountService } from '../service/AccountService';
import { FriendService } from '../service/FriendService';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    AccountService,
    FriendService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
