import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from '../services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  qr: any = [];

  constructor(
    private barcodeScanner: BarcodeScanner,
    private firestorage: FirestoreService,
    private bd: AngularFirestore) { }

  ngOnInit() {
    this.getQrAll();
  }

  //todos los codigos qr de mesa
  getQrAll() {
    this.firestorage.getDataAll('qr').subscribe(data => {
      data.map(item => {
        const data = item.payload.doc.data();
        this.qr.push(data);
      })
    });
  }

  async onCreateQR(code : any) {
    await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, code)
  }

  //SOLO VERIFICA QUE EL QR EXISTA EN LA BASE DE DATOS 
  onScanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.qr.forEach(element => {
        console.log(element.code)
        if (barcodeData.text == element.code) {//si el codigo que mando esta en la base todo joya
          
        }
      });
    })
  }
}
