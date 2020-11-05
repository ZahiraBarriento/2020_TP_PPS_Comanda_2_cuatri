import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { promise } from 'protractor';
import { stringify } from 'querystring';
import { Usuario } from '../classes/usuario.class';
import { UsuarioModel } from '../models/usuario.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  user: UsuarioModel = new Usuario();

  constructor(private fr: FirestoreService,
              private toastCtrl: ToastController) { }


  traerUsuario(uid: string) {

    return new Promise( (resolve, reject) => { 

    this.fr.getDataAll('usuarios').subscribe( snapshot => {

      if(snapshot){
        snapshot.forEach( doc => { 

          if(doc.payload.doc.data()['id'] == uid) { 
            this.user.id = doc.payload.doc.data()['id'];
            this.user.nombre = doc.payload.doc.data()['nombre'];
            this.user.apellido = doc.payload.doc.data()['apellido'];
            this.user.dni = doc.payload.doc.data()['dni'];
            this.user.cuil = doc.payload.doc.data()['cuil'];
            this.user.foto = doc.payload.doc.data()['foto'];
            this.user.perfil = doc.payload.doc.data()['perfil'];
            this.user.correo = doc.payload.doc.data()['correo'];

            console.log(`SE TRAER USUARIO ${this.user.nombre} ${this.user.perfil} desde usuario.service.ts`);

            if(this.user) {resolve(this.user)};
          }
        });
      } else { this.showMessage('Error!! No se encuentra el documento Usuarios'); }
    });
  });
  }


  async showMessage(text) {
    const toast =  await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }
 
}
