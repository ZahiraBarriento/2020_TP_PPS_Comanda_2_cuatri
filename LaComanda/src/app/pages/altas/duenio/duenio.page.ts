import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';
import { FirestoreService } from '../../../services/firestore.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-duenio',
  templateUrl: './duenio.page.html',
  styleUrls: ['./duenio.page.scss'],
})
export class DuenioPage implements OnInit {
  public nombre;
  public nombreInvalido;
  public apellido;
  public apellidoInvalido;
  public dni;
  public dniInvalido;
  public cuil;
  public cuilInvalido;
  public foto;
  public correo;
  public correoInvalido;
  public clave;
  public claveInvalida;
  public perfil;
  public yaSubioFoto;
  public error;

  constructor(private camara:Camera, private navCtrl:NavController, private firestore:FirestoreService, private auth:AuthService) {
    this.error = "sin error";
    var jsonDNI = this.GetJsonFromQrDni("0053232@MARINO@LUCAS@M@39465462@B@26/02/1996@11/01/2018@201");
    this.perfil = 1;
    this.yaSubioFoto = false;
   }

  ngOnInit() {
  }

  SubirFoto(){
    
    let options: CameraOptions = {
      destinationType: this.camara.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 30
    }
    this.camara.getPicture(options)
    .then(imageData => {
        this.foto = `data:image/jpeg;base64,${imageData}`;
        this.yaSubioFoto = true;
    })
    .catch((response) => {
      this.error = String(response);
    });
  }

  GuardarPerfil(){
    if (this.ValidoTodo()){
      this.auth.register(this.correo, this.correo).then(res =>{
        var json = {
          "id": res.user.uid,
          "nombre": this.nombre,
          "apellido": this.apellido,
          "correo": this.correo,
          "clave": this.clave,
          "dni": this.dni,
          "cuil": this.cuil,
          "foto": this.foto,
          "actived": true,
          "perfil": this.perfil == 1 ? "Dueño" : "Supervisor"
        };
        this.firestore.addData("usuarios", json);
      });
    }
    else{
      this.MostrarError();
    }
  }

  EscanearQR(){
   
  }

  MostrarError(){
    document.getElementById("btnError").hidden = false;
    document.getElementById("VntPrincipal").style.opacity = "0.05";
    setTimeout(() => {
      document.getElementById("btnError").hidden = true;
      document.getElementById("VntPrincipal").style.opacity = "1";
    }, 2000);
  }

  ValidoTodo(){
    this.ValidarNombre();
    this.ValidarApellido();
    this.ValidarDni();
    this.ValidarCuil();
    this.ValidarCorreo();
    this.ValidarClave();

    if (this.nombreInvalido){
      this.error = "El nombre es inválido";
      return false;
    }
    else if (this.apellidoInvalido){
      this.error = "El apellido es inválido";
      return false;
    }
    else if (this.dniInvalido){
      this.error = "El dni es inválido";
      return false;
    }
    else if (this.cuilInvalido){
      this.error = "El CUIL es inválido";
      return false;
    }
    else if (this.foto == ""){
      this.error = "Falta subir foto";
      return false;
    }
    else if (this.claveInvalida){
      this.error = "La clave es demasiado corta";
      return false;
    }
    else if (this.correoInvalido){
      this.error = "El correo es inválido";
      return false;
    }
    return true;
  }

  ValidarNombre(){
    var regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    this.nombreInvalido = !regex.test(this.nombre);
  }

  ValidarApellido(){
    var regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    this.apellidoInvalido = !regex.test(this.apellido);
  }

  ValidarDni(){
    var regex = /^\d{8}(?:[-\s]\d{4})?$/;
    this.dniInvalido = !regex.test(this.dni);
  }

  ValidarCuil(){
    var regex = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g;
    this.cuilInvalido = !regex.test(this.cuil);
  }

  ValidarCorreo(){
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(this.correo);
    this.correoInvalido = !regex.test(this.correo);
  }
  
  ValidarClave(){
    this.claveInvalida = this.clave.length < 4;
  }

  Cancelar(){
    this.navCtrl.navigateForward('home');
    
  }

  GetJsonFromQrDni(data){
    var datos = data.split("@");
    var nombre = datos[2].charAt(0).toUpperCase() + datos[2].slice(1).toLowerCase();
    var apellido = datos[1].charAt(0).toUpperCase() + datos[1].slice(1).toLowerCase();
    var cuil1 = datos[8].substring(0,2);
    var cuil2 = datos[8].substring(3,1);
    var cuil = cuil1 + datos[4] + cuil2;

    return {"nombre":nombre, "apellido":apellido, "dni":datos[4], "cuil":cuil};
  }
  
}
