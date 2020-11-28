import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioModel } from '../models/usuario.model';
import { Usuario } from '../classes/usuario.class';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user: UsuarioModel;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = new Usuario();
    this.user =  JSON.parse(localStorage.getItem('userCatch')) as UsuarioModel;
 
   }

  

   canActivate() {
    if(this.user == null){
      this.router.navigate(['/login']); //SI NO ESTA PUES VA AL LOGIN
      return false;
    }else{

    
      return true;
    }
}
}
