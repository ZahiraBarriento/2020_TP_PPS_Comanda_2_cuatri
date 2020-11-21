import { Injectable } from "@angular/core";
import { FirestoreService } from "../firestore.service";
import { Pedido } from "src/app/classes/pedido.class";

import { PedidoInterface } from "src/app/models/pedido.interface";
import { ProductoInterface } from "src/app/models/producto.interface";
import { UsuarioModel } from "src/app/models/usuario.model";
import { Usuario } from "src/app/classes/usuario.class";
import { table } from "console";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PedidosService {
  usuario: UsuarioModel = new Usuario();
  ordenCompra: PedidoInterface[] = [];

  constructor(private fr: FirestoreService) {
    this.usuario = JSON.parse(localStorage.getItem("userCatch"));
  }

  ingresarPedido(ordenProductos: ProductoInterface[]) {
    return new Promise((resolve, reject) => {
      let pedidoCocinero: PedidoInterface;
      let pedidoBartender: PedidoInterface;
      this.ordenCompra = [];
      let importeTotal = 0;

      ordenProductos.forEach((producto) => {
        if (producto.tipo === "plato") {
          if (!pedidoCocinero) {
            pedidoCocinero = new Pedido();
          }

          pedidoCocinero.cliente = `${this.usuario.nombre} ${this.usuario.apellido}`;
          pedidoCocinero.importe = importeTotal += Number(producto.precio);
          pedidoCocinero.estado = "informar";
          pedidoCocinero.tipo = "platos";
          pedidoCocinero.para = "cocina";
          pedidoCocinero.actived = true;
          pedidoCocinero.productos.push(producto);
        }
        if (producto.tipo === "bebida") {
          if (!pedidoBartender) {
            pedidoBartender = new Pedido();
          }

          pedidoBartender.cliente = `${this.usuario.nombre} ${this.usuario.apellido}`;
          pedidoBartender.importe = importeTotal += Number(producto.precio);
          pedidoBartender.estado = "informar";
          pedidoBartender.tipo = "bebidas";
          pedidoBartender.para = "bartender";
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

          jsonOrden["cliente"] = this.ordenCompra[i].cliente;
          jsonOrden["para"] = this.ordenCompra[i].para;
          jsonOrden["tipo"] = this.ordenCompra[i].tipo;
          productos = [];

          this.ordenCompra[i].productos.forEach((producto) => {
            let jsonProducto = new Object();
            (jsonProducto["nombre"] = producto.nombre),
              (jsonProducto["timeElavoracion"] = producto.timeElaboracion),
              (jsonProducto["cantidad"] = producto.cantidad);
            jsonProducto["precio"] = producto.precio;
            productos.push(jsonProducto);
            total += Number(producto.precio) * producto.cantidad;
          });

          jsonOrden["productos"] = productos;
          jsonOrden["importe"] = total;
          jsonOrden["estado"] = this.ordenCompra[i].estado;
          jsonOrden["actived"] = this.ordenCompra[i].actived;

          this.fr.addData("pedidos", jsonOrden); // !!!!!!!!!!!!! ACA FALTARIA UNA PROMESA PARA CONFIRMAR QUE SE CARGO AL FIRESTORE
          resolve(true);
        }
      }
    });
  }

  traerPedidos() {
    return new Promise((resolve, reject) => {
      let pedidos: PedidoInterface[] = [];

      this.fr.getDataAll("pedidos").subscribe((doc) => {
        pedidos = [];
        doc.forEach((ped) => {
          let pedido: PedidoInterface = ped.payload.doc.data() as PedidoInterface;
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
    })
  }

  detallePedidos(cliente:string):Promise<any>{
    return new Promise((resolve) => {
    //pedidos realizados con precio unitario y su respectivo importe
    //grado de satisfaccion (propina)
    // total a abonar
    let todosLosPedidos: PedidoInterface[] = [];
    let pedidosDelCliente: PedidoInterface[] = [];

    
      this.fr.getDataAll('pedidos').subscribe(doc => {
        doc.forEach(ped => {
          let pedido: PedidoInterface = (ped.payload.doc.data() as PedidoInterface);
          pedido.id = ped.payload.doc.id;
          todosLosPedidos.push(pedido);
        });
  
        pedidosDelCliente = this.filtrarPedidosPorCliente(todosLosPedidos, cliente);
  
        var detalleCompleto = [];
        //Armo el detalle
        pedidosDelCliente.forEach(ped => {
          
          ped.productos.forEach(prod => {
            var detalle = {'descripcion': "", 'cantidad': 0, 'precioUnitario': 0, 'importe': 0, 'satisf': 0, 'total': 0};
  
            detalle["descripcion"] = prod.nombre;
            detalle["cantidad"] = prod.cantidad;
            detalle["precioUnitario"] = prod.precio;
            detalle["importe"] = prod.cantidad * prod.precio;
            detalle["pedidoId"] = ped.id;
            detalleCompleto.push(detalle);
          });
          
        });
        resolve(detalleCompleto);
      });
    });
    
  }

  filtrarPedidosPorCliente(pedidos, cliente){
    let pedidosDelCliente: PedidoInterface[] = [];

    pedidos.forEach(ped => {
      var pedAux = ped as PedidoInterface;
      if (pedAux.cliente == cliente && pedAux.estado == "entregado" && pedAux.actived)
        pedidosDelCliente.push(pedAux);
    });
    return pedidosDelCliente;
  }

}


