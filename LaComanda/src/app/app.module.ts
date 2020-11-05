import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ComponentsModule } from './components/components.module';
 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgxQRCodeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AndroidFullScreen,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
