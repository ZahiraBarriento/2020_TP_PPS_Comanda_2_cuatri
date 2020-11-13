import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';
import { cards } from '../../models/cards';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user;
  showView : boolean; //se usa para mostrar altas
  perfil : string;
  info = cards;
  cards : any = [];
  alta : any = [];
  estoyListaEspera = false;

  constructor(private router : Router) {
      this.user = localStorage.getItem('userCatch'); //obtengo user
      this.user = JSON.parse(this.user);
      this.showCard(this.user.perfil);
      if (this.user != null)
        this.showCard(this.user.perfil);
      else 
        this.router.navigate(['login']);
    }

  ngOnInit(): void {
    this.info.forEach(element =>{
      element.altas.map(item => {
        this.alta.push(item);
      });
    });
  }

  showCard(perfil){
    this.info.forEach(element =>{
      if(element[perfil]){
        this.cards = element[perfil];
      }
    })
  }

  page(pagina){
    switch(pagina){
      case 'altaSupervisor':
        this.router.navigateByUrl('/altas/duenio');
        break;
      case 'altaEmpleado':
          this.router.navigateByUrl('/altas/empleado');
          break;
      case 'altaMesa':
          this.router.navigateByUrl('/altas/mesa');
          break;
    }
  }


  action(param){
    switch(param){
      //CLIENTE
      case 'qr':
        document.getElementById("HomePrincipal").style.opacity = "0.4";
        this.estoyListaEspera = true;
        break;
      case 'reserva':
        //implementar reserva hecha por cliente
        break;
      case 'encuestaCliente':
        break;

      //DUEÑO/SUPERVISOR
      case 'altas':
        this.showView = true;
        break;
      case 'aprobarUsuario':
        this.router.navigateByUrl('aprobar-usuario');
        break;
      case 'encuestaSupervisor':
        //implementar encuesta
        break;

      //METRE
      case 'listaEspera':
        //implementar lista con los clientes que esperar entrar y asignarle mesa
        break;
      case 'altaCliente':
        this.router.navigateByUrl('/altas/cliente');
        break;

      //MOZO
      case 'confirmarPedido':
        //implementar una lista de los pedido realizdos para confirmar
        break;

      //COCINERO
      case 'altaProducto':
        this.router.navigateByUrl('/altas/producto');
        break;
      case 'listaComandas':
        //implementar listado de los pedidos realizados, en cocinero es disitinto igual que bartender (preguntar)
        break;

      //EMPLADOS TODOS
      case 'encuestaEmpleado':
        //implementar encuesta de empleados
        break;

      //TODOS
      case 'perfil':
        this.router.navigateByUrl('/home/perfil'); //hacer pagina
        break;
    }
  }
}
