import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: "root",
})
export class PushNotificationService {
  constructor(private oneSignal: OneSignal,
              public platform: Platform) {
  }

  initNotification() {


    if(this.platform.is('cordova')){

      this.oneSignal.startInit(
        "8f048196-06ce-4c4a-b011-f53fee0c61cc",
        "648289619522"
      );
  
      this.oneSignal.inFocusDisplaying(
        this.oneSignal.OSInFocusDisplayOption.InAppAlert
      );

  
      this.oneSignal.handleNotificationReceived().subscribe((sus) => {

        alert(JSON.stringify(sus));
        
      });
  
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
  
      this.oneSignal.endInit();

    }else{
      console.log('OneSignal no funciona en Escritorio Windows');
    }
    
  }
}
