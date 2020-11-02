import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { perfil } from '../../models/perfil';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  forma: FormGroup;
  credencial = { email: '', pass: '', displayName: '', photoURL: '' };

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private userService: UsuarioService,
    public modalController: ModalController) {

    this.crearFormulario();

  }

  async SignIn() {

    this.auth.login(this.credencial)
      .then(resAuth => {
        // envio el uid del auth para comparar el id de db usuario. Si existe lo traigo y lo guardo en el local
        this.userService.traerUsuario(resAuth.user.uid)
          .then(resDb => {
            // Guardo en un local storage el usuario DB
            localStorage.setItem('userCatch', JSON.stringify(resDb));
            this.router.navigateByUrl('home');
          });
      })
  }

  ngOnInit() {
  }

  get correoNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email');
  }

  get passNoValido() {
    return this.forma.get('pass').invalid && this.forma.get('pass');
  }

  crearFormulario() {
    this.forma = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%a-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  logPerfil(perfilTipo) {

    switch (perfilTipo) {
      case 'repartidor': {
        this.credencial.email = perfil[0].correo;
        this.credencial.pass = perfil[0].clave;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();

        console.log(this.credencial);
        break;
      }
      case 'duenio': {
        this.credencial.email = perfil[1].correo;
        this.credencial.pass = perfil[1].clave;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();
        break;
      }
      case 'anonimo': {
        this.credencial.email = perfil[2].correo;
        this.credencial.pass = perfil[2].clave;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();
        break;
      }
      case 'metre': {
        this.credencial.email = perfil[3].correo;
        this.credencial.pass = perfil[3].clave;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();
        break;
      }
      case 'bartender': {
        this.credencial.email = perfil[4].correo;
        this.credencial.pass = perfil[4].clave;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();
        break;
      }
      case 'cocinero': {
        this.credencial.email = perfil[5].correo;
        this.credencial.pass = perfil[5].clave;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();
        break;
      }
      case 'mozo': {
        this.credencial.email = perfil[6].correo;
        this.credencial.pass = perfil[6].clave;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();
        break;
      }
      case 'supervisor': {
        this.credencial.email = perfil[7].correo;
        this.credencial.pass = perfil[7].clave;
        this.credencial.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2';
        this.SignIn();
        break;
      }
    }
  }

  async openModal(){
    //console.log('entro')
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

}
