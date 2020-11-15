import { Component, OnInit } from '@angular/core';
import { ChatConsultaComponent } from 'src/app/components/chat-consulta/chat-consulta.component';
import { message } from '../../models/message';
import { FirestoreService } from '../../services/firestore.service';
import { FuctionsService } from '../../services/fuctions.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  public consultas : any = [];

  constructor(
    private fb: FirestoreService,
    private modalCtrl : FuctionsService) { }

  ngOnInit() {
    this.fb.getDataQuery('chat').subscribe(info => {
      this.consultas = info;
    })
    /*this.user = localStorage.getItem('userCatch'); //obtengo user
    this.user = JSON.parse(this.user);

    this.chatService.getDataAll('chat').subscribe(chat => {
      chat.map(msg => {
        this.mensajes = msg.payload.doc.data();
        console.log(this.mensajes)
      })
    })*/
  }

  openChat(chat){
    this.modalCtrl.openModal(ChatConsultaComponent, 'common', chat);
  }

}
