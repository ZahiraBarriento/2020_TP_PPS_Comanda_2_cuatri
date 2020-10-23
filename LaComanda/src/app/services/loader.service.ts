import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loadingController: LoadingController) { }
  
    async showLoader() {
  
      const loading = await this.loadingController.create({
        spinner: null,
        translucent: true,
        message: '<img class="spinner" src="../../../assets/spinner.png">',
        cssClass: 'my-custom-class',
        duration: 2000
      });
      await loading.present();
    }
}
