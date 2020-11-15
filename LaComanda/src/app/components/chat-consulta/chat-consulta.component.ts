import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { message } from '../../models/message';

@Component({
  selector: 'app-chat-consulta',
  templateUrl: './chat-consulta.component.html',
  styleUrls: ['./chat-consulta.component.scss'],
})
export class ChatConsultaComponent implements OnInit {

  table;
  msg: string;
  mensajes : any = [];
  chat : any;
  d: any = new Date();
  day = this.d.getDate();
  month = this.d.getMonth();
  year = this.d.getFullYear();
  fecha: string = this.day + '/' + this.month + '/' + this.year;
  user;

  constructor(
    private navParams : NavParams, 
    private modal : ModalController,
    private chatService : FirestoreService) { }

  ngOnInit() {
    this.table = this.navParams.get('data');
    this.user = localStorage.getItem('userCatch'); //obtengo user
    this.user = JSON.parse(this.user);
    console.log(this.user)
    
    this.chatService.getDataChat(this.table.id).subscribe(item => {
      this.chat = item;
    })
  }

  sendMessage() {
      const message: message = {
        content: this.msg,
        date: this.fecha,
        userName: this.user.nombre,
        userLastName : this.user.apellido
      }
      this.chatService.sendMsgToDirebase(message, 'chat', this.user.id);
      this.msg = "";
  }

  onClose(){
    this.modal.dismiss();
  }

}
