import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from '../../services/firestore.service';
import { Qr } from '../../models/qr';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {

  //recibir una propiedad de otro componente
  //@Input() codeQr :string = "naranja";
  //mandar un metodo al componente padre
  qr: any = [];
  check: boolean = false;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private firestorage: FirestoreService,
    private bd: AngularFirestore) {
  }

  ngOnInit() {
    this.getQr();
  }

  //todos los codigos qr van a estar aca sin importar a que pertenezca? preguntar
  getQr() {
    this.firestorage.getDataAll('qr').subscribe(data => {
      data.map(item => {
        const data: Qr = item.payload.doc.data() as Qr;
        this.qr.push(data);
      })
    });
  }

  //SOLO VERIFICA QUE EL QR EXISTA EN LA BASE DE DATOS 
  /* YO USE LOS CODIGOS DEL PP ASI QUE VAN A TENER QUE HACER LOS SUYOS, MATANGA! */
  onScanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.qr.forEach(element => {
        //console.log(element.code)
        if (barcodeData.text == element.code) {//si el codigo que mando esta en la base todo joya
          this.check = true;
        }
      });
    })
  }
}
