import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rejects } from 'assert';
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
  estado: string;
  tarea: string;

  constructor(private pedido: PedidosService,
              private router: Router) { 


    this.usuario = JSON.parse(localStorage.getItem('userCatch')) as UsuarioModel;
    this.verificarAcceso('cocinero')
      .then( res => {
        console.log('pasds');
        this.traerPedidos();
        this.asignarTareas();
        
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
        console.log(this.usuario.perfil);
        if(this.usuario.perfil == us) {
          resolve(true);
        }
      });
    });
  }


  asignarTareas(pedido?: PedidoInterface){
      
      switch (this.usuario.perfil.toString()) {
      case 'mozo':
        if(pedido.estado == 'informar'){
          this.estado = 'informar';
          
        }
        this.tarea = 'LLevar comanda';
        break;
      case 'bartender':
        this.estado = 'prepararB';
        this.tarea = 'Preparar';
        break;
      case 'cocinero':
        this.estado = 'prepararC';
        this.tarea = 'Preparar';
        break;
      default:
        console.log('Error');
    }

      return this.estado;
  }
}
