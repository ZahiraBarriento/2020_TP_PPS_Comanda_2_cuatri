import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { ChatConsultaComponent } from 'src/app/components/chat-consulta/chat-consulta.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FuctionsService } from 'src/app/services/fuctions.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

  todo: any = [];
  bebidas: any = [];
  platos: any = [];
  table: any;
  user: any;
  mensajes: any = [];

  constructor(
    private modalCtrl: FuctionsService,
    private afs: FirestoreService,
    private router: Router) {
    this.table = JSON.parse(localStorage.getItem('tableCurrent'));
    this.user = JSON.parse(localStorage.getItem('userCatch')) as UsuarioModel;

    this.consultaUsuario();
  }

  ngOnInit() {
    this.afs.getDataAll('productos').subscribe(element => {
      element.map(item => {
        const data = item.payload.doc.data();
        this.todo.push(data);
      })

      this.todo.forEach(element => {
        if (element.tipo == 'bebida') {
          this.bebidas.push(element);
        } else if (element.tipo == 'plato') {
          this.platos.push(element);
        }
      });
    })
  }

  openChat() {
    this.modalCtrl.openModal(ChatConsultaComponent, 'common', this.table);
  }

  pedirComanda() {
    this.router.navigateByUrl('/pedir-platos-bebidas');
  }

  pedirCuenta() {
    this.router.navigateByUrl('/pedir-cuenta');
  }

  consultaUsuario() {
    var json = {
      number: this.table.number,
      messages: '',
      id : this.user.id
    }

    this.traerConsultas().then((res: boolean) => {
      console.log(res)
      if (res != true)
        this.afs.addDataId('chat', json, this.user.id);
    })
  }

  traerConsultas() {
    return new Promise((resolve, reject) => {
      this.afs.getDataAll('chat').subscribe((item) => {
        if(item.length > 0){
          item.map(element => {
            const doc: any = element.payload.doc.data();
            doc.id = element.payload.doc.id;
            this.mensajes.push(doc);
  
            this.mensajes.forEach(element => {
              console.log('asd')
              if (element.id === this.user.id) {
                resolve(true);
              }
            })
          });
        }else{
          resolve(false);
        }
      })
    })
  }
}
