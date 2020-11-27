import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Pedido } from 'src/app/classes/pedido.class';
import { Usuario } from 'src/app/classes/usuario.class';
import { ChatConsultaComponent } from 'src/app/components/chat-consulta/chat-consulta.component';
import { ListaJuegosComponent } from 'src/app/components/lista-juegos/lista-juegos.component';
import { PedidoInterface } from 'src/app/models/pedido.interface';
import { PedidosService } from 'src/app/services/coleccion/pedidos.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FuctionsService } from 'src/app/services/fuctions.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

  todo: any = [];
  bebidas: any = [];
  platos: any = [];
  table: any;
  user: UsuarioModel;
  mensajes: any = [];
  pedidos: PedidoInterface[];
  pedidoEspera: PedidoInterface[];

  constructor(
    private modalCtrl: FuctionsService,
    private afs: FirestoreService,
    private router: Router,
    private pedidosService: PedidosService,
    private alert: AlertController) {

    this.user = new Usuario();
    this.pedidoEspera = [];
    this.pedidos = [];

    this.table = JSON.parse(localStorage.getItem('tableCurrent'));
    this.user = JSON.parse(localStorage.getItem('userCatch')) as UsuarioModel;

    this.traerPedidosInit();
    this.consultaUsuario();
  }

  ngOnInit() {
    this.afs.getDataAll('productos').subscribe(element => {
      element.map(item => {
        const data = item.payload.doc.data();
        this.todo.push(data);
      });

      this.todo.forEach(element => {
        if (element.tipo == 'bebida') {
          this.bebidas.push(element);
        } else if (element.tipo == 'plato') {
          this.platos.push(element);
        }
      });
    });
  }

  openChat() {
    this.modalCtrl.openModal(ChatConsultaComponent, 'common', this.table);
  }

  pedirComanda() {
    this.router.navigateByUrl('/pedir-platos-bebidas');
  }

  pedirCuenta() {
    this.router.navigateByUrl('/pedir-cuenta');
  }

  juegos(){
    this.modalCtrl.openModal(ListaJuegosComponent, 'common', this.table);
  }

  consultaUsuario() {
    let json = {
      number: this.table.number,
      messages: '',
      id : this.user.id
    };

    this.traerConsultas().then((res: boolean) => {
      console.log(res);
      if (res != true) {
        this.afs.addDataId('chat', json, this.user.id);
      }
    });
  }


  traerPedidosInit(){
    this.pedidosService.traerPedidos()
    .then( (res: PedidoInterface[]) => {
      this.pedidos = res;

      this.pedidos.forEach( pedido => {
        if (pedido.idCliente == this.user.id && pedido.actived && pedido.estado != 'entregado'){
          this.pedidoEspera.push(pedido);
        }
      });
      console.log(this.pedidoEspera);
    });
  }

  async estadoPedido(){
    let mensaje = '';

    this.pedidoEspera.forEach( pedido => {

      switch (pedido.estado) {
        case 'informar':
          mensaje += `<p><strong>.Ticket Nº ${pedido.id} </strong> </p> Pendiente <br>`;
          break;
        case 'prepararB':
          mensaje += `<p><strong>.Ticket Nº ${pedido.id} </strong> </p> Trago en preparacion<br>` ;
          break;
        case 'prepararC':
          mensaje += `<p><strong>.Ticket Nº ${pedido.id} </strong> </p> Comida en preparacion<br>`;
          break;
        case 'preparado':
          mensaje += `<p><strong>.Ticket Nº ${pedido.id} </strong> </p> Listo para ser entregado` ;
          break;
        default:
          break;
      }

    });

    const alert = await this.alert.create({
        header: 'Estado del pedido',
        message: mensaje,
        buttons: ['Continuar'],
        cssClass: 'alertDanger'
      });

    await alert.present();

  }

  traerConsultas() {
    return new Promise((resolve, reject) => {
      this.afs.getDataAll('chat').subscribe((item) => {
        if (item.length > 0){
          item.map(element => {
            const doc: any = element.payload.doc.data();
            doc.id = element.payload.doc.id;
            this.mensajes.push(doc);

            this.mensajes.forEach(element => {
              console.log('asd');
              if (element.id === this.user.id) {
                resolve(true);
              }
            });
          });
        }else{
          resolve(false);
        }
      });
    });
  }
}
