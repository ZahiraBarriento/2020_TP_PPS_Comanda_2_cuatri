import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cards } from '../../models/cards';
import { ModalController } from '@ionic/angular';
import { QrService } from '../../services/qr.service';
import { LoaderService } from '../../services/loader.service'
import { ToastService } from '../../services/toast.service'
import { FirestoreService } from '../../services/firestore.service';

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

  constructor(private router : Router, 
    private modalController: ModalController, 
    private qr:QrService, 
    private loader:LoaderService, 
    private toast:ToastService,
    private db:FirestoreService) {
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
        this.IngresoLocalQR();
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
        this.router.navigateByUrl('/administrar');
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
        this.router.navigateByUrl('/home/perfil');
        break;
    }
  }

  //LO HAGO CON MODAL Y LUEGO ME FIJO COMO HACER 
  async openModal(component){
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'modal-component'
    });
    return await modal.present();
  }

  IngresoLocalQR(){
    this.ActualizarClienteListaEspera();
    this.qr.onScanQR().then(() => {
      this.loader.showLoader();
      this.ActualizarClienteListaEspera();
      setTimeout(() =>{
        this.toast.MostrarMensaje("Has ingresado al local, tan pronto como podamos te asignaremos una mesa!", false);
      }, 2000);

    }).catch(() => {
      this.loader.showLoader();
      setTimeout(() => {
        this.toast.MostrarMensaje("Ha ocurrido un error al ingresar al local", true);
      }, 2000);
    });
  }

  ActualizarClienteListaEspera(){
    var allUsers = new Array<any>();
    
    this.db.getDataAll('usuarios').subscribe((data) =>{
      var count = 0;
      if (count = 0){
        allUsers.splice(0, allUsers.length);
      }
      data.map(item => {
        const data = item.payload.doc.data();
        const id = item.payload.doc.id;
        allUsers.push(data);
        allUsers[count].id = id;
        count++;
      });

      allUsers.forEach(element => {
        if (element["nombre"] == this.user["nombre"] && element["apellido"] == this.user["apellido"] && element["correo"] == this.user["correo"])
           this.db.updateData('usuarios', element["id"], {listaEspera:true});
        }
    );
  });
}
}

