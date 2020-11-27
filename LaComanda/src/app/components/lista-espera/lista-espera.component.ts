import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { FuctionsService } from '../../services/fuctions.service';
import { ListaMesasComponent } from '../lista-mesas/lista-mesas.component';


@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.component.html',
  styleUrls: ['./lista-espera.component.scss'],
})
export class ListaEsperaComponent implements OnInit {

  clients: any = [];
  showUser: boolean = true;
  allClients = [];

  constructor(
    private firestore: FirestoreService,
    private modalController: FuctionsService) { }

    //ARREGLAR CODIGO
  ngOnInit() {
    this.getClients();
  }

  getClients(){
    this.firestore.getDataAll('usuarios').subscribe(data => {
      var count = 0;
      if (count == 0)
        this.resetClientes();

      data.map(item => {
        const data = item.payload.doc.data();
        const id = item.payload.doc.id;
        this.allClients.push(data);
        this.allClients[count].uid = id;
        count++;
      });
      this.clients = [];
      this.allClients.forEach(element => {
        if (element.perfil == 'anonimo' || element.perfil == 'cliente') {
          if (element.listaEspera) {
            this.clients.push(element);
            console.log(this.clients)
          }
        }
      });

      if(this.clients.length > 0)
        this.showUser = true;
      else
        this.showUser = false;
    });
  }

  resetClientes(){
    this.clients.splice(0, this.clients.length);
    this.allClients.splice(0, this.allClients.length);
    console.log(this.clients);
    console.log(this.allClients)
  }

  chooseTable(client) {
    this.modalController.openModal(ListaMesasComponent, 'my-custom-modal-css', client);
  }

  modificar(cliente){
    const json = {
      listaEspera:false
    }

    
    this.firestore.updateData('usuarios', cliente.uid, json);
  }
}
