import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user: User;

  constructor(private auth: AngularFireAuth, private navCtrl:NavController ) {
    this.auth.authState.subscribe( (resp) => {
      this.user = resp;
    });
  }

   login(credencial){

     return this.auth.signInWithEmailAndPassword(credencial.email, credencial.pass).then( (res) => {
      this.user = res.user;

      if(credencial.displayName && credencial.photoURL && credencial.displayName !== '' && credencial.photoURL !== ''){
        this.user.updateProfile({displayName: credencial.displayName, photoURL: credencial.photoURL});
      }

      console.log(this.user);
     });
  }

  stateUsuario() {
    return this.auth.authState;
  }

  public async signIn(mail, clave) {
    return this.auth.signInWithEmailAndPassword(mail, clave);
  }

  public async signOut() {
      this.auth.signOut();
      this.navCtrl.navigateForward("home"); //probar esto
  }

  public async register(mail, clave) {
    return this.auth.createUserWithEmailAndPassword(mail, clave);
  }
}
