import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FuctionsService {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
    ) { }

  //#region MODAL
  async openModal(component, data?){
    const modal = await this.modalController.create({
      component: component,
      componentProps: {
        client : data
      },
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  dismissModal(){
    this.modalController.dismiss();
  }
  //#endregion

  async presentToast(mensaje:string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
