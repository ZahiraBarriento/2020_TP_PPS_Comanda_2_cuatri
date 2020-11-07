import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Perfil, perfilJson } from '../../models/perfilJson';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  forma: FormGroup;
  credencial = { email: '', pass: '', displayName: '', photoURL: '' };
  perfilJso: Perfil[];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private toastCtrl: ToastController,
              private userService: UsuarioService,
              public modalController: ModalController) {

    this.crearFormulario();
    this.perfilJso = perfilJson;
  }

  //#region Login

  async SignIn() {

    this.auth.login(this.credencial)
      .then(resAuth => {
        // envio el uid del auth para comparar el id de db usuario. Si existe lo traigo
        this.userService.traerUsuario(resAuth.user.uid, this.credencial.email)
          .then(resDb => {
            // Guardo en un local storage el usuario de la Base de Datos
            localStorage.setItem('userCatch', JSON.stringify(resDb));
            this.router.navigateByUrl('home');
          });
      })
      .catch( err => {
        console.log("nose que pasa");
      });
  }

  //#endregion


  get correoNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email');
  }

  get passNoValido() {
    return this.forma.get('pass').invalid && this.forma.get('pass');
  }

  //#region Creacion del Formulario

  crearFormulario() {
    this.forma = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%a-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  //#endregion

  logPerfil(perfilTipo) {

    this.perfilJso.forEach( perfil => {

      if (perfilTipo === perfil.perfil){
        console.log(perfil);
        this.credencial.email = perfil.correo;
        this.credencial.pass = perfil.clave;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        console.log('Credencial ' + this.credencial.email);
        this.SignIn();

        return;
      }
    });
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  logUser() {
    this.credencial.email = this.forma.get('email').value;
    this.credencial.pass = this.forma.get('pass').value;
    this.SignIn();
  }

  async showMessage(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }

  Registrarse(){
    this.userService.mailFromLogin = this.forma.get('email').value;
    this.userService.passFromLogin = this.forma.get('pass').value;
    this.router.navigateByUrl('altas/cliente');
  }

}
