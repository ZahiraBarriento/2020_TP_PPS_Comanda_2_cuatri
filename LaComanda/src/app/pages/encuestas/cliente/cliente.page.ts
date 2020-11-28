import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FirestoreService } from '../../../services/firestore.service';
import { FuctionsService } from 'src/app/services/fuctions.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  image1:string="";
  image2:string="";
  image3:string="";
  opinion:string = "";
  protocoloCovid:boolean;
  yaSubioTodasLasFotos:boolean = false;
  yaEnvioEncuesta:boolean = false;
  cantFotos:string="0 / 3";

  constructor(private camera:Camera, private db:FirestoreService, private toastCtrl:FuctionsService) { }

  ngOnInit() {
    this.cantFotos = "0 / 3";
    this.yaSubioTodasLasFotos = false;
    this.yaEnvioEncuesta = false;
  }

  SacarFoto(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 30
    }
    this.camera.getPicture(options)
    .then(imageData => {
        var imagenAux = `data:image/jpeg;base64,${imageData}`;
        this.AgregarImagen123(imagenAux);        
    });
  }

  AgregarImagen123(img){
    if (this.cantFotos == "0 / 3" && this.yaSubioTodasLasFotos == false){
      this.image1 == img;
      this.cantFotos = "1 / 3";
      return;
    }
    else if (this.cantFotos == "1 / 3" && this.yaSubioTodasLasFotos == false){
      this.image2 == img;
      this.cantFotos = "2 / 3";
      return;
    }
    else{
      this.image3 == img;
      this.cantFotos = "3 / 3";
      this.yaSubioTodasLasFotos = true;
      return;
    }
  }

  enviarEncuesta(){
    var rangoSatisfecho = (<HTMLIonRangeElement>document.getElementById("rango")).value;
    var protocoloCovid = (<HTMLIonRadioGroupElement>document.getElementById("grupo")).value == "true";
    var selectString = (<HTMLIonSelectElement>document.getElementById("select")).value;
    var mesaConSal = (<HTMLIonCheckboxElement>document.getElementById("chkSal")).checked;
    var mesaConEscarbadientes = (<HTMLIonCheckboxElement>document.getElementById("chkEscarbadientes")).checked;
    var mesaConServilletas = (<HTMLIonCheckboxElement>document.getElementById("chkServilletas")).checked;
    var mesaConAderezos = (<HTMLIonCheckboxElement>document.getElementById("chkAderezos")).checked;
    var clienteNombre = localStorage.getItem('userCatch')["nombre"];

    var json = {
      "cliente": clienteNombre,
      "rangoSatisfecho": rangoSatisfecho,
      "protocoloCovid": protocoloCovid,
      "select": selectString,
      "mesaConSal": mesaConSal,
      "mesaConEscarvadientes": mesaConEscarbadientes,
      "mesaConServilletas": mesaConServilletas,
      "mesaConAderezos": mesaConAderezos,
      "image1": this.image1,
      "image2": this.image2,
      "image3": this.image3
    }
    this.db.addData('encuestasCliente', json);
    this.toastCtrl.presentToast("Encuesta enviada con exito, Muchas gracias por tu opinion!!", 'success');
    setTimeout(() => {
      this.yaEnvioEncuesta = true;
    }, 2000);
  }

}
