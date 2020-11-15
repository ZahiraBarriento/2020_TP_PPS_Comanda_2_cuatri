import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController:ToastController) { }

  public MostrarMensaje(mensaje:string, esError:boolean){
    this.toastController.create({
      duration: 3000,
      message: mensaje,
      animated: true,
      cssClass: 'toast',
      color: esError ? "danger" : "success",
    }).then((toastData) => {
      toastData.present();
    });
  }
}
