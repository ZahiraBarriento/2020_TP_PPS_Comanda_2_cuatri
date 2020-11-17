import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cards } from '../../models/cards';
import { ModalController } from '@ionic/angular';
import { QrService } from '../../services/qr.service';
import { LoaderService } from '../../services/loader.service'
import { ToastService } from '../../services/toast.service'
import { FirestoreService } from '../../services/firestore.service';
import { FuctionsService } from 'src/app/services/fuctions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user;
  showView: boolean; //se usa para mostrar altas
  perfil: string;
  info = cards;
  cards: any = [];
  alta: any = [];

  constructor(
    private router: Router,
    private qr: QrService,
    private loader: LoaderService,
    private toast: ToastService,
    private db: FirestoreService,
    private alert : FuctionsService) {
    this.user = localStorage.getItem('userCatch'); //obtengo user
    this.user = JSON.parse(this.user);
    this.showCard(this.user.perfil);
    if (this.user != null)
      this.showCard(this.user.perfil);
    else
      this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.info.forEach(element => {
      element.altas.map(item => {
        this.alta.push(item);
      });
    });
  }

  showCard(perfil) {
    this.info.forEach(element => {
      if (element[perfil]) {
        this.cards = element[perfil];
      }
    })
  }

  page(pagina) {
    switch (pagina) {
      case 'altaSupervisor':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('/altas/duenio');
        }, 1500)
        break;
      case 'altaEmpleado':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('/altas/empleado');
        }, 1500)
        break;
      case 'altaMesa':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('/altas/mesa');
        }, 1500)
        break;
    }
  }


  action(param) {
    switch (param) {
      //CLIENTE
      case 'qr':
        this.IngresoLocalQR();
        break;
      case 'reserva':
        //implementar reserva hecha por cliente
        break;
      case 'encuestaCliente':
        break;
      case 'mesa':
        this.mesaCliente();
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
        this.router.navigateByUrl('/listado');
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

  IngresoLocalQR() {
    this.qr.onScanQR().then(() => {
      this.loader.showLoader();
      this.ActualizarClienteListaEspera();
      setTimeout(() => {
        this.toast.MostrarMensaje("Has ingresado al local, ¡Tan pronto como podamos te asignaremos una mesa!", false);
      }, 2000);

    }).catch(() => {
      this.loader.showLoader();
      setTimeout(() => {
        this.toast.MostrarMensaje("Ha ocurrido un error al ingresar al local", true);
      }, 2000);
    });
  }

  ActualizarClienteListaEspera() {
    var allUsers = new Array<any>();

    this.db.getDataAll('usuarios').subscribe((data) => {
      var count = 0;
      if (count = 0) {
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
          this.db.updateData('usuarios', element["id"], { listaEspera: true });
      }
      );
    });
  }

  mesaCliente(){
    this.qr.onScanQR().then(() => {
      this.loader.showLoader();
      setTimeout(() => {
        this.router.navigateByUrl('/administrar');
      }, 1500);
    }).catch((error) => {
      switch(error){
        case 'a':
          this.alert.presentToast('¡El QR escaneado es incorrecto! Debe escanear el código de la mesa que se le ha asignado.', 'warning');
        break;
        case 'b':
          this.alert.presentToast('¡Primero debe registrarse en la lista de espera!', 'danger');
        break;
        case 'c':
          this.alert.presentToast('Aún no tienes mesa, ¡Tan pronto como podamos te asignaremos una mesa!', 'warning');
        break;
        default:
          this.alert.presentToast('ERROR, el código QR es incorrecto.', 'danger');
        break;
      }
    })
  }
}

