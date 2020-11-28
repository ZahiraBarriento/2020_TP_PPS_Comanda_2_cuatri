import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  esClienteActivado = true;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe((resp) => {
      this.user = resp;
    });
  }

  public async login(credencial) {
    return await this.auth.signInWithEmailAndPassword(credencial.email, credencial.pass)
  }

  stateUsuario() {
    return this.auth.authState;
  }

  public async signIn(mail, clave) {
    return this.auth.signInWithEmailAndPassword(mail, clave);
  }

  public async signOut() {
    this.auth.signOut().then(() =>{
      console.log('login del orto');
      this.router.navigate(['/login']);
    })
  }

  public async register(mail, clave) {
    return this.auth.createUserWithEmailAndPassword(mail, clave);
  }
}
