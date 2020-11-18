import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.class';
import { PedidoInterface } from 'src/app/models/pedido.interface';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { PedidosService } from 'src/app/services/coleccion/pedidos.service';

@Component({
  selector: 'app-tomar-pedido',
  templateUrl: './tomar-pedido.page.html',
  styleUrls: ['./tomar-pedido.page.scss'],
})
export class TomarPedidoPage implements OnInit {

  usuario: UsuarioModel = new Usuario();

  constructor(private pedido: PedidosService,
              private router: Router) { 
    this.usuario = JSON.parse(localStorage.getItem('userCatch'));
    this.verificarAcceso('mozo', 'bartender', 'camarero')
      .catch( rej =>)
  }

  ngOnInit() {
  }


  llamar(){

     this.pedido.traerPedidos()
      .then( res => console.log(res))
    
    /*  this.pedido.traerPedidos();    */ 
  }


  verificarAcceso( ...usuario ){
    const usuariosAcces = [...usuario];
    return new Promise( (resolve, reject) => {
  
      usuariosAcces.forEach(us => {
        if(this.usuario.perfil != us) {
          reject(false);
        }
      });
    });
  
  }
}
