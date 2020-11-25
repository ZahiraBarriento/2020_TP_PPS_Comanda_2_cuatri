import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss'],
})
export class ListaJuegosComponent implements OnInit {

  constructor(private modal : ModalController) { }

  ngOnInit() {}

  onClose(){
    this.modal.dismiss();
  }
}
