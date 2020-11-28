import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { Usuario } from '../classes/usuario.class';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {

  user: UsuarioModel;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = new Usuario();
    this.user =  JSON.parse(localStorage.getItem('userCatch')) as UsuarioModel;
 
  }

  ionViewDidEnter() {
    this.user = JSON.parse(localStorage.getItem('userCatch'));
  }

  canActivate() {
    if (this.user == null) {
      return true;
    } else {
      this.router.navigate(['/home']); //SI ESTA PUES VA A HOME
      return false;
    }
  }
}
