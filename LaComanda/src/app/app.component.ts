import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [AndroidFullScreen]
})
export class AppComponent {

  splash = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidFullScreen: AndroidFullScreen
  ) {
    this.initializeApp();
    this.fullScreen();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    
      if(this.splash){
        setTimeout(() =>{
          this.splash = false;
        }, 7000)
      }
    });
  }

  fullScreen(){
    this.androidFullScreen.isImmersiveModeSupported()
    .then(() => this.androidFullScreen.immersiveMode())
    .catch(err => console.log(err));
  }
}
