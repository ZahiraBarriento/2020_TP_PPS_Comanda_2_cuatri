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
  pedidos: PedidoInterface[];
  tareas: string;

  constructor(private pedido: PedidosService,
              private router: Router) { 


    this.usuario = JSON.parse(localStorage.getItem('userCatch'));
    this.verificarAcceso('mozo', 'bartender', 'camarero')
      .then( res => {
        this.traerPedidos();
      })
      .catch( rej => rej && this.router.navigateByUrl('/home'));

      // tslint:disable-next-line: no-trailing-whitespace

  }

  ngOnInit() {
  }


  async traerPedidos(){
   return await this.pedido.traerPedidos()
      .then( res => {
        this.pedidos = [];
        this.pedidos = res as PedidoInterface[];
      });

  }


  verificarAcceso( ...usuario ){
    const usuariosAcces = [...usuario];
    return new Promise( (resolve, reject) => {
  
      usuariosAcces.forEach(us => {
        if(this.usuario.perfil != us) {
          reject(false);
        }else{
          resolve(true);
        }
      });
    });
  
  }
}
