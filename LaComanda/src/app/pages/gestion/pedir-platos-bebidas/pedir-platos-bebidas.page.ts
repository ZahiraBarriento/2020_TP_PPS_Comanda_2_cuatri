import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { table } from 'console';

import { Pedido } from 'src/app/classes/pedido.class';

import { PedidoInterface } from 'src/app/models/pedido.interface';
import { ProductoInterface } from 'src/app/models/producto.interface';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { ProductosService } from 'src/app/services/coleccion/productos.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-pedir-platos-bebidas',
  templateUrl: './pedir-platos-bebidas.page.html',
  styleUrls: ['./pedir-platos-bebidas.page.scss'],
})
export class PedirPlatosBebidasPage implements OnInit {

  cantComenzales = 0;
  cantProd = 0;
  usuario: UsuarioModel;


  importeTotal = 0;
  productos: ProductoInterface[] = [];
  ordenPedido: ProductoInterface[] = [];
  pedidoFinal: PedidoInterface[] = [];

  constructor(public alertController: AlertController,
              private router: Router,
              private prodService: ProductosService,
              private fr: FirestoreService,
              ) {

    this.usuario = JSON.parse(localStorage.getItem('userCatch')) as UsuarioModel;
    this.traerPlatos();
  }

  ngOnInit() {
  }



//#region TraerProductos

  traerPlatos(){
    this.prodService.traerPlatos()
        .then( res => {
          this.productos = (res as ProductoInterface[]);

        });
  }

//#endregion


//#region  Boton Incrementar y Decrementar Cantidad

  descr(index, producto: ProductoInterface){
    const cantHtml = (document.getElementById(index) as HTMLInputElement);
    let cantNum = Number(cantHtml.value);

    if (cantNum >= 1 && this.importeTotal > 0){
      cantNum--;
      cantHtml.value = cantNum.toString();
      this.importeTotal =  this.importeTotal - Number(producto.precio) ;
      this.quitarProducto(producto);
    }
  }

  incr(index, producto: ProductoInterface){
    const cantHtml = (document.getElementById(index) as HTMLInputElement);
    let cantNum = Number(cantHtml.value);


    if (cantNum >= 0 && cantNum < 10){
      cantNum++;
      cantHtml.value = cantNum.toString();
      this.importeTotal = Number(producto.precio) + this.importeTotal;
      this.ingresarProducto(producto);
    }

  }

  //#endregion



//#region Ingresar y Quitar Orden de Pedido
  ingresarProducto(producto: ProductoInterface){

    const pos = this.ordenPedido.indexOf(producto);

    if (pos == -1){
      producto.cantidad = 1;
      this.ordenPedido.push(producto);
    } else {
      this.ordenPedido[pos].cantidad += 1;
    }


    console.log(this.ordenPedido);
  }

  quitarProducto(producto: ProductoInterface){
    // Obtengo posicion
     const pos = this.ordenPedido.indexOf(producto);

    // Si existe elemento
     if (pos >= 0){
      this.ordenPedido[pos].cantidad -= 1;

      // Si la cantidad del producto es 0 lo quito de la orden
      if (this.ordenPedido[pos].cantidad == 0){
        // Quito en una posicion dada
        this.ordenPedido.splice(pos, 1);
      }
     }
     console.log(this.ordenPedido);
  }

//#endregion


confirmarPedido(){

  let pedidoCocinero: PedidoInterface;
  let pedidoBartender: PedidoInterface;

  this.ordenPedido.forEach( producto => {

    if (producto.tipo === 'plato') {

      if ( !pedidoCocinero){
        pedidoCocinero = new Pedido();
        console.log('Coc vacio');
      }

      pedidoCocinero.cliente = `${this.usuario.nombre} ${this.usuario.apellido}`;
      pedidoCocinero.importe = this.importeTotal;
      pedidoCocinero.estado = 'aprobar';
      pedidoCocinero.para = 'cocinero';
      pedidoCocinero.productos.push(producto);
    }
    if (producto.tipo === 'bebida') {

      if ( !pedidoBartender){
        pedidoBartender = new Pedido();
        console.log('Bar vacio');
      }

      pedidoBartender.cliente = `${this.usuario.nombre} ${this.usuario.apellido}`;
      pedidoBartender.importe = this.importeTotal;
      pedidoBartender.estado = 'aprobar';
      pedidoBartender.para = 'bartender';
      pedidoBartender.productos.push(producto);

    }
  });

  if ( pedidoCocinero){
    this.pedidoFinal.push(pedidoCocinero);
   }
  if ( pedidoBartender){
    this.pedidoFinal.push(pedidoBartender);
  }
  if ( this.pedidoFinal.length > 0) {

    const json = {
      nombre : '',
      para : '',
      estado : '',
      importe : '',
      producto: [] ,
      };


    this.pedidoFinal.forEach( item => {


      json.nombre = item.cliente,
      json.para = item.para,
      json.estado = item.estado,
      json.importe = item.importe.toString(),
      item.productos.forEach(producto => {
        json.producto.push(producto.nombre);
      });

      this.fr.addData('pedidos', json);
    });

    this.pedidoFinal = new Array() as PedidoInterface[];
    this.importeTotal = 0;
    // tslint:disable-next-line: forin

    const input = document.getElementsByTagName('input');
    for (let i = 0, max = input.length; i < max; i++) {
      input[i].value = '0';
      console.log(input[i]);
    } 
  }

}


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'Realizar',
      header: 'Pedir Platos y Bebidas',
      backdropDismiss: false,
      message: 'Ingrese cantidad de comenzales',
      inputs: [
        {
          name: 'cantC',
          type: 'text',
          placeholder: 'Ingrese aqui...',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('/home');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    alert.present();

}
}
