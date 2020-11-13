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
  userCatch;
  mailFromLogin = null;
  passFromLogin = null;

  constructor(private fr: FirestoreService,
              private toastCtrl: ToastController) { }


  traerUsuario(uid: string, correo: string) {

    return new Promise( (resolve, reject) => { 

    this.fr.getDataAll('usuarios').subscribe( snapshot => {
      let state = false;

      if(snapshot){
        snapshot.forEach( doc => { 

          if(doc.payload.doc.data()['id'] == uid && doc.payload.doc.data()['correo'] == correo) { 
            this.user.id = doc.payload.doc.data()['id'];
            this.user.nombre = doc.payload.doc.data()['nombre'];
            this.user.apellido = doc.payload.doc.data()['apellido'];
            this.user.dni = doc.payload.doc.data()['dni'];
            this.user.cuil = doc.payload.doc.data()['cuil'];
            this.user.foto = doc.payload.doc.data()['foto'];
            this.user.perfil = doc.payload.doc.data()['perfil'];
            this.user.correo = doc.payload.doc.data()['correo'];
            this.user.activated = doc.payload.doc.data()['activated'];
            this.user.listaEspera = false;

            if(this.user) {
              state = true;
              resolve(this.user);
            }

          }
 
        });

        if(!state) { this.showMessage('Usuario y/o contraseña incorrecto'); }
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
