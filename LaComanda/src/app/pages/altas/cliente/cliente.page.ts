import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FirestoreService } from '../../../services/firestore.service';
import { AuthService } from '../../../services/auth.service';
import { QrService } from '../../../services/qr.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../../../services/loader.service';
import { ToastService } from '../../../services/toast.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { element } from 'protractor';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  viewPic: string = "../../../../assets/image/default.jpg";
  image;
  yaSubioFoto = false;

    get nombre() {
      return this.tableForm.get("nombre");
    }
  
    get apellido() {
      return this.tableForm.get("apellido").value;
    }

    get correo() {
      return this.tableForm.get("correo").value;
    }

    get clave() {
      return this.tableForm.get("clave").value;
    }
  
    get dni() {
      return this.tableForm.get("dni").value;
    }

   constructor(
    public router: Router,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private camera: Camera,
    private firestore: FirestoreService,
    private qr: QrService,
    private loading : LoaderService,
    public toast: ToastService,
    private auth:AuthService,
    private userService:UsuarioService) {
  }

  ngOnInit() {
    this.tableForm.setValue({nombre: null, apellido: null, correo: this.userService.mailFromLogin, clave: this.userService.passFromLogin, dni: null});
  }


  tableForm = this.formBuilder.group({
    nombre: ['', [
      Validators.required,
      Validators.pattern("^([a-zA-Z]+\s)*[a-zA-Z]+$")
    ]],
    apellido: ['', [
      Validators.required,
      Validators.pattern("^([a-zA-Z]+\s)*[a-zA-Z]+$")
    ]],
    correo: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
    ]],
    clave: ['', [
      Validators.required,
      Validators.pattern("^[A-Za-z0-9_.].{5,}$")
    ]],
    dni: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]],
  });

  SubirFoto(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 30
    }
    this.camera.getPicture(options)
    .then(imageData => {
        this.yaSubioFoto = true;
        this.image = `data:image/jpeg;base64,${imageData}`;
    });
  }

  onSubmitTable(){
    this.auth.register(this.correo, this.clave).then(res =>{
      var json = {
        "id": res.user.uid,
        "nombre": this.nombre,
        "apellido": this.apellido,
        "correo": this.correo,
        "pass": this.clave,
        "dni": this.dni,
        "foto": this.image,
        "perfil": "cliente",
        "activated": false,
        "listaEspera" : false
      };
      this.firestore.addData("usuarios", json);
      this.auth.esClienteActivado = false;
      this.VolverAtrasSpinner();
    });
  }

  EscanearQR(){
   this.qr.getDatosDniQr()
   .then((json) => this.RellenarCampos(json));
  }

  RellenarCampos(json){
    this.tableForm.setValue({nombre: json["nombre"], apellido: json["apellido"], correo: null, clave: null, dni: json["dni"]});
  }  

  Cancelar(){
    this.tableForm.setValue({nombre: null, apellido: null, correo: null, clave: null, dni: null});
    this.VolverAtrasSpinner();
  }

  VolverAtrasSpinner(){
    var soyMetre = localStorage.getItem('userCatch') != null;
    this.loading.showLoader();
    document.getElementById("VntPrincipal").style.opacity = "0.2";
    setTimeout(() =>{
      this.toast.MostrarMensaje("Cliente registrado con exito, espere a que un encargado lo habilite", false);
      document.getElementById("VntPrincipal").style.opacity = "1";
      if (soyMetre)
        this.router.navigate(['/home']);
      else
        this.router.navigate(['/login']);
    }, 2000);
  }
}
