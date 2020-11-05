import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FirestoreService } from '../../../services/firestore.service';
import { AuthService } from '../../../services/auth.service';
import { QrService } from '../../../services/qr.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../../../services/loader.service';
import { ToastController } from '@ionic/angular';

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
      return this.tableForm.get("nombre").value;
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
    public toastController: ToastController,
    private auth:AuthService) {
  }

  ngOnInit() {    
    this.yaSubioFoto = false;
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
        "clave": this.clave,
        "dni": this.dni,
        "foto": this.image,
        "actived": true,
      };
      this.firestore.addData("usuarios", json);
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
    this.loading.showLoader();
    document.getElementById("VntPrincipal").style.opacity = "0.2";
    setTimeout(() =>{
      document.getElementById("VntPrincipal").style.opacity = "1";
      this.router.navigate(['/home']);
    }, 2000);
  }
}
