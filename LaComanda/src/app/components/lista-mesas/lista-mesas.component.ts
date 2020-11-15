import { Component, Input, OnInit } from '@angular/core';
import { AlertController, NavParams } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { FuctionsService } from '../../services/fuctions.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.scss'],
})
export class ListaMesasComponent implements OnInit {

  allTables : any = [];
  tables : any = [];
  data : any;
  client; 

  constructor(
    private firestore : FirestoreService, 
    private modalController : FuctionsService,
    public navParams: NavParams,
    private alertController: AlertController,
    private loader:LoaderService) {
      this.client = navParams.get('data');//obtengo el usuario para asignar mesa
    }

  ngOnInit() {
    var count = 0;
    this.firestore.getDataAll('mesa').subscribe(data => {

      data.map(item => {
        const data = item.payload.doc.data();
        const id = item.payload.doc.id;
        this.allTables.push(data);
        this.allTables[count].id = id;
        count ++;
        //es un asco esto pero por ahora lo dejo asi
      })
      
      this.allTables.forEach(element => {
        if(!element.status){
          this.tables.push(element);
        }
      });
    });
  }

  chooseTable(table){
    this.presentAlert('', '¿Desea asignar al cliente ' + this.client.nombre + ' ' + this.client.apellido + ' a la mesa ' + table.number + '?', table);
  }

  close(){
    this.modalController.dismissModal();
  }

  //PASAR A UN SERVICIO
  async presentAlert(header : string, message : string, table) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        handler : () => {
          this.firestore.updateData('mesa', table.id, {status:true, client: this.client.id})
          this.firestore.updateData('usuarios', this.client.uid, {listaEspera:false});
          this.loader.showLoader();
          setTimeout(() => {
            this.close();  
          }, 2000);          
        }
      },
      {
        text: 'Cancelar'
      }]
    });

    await alert.present();
  }
}
