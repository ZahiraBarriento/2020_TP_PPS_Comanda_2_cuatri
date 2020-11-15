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
  showView: boolean = false;
  allClients = [];

  constructor(
    private firestore: FirestoreService,
    private modalController: FuctionsService) { }

    //ARREGLAR CODIGO
  ngOnInit() {
    
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
          }
        }
      });
    });
    
  }

  resetClientes(){
    this.clients.splice(0, this.clients.length);
    this.allClients.splice(0, this.allClients.length);
  }

  chooseTable(client) {
    this.modalController.openModal(ListaMesasComponent, 'my-custom-modal-css', client);
  }
}
