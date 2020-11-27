import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Pedido } from 'src/app/classes/pedido.class';

import { PedidoInterface } from 'src/app/models/pedido.interface';
import { ProductoInterface } from 'src/app/models/producto.interface';
import { DetalleInterface } from 'src/app/models/detalle.interface';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Usuario } from 'src/app/classes/usuario.class';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  usuario: UsuarioModel = new Usuario();
  ordenCompra: PedidoInterface[] = [];
  mesa: any;

  constructor(private fr: FirestoreService) {
    this.usuario = JSON.parse(localStorage.getItem('userCatch'));
    this.mesa = JSON.parse(localStorage.getItem('tableCurrent'));
  }

  ingresarPedido(ordenProductos: ProductoInterface[]) {
    return new Promise((resolve, reject) => {
      let pedidoCocinero: PedidoInterface;
      let pedidoBartender: PedidoInterface;
      this.ordenCompra = [];
      let importeTotal = 0;

      ordenProductos.forEach((producto) => {
        if (producto.tipo === 'plato') {
          if (!pedidoCocinero) {
            pedidoCocinero = new Pedido();
          }

          pedidoCocinero.cliente = `${this.usuario.nombre} ${this.usuario.apellido}`;
          pedidoCocinero.importe = importeTotal += Number(producto.precio);
          pedidoCocinero.idCliente = this.usuario.id;
          pedidoCocinero.estado = 'informar';
          pedidoCocinero.tipo = 'platos';
          pedidoCocinero.mesa = this.mesa.number;
          pedidoCocinero.para = 'cocina';
          pedidoCocinero.actived = true;
          pedidoCocinero.productos.push(producto);
        }
        if (producto.tipo === 'bebida') {
          if (!pedidoBartender) {
            pedidoBartender = new Pedido();
          }

          pedidoBartender.cliente = `${this.usuario.nombre} ${this.usuario.apellido}`;
          pedidoBartender.importe = importeTotal += Number(producto.precio);
          pedidoBartender.mesa = this.mesa.number;
          pedidoBartender.idCliente = this.usuario.id;
          pedidoBartender.estado = 'informar';
          pedidoBartender.tipo = 'bebidas';
          pedidoBartender.para = 'bartender';
          pedidoBartender.actived = true;
          pedidoBartender.productos.push(producto);
        }
      });

      if (pedidoCocinero) {
        this.ordenCompra.push(pedidoCocinero);
      }
      if (pedidoBartender) {
        this.ordenCompra.push(pedidoBartender);
      }
      if (this.ordenCompra.length > 0) {
        let productos: ProductoInterface[] = [];

        let jsonOrden = new Object();

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.ordenCompra.length; i++) {
          jsonOrden = {};

          let total = 0;

          jsonOrden['cliente'] = this.ordenCompra[i].cliente;
          jsonOrden['para'] = this.ordenCompra[i].para;
          jsonOrden['mesa'] = this.ordenCompra[i].mesa;
          jsonOrden['tipo'] = this.ordenCompra[i].tipo;
          productos = [];

          this.ordenCompra[i].productos.forEach((producto) => {
            const jsonProducto = new Object();
            (jsonProducto['nombre'] = producto.nombre),
              (jsonProducto['timeElavoracion'] = producto.timeElaboracion),
              (jsonProducto['cantidad'] = producto.cantidad);
            jsonProducto['precio'] = producto.precio;
            productos.push(jsonProducto);
            total += Number(producto.precio) * producto.cantidad;
          });

          jsonOrden['productos'] = productos;
          jsonOrden['importe'] = total;
          jsonOrden['idCliente'] = this.ordenCompra[i].idCliente;
          jsonOrden['estado'] = this.ordenCompra[i].estado;
          jsonOrden['actived'] = this.ordenCompra[i].actived;

          this.fr.addData('pedidos', jsonOrden); // !!!!!!!!!!!!! ACA FALTARIA UNA PROMESA PARA CONFIRMAR QUE SE CARGO AL FIRESTORE
          resolve(true);
        }
      }
    });
  }

  traerPedidos() {
    return new Promise((resolve, reject) => {
      let pedidos: PedidoInterface[] = [];

      this.fr.getDataAll('pedidos').subscribe((doc) => {
        pedidos = [];
        doc.forEach((ped) => {
          const pedido: PedidoInterface = ped.payload.doc.data() as PedidoInterface;
          pedido.id = ped.payload.doc.id;
          pedidos.push(pedido);
        });

        resolve(pedidos);
      });
    });
  }


  notificarComanda(pedido: PedidoInterface, json: object){

    return new Promise( (resolve, reject) => {
      this.fr.updateData('pedidos', pedido.id, json);
      resolve(true);
    });
  }

  detallePedidos(cliente: string): Promise<any>{
    return new Promise((resolve) => {
    // pedidos realizados con precio unitario y su respectivo importe
    // grado de satisfaccion (propina)
    // total a abonar
    const todosLosPedidos: PedidoInterface[] = [];
    let pedidosDelCliente: PedidoInterface[] = [];


    this.fr.getDataAll('pedidos').subscribe(doc => {
        doc.forEach(ped => {
          const pedido: PedidoInterface = (ped.payload.doc.data() as PedidoInterface);
          pedido.id = ped.payload.doc.id;
          todosLosPedidos.push(pedido);
        });

        pedidosDelCliente = this.filtrarPedidosPorCliente(todosLosPedidos, cliente);

        let detalleCompleto: DetalleInterface[] = [];
        // Armo el detalle
        pedidosDelCliente.forEach(ped => {

          ped.productos.forEach(prod => {
            let detalle = new Object() as DetalleInterface;

            detalle.descripcion = prod.nombre;
            detalle.cantidad = prod.cantidad;
            detalle.precioUnitario = prod.precio;
            detalle.importe = prod.cantidad * prod.precio;
            detalle.pedidoId = ped.id;
            detalle.estado = ped.estado;
            detalleCompleto.push(detalle);
          });

        });
        resolve(detalleCompleto);
      });
    });

  }

  filtrarPedidosPorCliente(pedidos, cliente){
    const pedidosDelCliente: PedidoInterface[] = [];

    pedidos.forEach(ped => {
      let pedAux = ped as PedidoInterface;
      if (pedAux.cliente == cliente && pedAux.actived) {
        pedidosDelCliente.push(pedAux);
      }
    });
    return pedidosDelCliente;
  }

}


