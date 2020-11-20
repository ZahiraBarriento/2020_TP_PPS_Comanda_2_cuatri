import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/coleccion/pedidos.service';
import { FirestoreService } from '../../../services/firestore.service';
import { LoaderService } from '../../../services/loader.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedir-cuenta',
  templateUrl: './pedir-cuenta.page.html',
  styleUrls: ['./pedir-cuenta.page.scss'],
})
export class PedirCuentaPage implements OnInit {
  detallesCompletos:Array<any>;
  total = 0;
  yaPago = false;

  constructor(private pedidosService:PedidosService, private db:FirestoreService, private toast:ToastService, private loader:LoaderService, private router:Router) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('userCatch'));
    var cliente = user["nombre"] + " " + user["apellido"];
    this.pedidosService.detallePedidos(cliente).then((detalles) => {
      this.detallesCompletos = detalles;
      this.calcularTotal();
    });
    
  }

  calcularTotal(){
    this.detallesCompletos.forEach(detalle => {
      this.total += detalle["importe"];
    });
  }

  pagar(){
    this.loader.showLoader();
    
    setTimeout(() => {
      this.detallesCompletos.forEach(item => {
      this.db.updateData('pedidos', item["pedidoId"], {"estado":"completado", "actived":false});
      });
      this.yaPago = true;
      this.toast.MostrarMensaje("Pago realizado con exito!", false);
      setTimeout(() => {
        this.router.navigateByUrl('home');
      }, 2000);
    }, 2000);
    
  }

}
