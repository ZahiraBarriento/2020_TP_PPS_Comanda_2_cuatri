import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl:NavController) {}

  Alta(opc){
    switch(opc){
      case 1:
        this.navCtrl.navigateForward('altas/duenio');
        break;
      case 2:
        this.navCtrl.navigateForward('altas/empleado');
        break;
      case 3:
        this.navCtrl.navigateForward('altas/cliente');
        break;
      case 4:
        this.navCtrl.navigateForward('altas/mesa');
        break;
      case 5: 
        this.navCtrl.navigateForward('altas/producto');
        break;
    }
  }

}
