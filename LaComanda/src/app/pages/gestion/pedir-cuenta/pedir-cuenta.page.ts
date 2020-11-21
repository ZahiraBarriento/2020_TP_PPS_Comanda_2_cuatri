import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/coleccion/pedidos.service';
import { FirestoreService } from '../../../services/firestore.service';
import { LoaderService } from '../../../services/loader.service';
import { ToastService } from '../../../services/toast.service';
import { QrService } from '../../../services/qr.service'
import { Router } from '@angular/router';
import { DetalleInterface } from 'src/app/models/detalle.interface';

@Component({
  selector: 'app-pedir-cuenta',
  templateUrl: './pedir-cuenta.page.html',
  styleUrls: ['./pedir-cuenta.page.scss'],
})
export class PedirCuentaPage implements OnInit {
  pedidosDelCliente:Array<DetalleInterface>;
  pedidosEntregados:Array<DetalleInterface>;
  pedidosNoEntregados:Array<DetalleInterface>;
  total = 0;
  yaPago = false;
  propina = 0;

  constructor(private pedidosService:PedidosService, 
    private db:FirestoreService, 
    private toast:ToastService, 
    private loader:LoaderService, 
    private router:Router,
    private qr:QrService) { }

  ngOnInit() {
    //this.qr.qrPropina().then((json) => {
      this.propina = 20;
      var user = JSON.parse(localStorage.getItem('userCatch'));
      var cliente = user["nombre"] + " " + user["apellido"];
      this.pedidosService.detallePedidos(cliente).then((pedidos) => {        
        this.pedidosDelCliente = pedidos;
        this.filtrarPorEntregado();
        this.calcularTotal();
      });
    //});    
  }

  filtrarPorEntregado(){
    this.pedidosDelCliente.forEach(ped => {
      if (ped.estado == "entregado")
        this.pedidosEntregados.push(ped);
      else
        this.pedidosNoEntregados.push(ped);
    });
  }

  calcularTotal(){
    this.pedidosEntregados.forEach(ped => {
      this.total += ped.importe;
    });
    this.propina = this.total / (100 / this.propina);
    this.total += this.propina;
  }

  pagar(){
    this.loader.showLoader();
    
    setTimeout(() => {
      //desactivo y completo los pedidos entregados
      this.pedidosEntregados.forEach(item => {
      this.db.updateData('pedidos', item.pedidoId, {"estado":"completado", "actived":false});
      });

      //desactivo y cancelo los pedidos no entregados
      this.pedidosNoEntregados.forEach(item => {
        this.db.updateData('pedidos', item.pedidoId, {"estado":"cancelado", "actived":false});
      });

      this.yaPago = true;
      this.toast.MostrarMensaje("Pago realizado con exito!", false);
      setTimeout(() => {
        this.router.navigateByUrl('home');
      }, 2000);
    }, 2000);
    
  }

}
