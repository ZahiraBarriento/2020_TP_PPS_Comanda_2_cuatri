import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { Perfil, perfilJson } from "../../models/perfilJson";
import { ModalComponent } from "src/app/components/modal/modal.component";
import { FuctionsService } from "../../services/fuctions.service";
import { UsuarioModel } from "src/app/models/usuario.model";
import { LoaderService } from 'src/app/services/loader.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  forma: FormGroup;
  credencial = { email: "", pass: "", displayName: "", photoURL: "" };
  perfilJso: Perfil[];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private userService: UsuarioService,
              public modalController: FuctionsService,
              private loader: LoaderService,
              private toast:FuctionsService,
              private push : PushNotificationService) {

    this.crearFormulario();
    this.perfilJso = perfilJson;
  }

  //#region Login

  async SignIn() {
    this.auth
      .login(this.credencial)
      .then((resAuth) => {
        // envio el uid del auth para comparar el id de db usuario. Si existe lo traigo
        this.userService
          .traerUsuario(resAuth.user.uid, this.credencial.email)
          .then((resDb: UsuarioModel) => {
            if (resDb.activated) {
              const audio = new Audio('../../../assets/audio/inicio-sesion.mp3');
              // Guardo en un local storage el usuario de la Base de Datos
              this.mensajesAcceso(resDb);
              localStorage.setItem("userCatch", JSON.stringify(resDb));
              this.loader.showLoader();
              setTimeout(() => {
                audio.play();
                this.router.navigateByUrl("home");
              }, 1500);
            } else {
              this.toast.presentToast("El cliente aún no ha sido activado!", 'warning');
            }
          });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            this.toast.presentToast("Correo incorrecta", 'danger');            
            break;
          default:
            this.toast.presentToast("Ha ocurrido un problema, vuelva a intentar mas tarde.", 'danger');
        }
      });
  }

  //#endregion

  get correoNoValido() {
    return this.forma.get("email").invalid && this.forma.get("email");
  }

  get passNoValido() {
    return this.forma.get("pass").invalid && this.forma.get("pass");
  }

  //#region Creacion del Formulario

  crearFormulario() {
    this.forma = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%a-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ],
      ],
      pass: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  //#endregion

  logPerfil(perfilTipo) {

    let llave = false;

    this.perfilJso.forEach((perfil) => {
      if (perfilTipo === perfil.perfil && !llave) {
        console.log(perfil);
        this.credencial.email = perfil.correo;
        this.credencial.pass = perfil.clave;
        this.credencial.photoURL =
          "https://loremflickr.com/320/240/picture,face?random=2";
        console.log("Credencial " + this.credencial.email);
        this.SignIn();
        console.log('logPerfil', perfil);
        llave = true;
        return;
      }
    });
  }

  async anonimo() {
    this.modalController.openModal(ModalComponent, "my-custom-modal-css");
  }

  logUser() {
    this.credencial.email = this.forma.get("email").value;
    this.credencial.pass = this.forma.get("pass").value;
    this.SignIn();
  }

  Registrarse() {
    this.router.navigateByUrl("altas/cliente");
  }

  mensajesAcceso(usuario: UsuarioModel) {
    const msj = `Se ficha empleado ${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()} con exito. Aguarde...`;

    switch (usuario.perfil.toString()) {
      case "cliente":
        this.modalController.presentToast(
          `Gracias por elegirnos ${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()}. Aguarde...`,
          'success'
        );
        break;
        case "anonimo":
          this.modalController.presentToast(
            `Gracias por elegirnos ${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()}. Tiene permisos limitados Aguarde...`,
            'success'
          );
          break;
      case "mozo":
        this.modalController.presentToast(msj, 'success');
        break;
      case "bartender":
        this.modalController.presentToast(msj, 'success');
        break;
      case "metre":
        this.modalController.presentToast(msj, 'success');
        break;
      case "cocinero":
        this.modalController.presentToast(msj, 'success');
        break;
      case "repartidor":
        this.modalController.presentToast(msj, 'success');
        break;
      case "supervisor":
        this.modalController.presentToast(
          `Bienvenido supervisor  ${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()}. Aguarde...`,
          'success'
        );
        break;
      case "duenio":
        this.modalController.presentToast(
          `Bienvenido  ${usuario.nombre.toUpperCase()} ${usuario.apellido.toUpperCase()}. Se activan todos los Permisos. Aguarde...`,
          'success'
        );
        break;

      default:
        break;
    }
  }
}
