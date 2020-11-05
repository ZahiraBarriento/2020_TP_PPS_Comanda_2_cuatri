import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user;
  showView : boolean;
  perfil : string;

  constructor(
    private navCtrl:NavController,
    private router : Router) {
      this.user = localStorage.getItem('userCatch');
      this.user = JSON.parse(this.user)
      this.perfil = this.user.perfil;
      this.showView = false;
    }

  ngOnInit(): void {
  }

  //#region CLIENTE/ANONIMO
  onScan(){
    //Implementar lista de espera
  }

  onReservation(){
    if(this.perfil == 'anonimo'){

    }
    //Implementar reserva
  }  
  //#endregion

  //#region DUEÑO/SUPERVISOR
  action(param){
    switch(param){
      case 'mesa':
        this.router.navigateByUrl('/altas/mesa');
        break;
      case 'empleado':
        this.router.navigateByUrl('/altas/empleado');
        break;
      case 'duenio':
        this.router.navigateByUrl('/altas/duenio');
        break;
    }
  }
  //#endregion
}
