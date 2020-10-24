import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { perfil } from '../../perfil';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  forma: FormGroup;
  credencial = {  email: '', pass: '', displayName: '', photoURL: '' };

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private toastCtrl: ToastController) {

    this.crearFormulario();

  }

  SignIn(){
    this.auth.login(this.credencial).then( (res) => {
      this.router.navigateByUrl('home');
    }).catch( error => {
      this.showMessage(error);
    });
  }

  ngOnInit() {
  }

  get correoNoValido(){
    return this.forma.get('email').invalid && this.forma.get('email');
  }

  get passNoValido(){
    return this.forma.get('pass').invalid && this.forma.get('pass');
  }

  crearFormulario(){
    this.forma = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%a-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      pass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  logPerfil(perfilTipo){

    switch (perfilTipo) {
      case 'supervisor': {
          this.credencial.email = perfil[0].nombre;
          this.credencial.pass = perfil[0].clave;
          this.credencial.displayName = 'usuario ' + perfil[0].perfil;
          this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
          this.SignIn();
          break;
      }
      case 'empleado': {
        this.credencial.email = perfil[1].nombre;
        this.credencial.pass = perfil[1].clave;
        this.credencial.displayName = 'usuario ' + perfil[1].perfil;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();
        break;
      }
      case 'cliente': {
        this.credencial.email = perfil[2].nombre;
        this.credencial.pass = perfil[2].clave;
        this.credencial.displayName = 'usuario ' + perfil[2].perfil;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();
        break;
     }
     case 'dueño': {
      this.credencial.email = perfil[3].nombre;
      this.credencial.pass = perfil[3].clave;
      this.credencial.displayName = 'usuario ' + perfil[3].perfil;
      this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
      this.SignIn();
      break;
   }
   }
  }

  logUser(){
    this.credencial.email = this.forma.get('email').value;
    this.credencial.pass = this.forma.get('pass').value;
    this.SignIn();
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
