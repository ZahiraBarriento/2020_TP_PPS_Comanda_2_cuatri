import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Perfil, perfilJson } from '../../models/perfilJson';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FuctionsService } from '../../services/fuctions.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { TitleCasePipe } from '@angular/common';

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
              private toastService: ToastService,
              private userService: UsuarioService,
              public modalController: FuctionsService) {

    this.crearFormulario();
    this.perfilJso = perfilJson;
  }

  //#region Login

  async SignIn() {

    this.auth.login(this.credencial)
      .then(resAuth => {
        // envio el uid del auth para comparar el id de db usuario. Si existe lo traigo
        this.userService.traerUsuario(resAuth.user.uid, this.credencial.email)
          .then((resDb: UsuarioModel) => {

            if (resDb.activated){
              // Guardo en un local storage el usuario de la Base de Datos
              this.mensajesAcceso(resDb);
              localStorage.setItem('userCatch', JSON.stringify(resDb));
              this.router.navigateByUrl('home');
            }
            else {
              console.log("EL USUARIO NO ESTA ACTIVADO");
              //MOSTRAR ERROR LUCAS
            }
            
          });
      })
      .catch( err => {
        switch (err.code) {
          case 'auth/invalid-email' || 'auth/user-not-found':
            this.toastService.MostrarMensaje('Correo y/o contraseña incorrecta', false);
            break;

          default:
            this.toastService.MostrarMensaje('Problemas tecnicos.. Error reportado', false);
        }
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

  async anonimo(){
    this.modalController.openModal(ModalComponent, 'my-custom-modal-css');
  }

  logUser() {
    this.credencial.email = this.forma.get('email').value;
    this.credencial.pass = this.forma.get('pass').value;
    this.SignIn();
  }

  Registrarse(){
    this.userService.mailFromLogin = this.forma.get('email').value;
    this.userService.passFromLogin = this.forma.get('pass').value;
    this.router.navigateByUrl('altas/cliente');
  }


  mensajesAcceso(usuario: UsuarioModel){


        const msj = `Se ficha empleado ${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()} con exito. Aguarde...`;
        
        switch (usuario.perfil.toString()) {
          case ('mozo' || 'metre'):
            this.toastService.MostrarMensaje(msj, false);
            break;
          case 'supervisor':
            this.toastService.MostrarMensaje(`Bienvenido supervisor  ${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()}. Aguarde...`, false);
            break;
          case 'duenio':
              this.toastService.MostrarMensaje(`Bienvenido  ${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()}. Se activan todos los Permisos. Aguarde...`, false);
              break;
          
          default:
            break;
        }

       



    })


  }

}
