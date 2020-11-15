import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private fr: FirestoreService) { }


  /* ingresarPedido(){

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

  if (pedidoCocinero){
    this.pedidoFinal.push(pedidoCocinero);
   }
  if (pedidoBartender){
    this.pedidoFinal.push(pedidoBartender);
  }
  if (this.pedidoFinal.length > 0) {

    const input = document.getElementsByTagName('input');
    for (let i = 0, max = input.length; i < max; i++) {
      input[i].value = '0';
    }
  }


    let json : PedidoInterface  ;= {
      nombre : '',
      para : '',
      estado : '',
      importe : '',
      producto: [],
      mesa: 2, // VER DESPUES
      };  

    let prodJson: ProductoInterface;

    this.pedidoFinal.forEach( item => {


      json : {
      nombre
      json.cliente: item.cliente,
      json.para = item.para,
      json.estado = item.estado,
      json.importe = item.importe.toString(),

     },
      item.productos.forEach(producto => {

        prodJson = {},
        prodJson = {
        cantidad: producto.cantidad,
        foto1: producto.foto1,
        timeElaboracion: producto.timeElaboracion,
        
        }
       
        let nomPro = new Object();
        nomPro[producto.nombre.toString()] = prodJson;
        json.producto.push(nomPro);
         
      });

      this.fr.addData('pedidos', json);
    });

    this.pedidoFinal = new Array() as PedidoInterface[];
    this.importeTotal = 0;
 
  }
 */

}
