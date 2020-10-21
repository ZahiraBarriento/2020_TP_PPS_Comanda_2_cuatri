import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
  public error;

  constructor(private camara:Camera) {
    this.error = "sin error";
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
        this.GuardarPerfil();
    });
  }

  GuardarPerfil(){
    if (this.ValidoTodo()){
      //guardar en base de datos
    }
  }

  EscanearQR(){
    //if (usuarioLogueado == dueño/supervisor)
    //else mostrarError
  }

  ValidoTodo(){
    this.ValidarNombre();
    this.ValidarApellido();
    this.ValidarDni();
    this.ValidarCuil();

    if (this.nombreInvalido){
      this.error = "El nombre es inválido";
      return false;
    }
    else if (this.apellidoInvalido){
      this.error = "El apellido es inválido";
      return false;
    }
    else if (this.dniInvalido){
      this.error = "El DNI es inválido";
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
  
}
