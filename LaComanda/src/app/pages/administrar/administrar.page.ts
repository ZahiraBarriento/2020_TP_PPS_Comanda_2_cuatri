import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ChatConsultaComponent } from 'src/app/components/chat-consulta/chat-consulta.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FuctionsService } from 'src/app/services/fuctions.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

  todo : any = [];
  bebidas : any = [];
  platos : any = [];
  table : any;

  constructor(
    private modalCtrl : FuctionsService,
    private afs : FirestoreService,
    private router : Router) { 
      this.table = localStorage.getItem('tableCurrent');
      this.table = JSON.parse(this.table);
    }

  ngOnInit() {
    this.afs.getDataAll('productos').subscribe(element => {
      element.map(item => {
        const data = item.payload.doc.data();
        this.todo.push(data);
      })

      this.todo.forEach(element => {
        if(element.tipo == 'bebida'){
          this.bebidas.push(element);
        }else if(element.tipo == 'plato'){
          this.platos.push(element);
        }
      });
    })
  }

  openChat(){
    this.modalCtrl.openModal(ChatConsultaComponent, 'common', this.table);
  }

  pedirComanda(){
    this.router.navigateByUrl('/pedir-platos-bebidas');
  }

  pedirCuenta(){
    this.router.navigateByUrl('/pedir-cuenta');
  }
}
