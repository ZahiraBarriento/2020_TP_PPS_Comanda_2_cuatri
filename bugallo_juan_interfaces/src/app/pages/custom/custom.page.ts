import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements OnInit {


  fontFamily: any[] = [];
  colors: any[] = [];

  imagen = {
    header: '',
    fondo: '',
  };

  titulo = {
    font_size : '',
    font_family : '',
    color : ''
  };

  descripcion = {
    font_size : '',
    font_family : '',
    color : ''
  };

  botones = {
    font_size : '',
    border: '',
    color : '',
    border_color: '',
    forma: '',
  };




  dataHtml = [this.titulo, this.descripcion, this.botones, this.imagen];




  constructor(public modalController: ModalController, private imagePicker: ImagePicker) {

    this.fontFamily =  ['Verdana', 'Geneva', 'Tahoma', 'sans-serif'];
    this.colors = ['red', 'blue', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'];

    if (JSON.parse(localStorage.getItem('titulo'))){
      this.titulo = JSON.parse(localStorage.getItem('titulo'));
    }
    if (JSON.parse(localStorage.getItem('titulo'))){
      this.botones = JSON.parse(localStorage.getItem('botones'));
    }
    if (JSON.parse(localStorage.getItem('titulo'))){
      this.descripcion = JSON.parse(localStorage.getItem('descripcion'));
    }

  }


  cargarFoto(objeto: string){

    const options: ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1,
    };



    this.imagePicker.getPictures(options).then((results) => {

      let img;

      for (let i = 0; i < results.length; i++) {
         img = 'data:image/jpeg;base64' + results[i];
      }

      if (objeto == 'header'){
        this.imagen.header = img;
      }else{
        this.imagen.fondo = 'imagenCustom';
      }
    }, (err) => { });


  }



  closeModal(estado: boolean){

    if (estado){
      this.dataHtml = [this.titulo, this.descripcion, this.botones, this.imagen];
      localStorage.setItem('titulo', JSON.stringify(this.titulo));
      localStorage.setItem('botones', JSON.stringify(this.botones));
      localStorage.setItem('descripcion', JSON.stringify(this.descripcion));
      localStorage.setItem('config', JSON.stringify(this.dataHtml));

      this.modalController.dismiss(this.dataHtml);
    }
    if (!estado){
      this.modalController.dismiss();
    }
  }

  ngOnInit() {
  }

}
