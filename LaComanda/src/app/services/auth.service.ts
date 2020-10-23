import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private auth: AngularFireAuth ) {
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
}
