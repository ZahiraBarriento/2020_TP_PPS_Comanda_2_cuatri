import { Component } from '@angular/core';
import { NewsInterface } from '../model/newsInterface';
import { newsApi } from '../model/newsApi';
import { ModalController } from '@ionic/angular';
import { CustomPage } from '../pages/custom/custom.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tema = 'custom';
  dataTitulo = new Array();
  formaBoton: string;
  titulo: string;
  cabezera: string;
  contenidoGeneral: string;

  news: NewsInterface[] = [];

  constructor(public modalController: ModalController) {
    this.news = newsApi;
    if(localStorage.getItem('config')){
      this.dataTitulo = JSON.parse(localStorage.getItem('config')) ;
    }
    this.elegirTema(this.tema);
    
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: CustomPage,
    });

     await modal.present();

     const { data } = await modal.onDidDismiss();
     this.dataTitulo = data;

     if(localStorage.getItem('config')){
      this.dataTitulo = JSON.parse(localStorage.getItem('config')) ;

      if(this.dataTitulo[2].forma != ''){
        this.formaBoton = this.dataTitulo[2].forma;
       }
    }
     
     
    
     
    
  }


  


  elegirTema(tema: string){
    this.tema = tema;
    
    switch (tema) {
      case 'argentina':
        this.cabezera = 'cabeceraArg';
        this.contenidoGeneral = 'contenidoGeneralArg'
        break;
      case 'naif':
        this.cabezera = 'cabeceraNaif';
        this.contenidoGeneral = 'contenidoGeneralNaif';
        this.titulo = 'tituloNaif';
        break;  
      case 'profecional':
        this.cabezera = 'cabeceraProf';
        this.contenidoGeneral = 'contenidoGeneralProf'
        break;
      case 'custom':
        this.cabezera = 'cabeceraCust';
        this.contenidoGeneral = 'contenidoGeneralCust';
        this.titulo = 'tituloCust';

        if(localStorage.getItem('config')){
          this.dataTitulo = JSON.parse(localStorage.getItem('config')) ;
          if(this.dataTitulo[2].forma != ''){
            this.formaBoton = this.dataTitulo[2].forma;
           }
        }
          
        this.presentModal();
        break;  
      default:
        break;
    }
  }

}
