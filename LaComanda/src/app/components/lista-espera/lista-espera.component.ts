import { Component, OnInit } from '@angular/core';
import { runInThisContext } from 'vm';
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
            this.filtrarSegunClienteSentado();
          }
        }
      });

      if(this.clients.length > 0)
        this.showUser = true;
      else
        this.showUser = false;
    });
  }

  filtrarSegunClienteSentado(){
    var idClientesSentados = [];
    var allMesas = [];
    var newListClients = [];
    this.firestore.getDataAll('mesa').subscribe(data => {
      data.map(item => {
        const data = item.payload.doc.data();
        allMesas.push(data);
      });

      //lleno array de clientes sentados
      allMesas.forEach(element => {
        if (element["cliente"] != "")
          idClientesSentados.push(element["cliente"]);
      });

      //filtro this.clients
      this.clients.array.forEach(client => {
        var encontro = false;
        idClientesSentados.forEach(idClienteSentado => {
          if (idClienteSentado == client["id"])
            encontro = true;
        });
        if (!encontro)
          newListClients.push(client);
      });

      //esto es por las dudas, si firestore no se rompe no deberia entrar aca
      if (this.clients.length != newListClients.length){
        this.resetClientes();
        this.clients = newListClients;
      }
      
      console.log(this.clients);
    });
  }

  resetClientes(){
    this.clients.splice(0, this.clients.length);
    this.allClients.splice(0, this.allClients.length);
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
