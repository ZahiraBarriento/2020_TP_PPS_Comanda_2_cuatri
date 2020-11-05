import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { promise } from 'protractor';
 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user: User;

  constructor(private auth: AngularFireAuth,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {
    this.auth.authState.subscribe( (resp) => {
      this.user = resp;
    });
  }

   public async login(credencial){

     return await this.auth.signInWithEmailAndPassword(credencial.email, credencial.pass)
  }

  stateUsuario() {
    return this.auth.authState;
  }

  public async signIn(mail, clave) {
    return this.auth.signInWithEmailAndPassword(mail, clave);
  }

  public async signOut() {
      this.auth.signOut();
      this.navCtrl.navigateForward('/login'); 
  }

  public async register(mail, clave) {
    return this.auth.createUserWithEmailAndPassword(mail, clave);
  }
  
}
