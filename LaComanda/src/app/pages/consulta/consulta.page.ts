import { Component, OnInit } from '@angular/core';
import { message } from '../../models/message';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  public msg: string;
  public mensajes : any = [];
  d: any = new Date();
  day = this.d.getDate();
  month = this.d.getMonth();
  year = this.d.getFullYear();
  fecha: string = this.day + '/' + this.month + '/' + this.year;
  user;

  constructor(private chatService: FirestoreService) { }

  ngOnInit() {
    this.user = localStorage.getItem('userCatch'); //obtengo user
    this.user = JSON.parse(this.user);

    this.chatService.getDataAll('chat').subscribe(chat => {
      chat.map(msg => {
        this.mensajes = msg.payload.doc.data();
      })
    })
  }

  sendMessage() {
      const message: message = {
        content: this.msg,
        date: this.fecha,
        userName: this.user.nombre,
        userLastName : this.user.apellido
      }
      this.chatService.sendMsgToDirebase(message, 'chat', 'Jgr0LhjhFdRj5RUzAteN');
      this.msg = "";
  }

}
