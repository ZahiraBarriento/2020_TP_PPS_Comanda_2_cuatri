import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Pedido } from 'src/app/classes/pedido.class';
import { Producto } from 'src/app/classes/producto';

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



//#region TraerProductos. Funcion reutilizable

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
    const platoCantHtml = (document.getElementById(`platoCant${index}`) as HTMLInputElement);
    let cantNum = Number(cantHtml.value);
     

    if (cantNum >= 0 && cantNum < 10){
      cantNum++;
      cantHtml.value = cantNum.toString();
      this.importeTotal = Number(producto.precio) + this.importeTotal;
      this.ingresarProducto(producto);
    }

    if(cantNum > 0){
      platoCantHtml.className =  'alert';
    }
    
    if(cantNum == 0){
      platoCantHtml.className =  'platoBoton';
    }
    

  }

  //#endregion



//#region Ingresar y Quitar Orden de Pedido
  ingresarProducto(producto: ProductoInterface){

    const pos = this.ordenPedido.indexOf(producto);

    if (pos === -1){
      producto.cantidad = 1;
      this.ordenPedido.push(producto);
    } else {
      this.ordenPedido[pos].cantidad += 1;
    }
    console.log('Inserto producto: ');
    console.log(this.ordenPedido);
  }

  quitarProducto(producto: ProductoInterface){
    // Obtengo posicion
     const pos = this.ordenPedido.indexOf(producto);

    // Si existe elemento
     if (pos >= 0){
      this.ordenPedido[pos].cantidad -= 1;

      // Si la cantidad del producto es 0 lo quito de la orden
      if (this.ordenPedido[pos].cantidad === 0){
        // Quito en una posicion dada
        this.ordenPedido.splice(pos, 1);
      }
     }
     console.log('Quito producto: ');
     console.log(this.ordenPedido);
  }

//#endregion


confirmarPedido(){

  console.log(this.ordenPedido);

}

}
