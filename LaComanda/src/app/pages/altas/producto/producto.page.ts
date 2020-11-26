import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { ProductoInterface } from 'src/app/models/producto.interface';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FuctionsService } from 'src/app/services/fuctions.service';


@Component({
  selector: "app-producto",
  templateUrl: "./producto.page.html",
  styleUrls: ["./producto.page.scss"],
})
export class ProductoPage implements OnInit {
  //#region Get Values Form
  get nombre() {
    return this.forma.get("nombre").value;
  }

  get descripcion() {
    return this.forma.get("descripcion").value;
  }

  get timeElaboracion() {
    return this.forma.get("timeElaboracion").value;
  }

  get precio() {
    return this.forma.get("precio").value;
  }
  //#endregion

  forma: FormGroup;
  imageEmpty = "../../../../assets/image/default.jpg";
  title;
  tipo;
  imagen1;
  imagen2;
  imagen3;
  userPerfil: UsuarioModel;

  constructor(
    private fb: FormBuilder,
    private camera: Camera,
    private fr: FirestoreService,
    private toastCtrl: FuctionsService,
    private router: Router
  ) {

    this.userPerfil = JSON.parse(localStorage.getItem('userCatch')) as UsuarioModel;
    this.generarForm();

    this.verificarAcceso('cocinero', 'bartender')
      .then( (res: boolean) => {
        this.tipo =
        this.userPerfil.perfil.toString() == 'cocinero'
          ? 'plato'
          : this.userPerfil.perfil.toString() == 'bartender'
          ? 'bebida'
          : 'no permitida';
        this.title = 'ALTA ' + this.tipo;
      })
      .catch( (res: boolean) => {
        console.log('Usuario no tiene Acceso. Sera redireccionado....');
        this.router.navigateByUrl('/login');
     });
  }

  ngOnInit() {
     
  }

  generarForm() {
    this.forma = this.fb.group({
      nombre: ["", [Validators.required, Validators.pattern("")]], // Se asigna registro tareas
      descripcion: ["", [Validators.required, Validators.pattern("")]], // Se asigna registro tareas
      timeElaboracion: ["", [Validators.required, Validators.pattern("[0-9]")]],
      precio: ["", [Validators.required, Validators.pattern("[0-9]")]],
    });
  }

  altaProducto() {

    if (this.imagen1 != this.imageEmpty && this.imagen2 != this.imageEmpty && this.imagen3 != this.imageEmpty) {

    const jsonProducto: ProductoInterface = {
      id: new Date().valueOf().toString(),
      nombre: this.nombre,
      descripcion: this.descripcion,
      timeElaboracion: this.timeElaboracion,
      tipo: this.tipo,
      precio: this.precio,
      foto1: this.imagen1,
      foto2: this.imagen2,
      foto3: this.imagen3,
      activated: true,
    };
    this.fr.addData('productos', jsonProducto);
    this.toastCtrl.presentToast(`Se carga ${this.nombre} como ${this.tipo}`, 'success');

    this.resetearForm();

    }

   
  }

  asignarImg(index) {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 90,
    };

    this.camera.getPicture(options).then((imageData) => {
      /* this.imageUpload[index] = `data:image/jpeg;base64,${imageData}`; */

      if (index === 1) {
        this.imagen1 = `data:image/jpeg;base64,${imageData}`;
      }
      if (index === 2) {
        this.imagen2 = `data:image/jpeg;base64,${imageData}`;
      }
      if (index === 3) {
        this.imagen3 = `data:image/jpeg;base64,${imageData}`;
      }
    });
  }

  //#region Funcion reutilizable para resetear Formulario

  resetearForm() {
    this.forma.reset();
    this.imagen1 = "../../../../assets/image/default.jpg";
    this.imagen2 = "../../../../assets/image/default.jpg";
    this.imagen3 = "../../../../assets/image/default.jpg";
  }

  //#endregion

  verificarAcceso( ...usuario ){
    const usuariosAcces = [...usuario];
    let access = false;
    return new Promise( (resolve, reject) => {

      for (let i = 0; i < usuariosAcces.length; i++){
        
        if (usuariosAcces[i] === this.userPerfil.perfil.toString()){
          access = true;
          i = usuariosAcces.length;
        }      
      }

      access ? resolve(access) : reject(access);
    });
  }

}
