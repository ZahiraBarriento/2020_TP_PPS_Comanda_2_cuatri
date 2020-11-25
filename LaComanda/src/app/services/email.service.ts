import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private afAuth : AngularFireAuth) { }

  //ESTO ES TRAMPA PERO POR AHORA LO DEJO ASI
  sendEMail(email : string) {

    this.afAuth.sendPasswordResetEmail(email);
    console.log(email)
  }
}
