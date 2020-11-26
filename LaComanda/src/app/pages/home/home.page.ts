import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cards } from '../../models/cards';
import { ModalController } from '@ionic/angular';
import { QrService } from '../../services/qr.service';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
import { FirestoreService } from '../../services/firestore.service';
import { FuctionsService } from 'src/app/services/fuctions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  user;
  showView: boolean; // se usa para mostrar altas
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
    private alert: FuctionsService) {
    /*  this.user = localStorage.getItem('userCatch'); // obtengo user */

    console.log('-----------------------------------------------------------------------------');

    this.user = JSON.parse(localStorage.getItem('userCatch'));

    this.showCard(this.user.perfil);
    if (this.user != null) {
      this.showCard(this.user.perfil);
    }
    else {
      this.router.navigate(['login']);
    }
  }

  ionViewDidEnter() {
    this.user = JSON.parse(localStorage.getItem('userCatch'));
    if (this.user != null) {
      this.showCard(this.user.perfil);
    }

    /* console.log('User');
    console.log(this.user);
    console.log('showView');
    console.log(this.showView); */
    console.log('perfil');
    console.log(this.perfil);
    /*  console.log('info');
     console.log(this.info); */
    console.log('cards');
    console.log(this.cards);
    /*  console.log('alta');
     console.log(this.alta); */
  }

  ngOnInit(): void {
    this.info.forEach(element => {
      element.altas.map(item => {
        this.alta.push(item);
      });
    });
  }

  showCard(perfil) {

    let llave = false;

    this.info.forEach(element => {

      if (element[perfil] && llave == false) {
        console.log('Funcion ShowCard');
        console.log(element[perfil]);
        this.cards = element[perfil];
        llave = true;
      }
    });
  }

  page(pagina) {
    switch (pagina) {
      case 'altaSupervisor':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('/altas/duenio');
        }, 1500);
        break;
      case 'altaEmpleado':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('/altas/empleado');
        }, 1500);
        break;
      case 'altaMesa':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('/altas/mesa');
        }, 1500);
        break;
    }
  }


  action(param) {
    switch (param) {
      // CLIENTE
      case 'qr':
        this.IngresoLocalQR();
        break;
      case 'reserva':
        // implementar
        break;
      case 'encuestaCliente':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('encuesta/cliente');
        }, 1500);
        break;
      case 'mesa':
        this.mesaCliente();
        break;

      // DUEÑO/SUPERVISOR
      case 'altas':
        this.showView = true;
        break;
      case 'aprobarUsuario':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('aprobar-usuario');
        }, 1500);
        break;
      case 'encuestaSupervisor':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('encuesta/supervisor');
        }, 1500);
        break;

      // METRE
      case 'listaEspera':
        this.router.navigateByUrl('/listado');
        break;
      case 'altaCliente':
        this.router.navigateByUrl('/altas/cliente');
        break;

      // MOZO
      case 'consultas':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('/consulta');
        }, 1500);
        break;

      // COCINERO
      case 'altaProducto':
        this.router.navigateByUrl('/altas/producto');
        break;
      case 'listaComandas':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('/tomar-pedido');
        }, 1500);
        break;

      // EMPLADOS TODOS
      case 'encuestaEmpleado':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('encuesta/empleado');
        }, 1500);
        break;

      // TODOS
      case 'perfil':
        this.loader.showLoader();
        setTimeout(() => {
          this.router.navigateByUrl('/home/perfil');
        }, 1500);
        break;
    }
  }

  IngresoLocalQR() {
    this.qr.onScanQR().then(() => {
      this.loader.showLoader();
      this.ActualizarClienteListaEspera();
      setTimeout(() => {
        this.toast.MostrarMensaje('Has ingresado al local, ¡Tan pronto como podamos te asignaremos una mesa!', false);
      }, 1500);

    }).catch(() => {
      this.loader.showLoader();
      setTimeout(() => {
        this.toast.MostrarMensaje('Ha ocurrido un error al ingresar al local', true);
      }, 1500);
    });
  }

  ActualizarClienteListaEspera() {
    let allUsers = new Array<any>();

    this.db.getDataAll('usuarios').subscribe((data) => {
      let count = 0;
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
        if (element['nombre'] == this.user['nombre'] && element['apellido'] == this.user['apellido'] && element['correo'] == this.user['correo']) {
          this.db.updateData('usuarios', element["id"], { listaEspera: true });
        }
      }
      );
    });
  }

  mesaCliente() {
    this.qr.onScanQR().then(() => {
      this.loader.showLoader();
      setTimeout(() => {
        this.router.navigateByUrl('/administrar');
      }, 1500);

    }).catch((error) => {
      switch (error) {
        case 'a':
          this.alert.presentToast('¡El QR escaneado es incorrecto! Debe escanear el código de la mesa que se le ha asignado.', 'warning');
          break;
        case 'b':
          this.alert.presentToast('¡Primero debe registrarse en la lista de espera!', 'danger');
          break;
        case 'b':
          this.alert.presentToast('Nuestros empleados estan trabajando para asignarle una mesa, aguarde y tan pronto como podamos tendra su mesa.', 'warning');
          break;
        default:
          this.alert.presentToast('ERROR, el código QR es incorrecto.', 'danger');
          break;
      }
    });
  }

  ngOnDestroy() {
    this.user = null;
    this.perfil = null;
    this.cards = [];
    this.alta = [];
    this.info = null;
  }

}

