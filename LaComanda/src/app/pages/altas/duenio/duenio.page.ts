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

@Component({
  selector: 'app-duenio',
  templateUrl: './duenio.page.html',
  styleUrls: ['./duenio.page.scss'],
})
export class DuenioPage implements OnInit {
  viewPic: string = "../../../../assets/image/default.jpg";
  image;

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
  
    get cuil() {
      return this.tableForm.get("cuil").value;
    }
  
    get type() {
      return this.tableForm.get("type").value;
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
    private auth:AuthService) {
  }

  ngOnInit() {    
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
    cuil: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]],
    type: ['', [
      Validators.required
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
        "cuil": this.cuil,
        "foto": this.image,
        "activated": true,
        "perfil": this.type,
      };
      this.firestore.addData("usuarios", json);
      this.VolverAtrasSpinner();
    });
  }

  EscanearQR(){
   this.qr.getDatosDniQr().then((json) => this.RellenarCampos(json));
  }

  RellenarCampos(json){
    this.tableForm.setValue({nombre: json["nombre"], apellido: json["apellido"], correo: null, clave: null, dni: json["dni"], cuil: json["cuil"], type: null});
  }  

  Cancelar(){
    this.tableForm.setValue({nombre: null, apellido: null, correo: null, clave: null, dni: null, cuil: null, type: null});
    this.VolverAtrasSpinner();
  }

  VolverAtrasSpinner(){
    this.loading.showLoader();
    document.getElementById("VntPrincipal").style.opacity = "0.2";
    setTimeout(() =>{
      document.getElementById("VntPrincipal").style.opacity = "1";
      this.toast.MostrarMensaje("Usuario dado de alta correctamente!", false);
      this.router.navigate(['/home']);
    }, 2000);
  }
}
