import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/coleccion/pedidos.service';

@Component({
  selector: 'app-tomar-pedido',
  templateUrl: './tomar-pedido.page.html',
  styleUrls: ['./tomar-pedido.page.scss'],
})
export class TomarPedidoPage implements OnInit {

  constructor(private pedido: PedidosService) { }

  ngOnInit() {
  }


  llamar(){
    /*  this.pedido.traerPedidos();   */
  }
}
