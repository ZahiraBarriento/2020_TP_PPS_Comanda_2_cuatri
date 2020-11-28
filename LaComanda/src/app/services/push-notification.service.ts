import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from "@ionic-native/local-notifications/ngx";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: "root",
})
export class PushNotificationService {

  clientes: any = [];

  constructor(private oneSignal: OneSignal,
    public platform: Platform,
    private notification: LocalNotifications,
    private firabase: AngularFirestore) {
  }

  initNotification() {


    if (this.platform.is('cordova')) {

      this.oneSignal.startInit(
        "8f048196-06ce-4c4a-b011-f53fee0c61cc",
        "648289619522"
      );

      this.oneSignal.inFocusDisplaying(
        this.oneSignal.OSInFocusDisplayOption.InAppAlert
      );


      this.oneSignal.handleNotificationReceived().subscribe((sus) => {

        alert(JSON.stringify(sus));

      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit();

    } else {
      console.log('OneSignal no funciona en Escritorio Windows');
    }

  }

  pushNotification(titulo: string, mensaje: string, id: number) {
    this.notification.schedule({
      title: titulo,
      text: mensaje,
      vibrate: true,
      id: id,
      trigger: {
        unit: ELocalNotificationTriggerUnit.SECOND
      }
    });
  }

  newUser() {
    this.firabase.collection('usuarios').snapshotChanges().subscribe(data => {
      data.map(item => {
        const doc = item.payload.doc.data();
        this.clientes.push(doc);
      })
      this.clientes.forEach(element => {
         
        if (element.activated == false) {
          this.clientes = [];
          this.pushNotification("¡Nueva solicitud de aprobación!", "Un nuevo cliente se ha registrado", 1);
        }
      });
    })
  }

  waitingList() {
    this.firabase.collection('usuarios').snapshotChanges().subscribe(data => {
      data.map(item => {
        const doc = item.payload.doc.data();
        this.clientes.push(doc);
      })
      this.clientes.forEach(element => {
        if (element.listaEspera == true) {
          this.clientes = [];
          this.pushNotification("¡Nueva solicutud de ingreso!", "Un nuevo cliente en la lista de espera", 2);
        }
      });
    })
  }

  newQuery() {
    var consultas: any = [];
    var ultimoMensaje: any;

    this.firabase.collection('chat').snapshotChanges().subscribe(data => {
      data.map(item => {
        const doc = item.payload.doc.data();
        consultas.push(doc);

        consultas.forEach(element => {
          if (element.messages != '') {
            ultimoMensaje = element.messages[element.messages.length - 1];

            if (ultimoMensaje.user == 'anonimo' || ultimoMensaje.user == 'cliente') {
              this.pushNotification("¡Nueva consulta!", "Un cliente ha realizado una consulta", 3);
              ultimoMensaje = '';
            }
          }
        });
      })
    })
  }

  newFood() {
    var pedido : any;

    this.firabase.collection('pedidos').snapshotChanges().subscribe(data =>{
      data.map(item =>{
        const doc = item.payload.doc.data();
        pedido = doc;

        if(pedido.para == 'cocina' && pedido.estado == 'prepararC'){
          this.pushNotification("¡Nueva comanda!", "Ha ingresado una nueva comida para preparar", 4);
        }else if(pedido.para == 'bartender' && pedido.estado == 'prepararB'){
          this.pushNotification("¡Nueva comanda!", "Ha ingresado una nueva bebida para preparar", 5);
        }
      })
    })
  }

  delivered(){
    var pedido : any;

    this.firabase.collection('pedidos').snapshotChanges().subscribe(data =>{
      data.map(item =>{
        const doc = item.payload.doc.data();
        pedido = doc;

        if(pedido.para == 'preparado'){
          this.pushNotification("¡Nueva comanda preparada!", "Ha ingresado una nueva comida para entregar", 6);
        }
      })
    })
  }
}
