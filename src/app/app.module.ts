import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// components
import { MyApp } from './app.component';

// services 
import { DataProvider } from '../providers/data/data';

// plugins and others
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

var firebaseConfig = {
  apiKey: "AIzaSyD1mml98FQ_PoqQVYt1I2vCRO7WBJ5wFB8",
  authDomain: "pocketapp-52f9a.firebaseapp.com",
  databaseURL: "https://pocketapp-52f9a.firebaseio.com",
  projectId: "pocketapp-52f9a",
  storageBucket: "pocketapp-52f9a.appspot.com",
  messagingSenderId: "1049180474321"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    File,
    DataProvider, 
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
