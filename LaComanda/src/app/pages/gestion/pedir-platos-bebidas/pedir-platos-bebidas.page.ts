import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductoInterface } from 'src/app/models/producto.interface';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { PedidosService } from 'src/app/services/coleccion/pedidos.service';

import { ProductosService } from 'src/app/services/coleccion/productos.service';
import { FuctionsService } from 'src/app/services/fuctions.service';
import { ToastService } from 'src/app/services/toast.service';

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
  ordenProductos: ProductoInterface[] = [];


  constructor(private prodService: ProductosService,
              private pedidoService: PedidosService,
              private router: Router,
              private toast: FuctionsService) {

    this.usuario = JSON.parse(localStorage.getItem('userCatch')) as UsuarioModel;
    this.traerPlatos();

    this.verificarAcceso('cliente', 'mozo')
      .then( res => {
      })
      .catch( rej => {
         console.log('Usuario no tiene Acceso. Sera redireccionado....');
         this.router.navigateByUrl('/login');
      });
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

    this.asignarColorCantidad(index, cantNum);

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

    this.asignarColorCantidad(index, cantNum);

  }

  //#endregion


//#region Ingresar y Quitar Orden de Pedido
  ingresarProducto(producto: ProductoInterface){

    const pos = this.ordenProductos.indexOf(producto);

    if (pos === -1){
      producto.cantidad = 1;
      this.ordenProductos.push(producto);
    } else {
      this.ordenProductos[pos].cantidad += 1;
    }
    console.log('Inserto producto: ');
    console.log(this.ordenProductos);
  }

  quitarProducto(producto: ProductoInterface){
    // Obtengo posicion
     const pos = this.ordenProductos.indexOf(producto);

    // Si existe elemento
     if (pos >= 0){
      this.ordenProductos[pos].cantidad -= 1;

      // Si la cantidad del producto es 0 lo quito de la orden
      if (this.ordenProductos[pos].cantidad === 0){
        // Quito en una posicion dada
        this.ordenProductos.splice(pos, 1);
      }
     }
     console.log('Quito producto: ');
     console.log(this.ordenProductos);
  }

//#endregion


confirmarPedido(){

  this.pedidoService.ingresarPedido(this.ordenProductos)
    .then( res => {
         this.limpiarCantidad();
         this.toast.presentToast('Su pedido ha sido solicutado, aguarde a ser aprobado.', 'success');
         this.ordenProductos = [];
         this.importeTotal = 0;
    });
}


verificarAcceso( ...usuario ){
  const usuariosAcces = [...usuario];
  let access = false;
  return new Promise( (resolve, reject) => {

    for (let i = 0; i < usuariosAcces.length; i++){

      if (usuariosAcces[i] === this.usuario.perfil.toString()){
        access = true;
        i = usuariosAcces.length;
      }
    }

    access ? resolve(access) : reject(access);
  });
}


//#region Funciones visuales

limpiarCantidad(){
  const input = document.getElementsByTagName('input');
  for (let i = 0; i < input.length; i++){
    input.namedItem(`${i}`).value = '0';
  }
}


asignarColorCantidad(id, cantNum){

  const platoCantHtml = (document.getElementById(`platoCant${id}`) as HTMLInputElement);

  if (cantNum > 0){
    platoCantHtml.className =  'contPush';
  }
  if (cantNum === 0){
    platoCantHtml.className =  'platoBoton';
    console.log('Se pone en 0');
  }

}
//#endregion


}
