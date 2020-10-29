import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from '../../services/firestore.service';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {

  //recibir una propiedad de otro componente []
  //@Input() codeQr :string = "naranja";
  //mandar un metodo al componente padre ()
  @Output() qrData = new EventEmitter<any>();
  qr: any = [];
  check: boolean = false;
  creado : any;
  elementType = 'url';
  value = 'Techiediaries';

  constructor(
    private barcodeScanner: BarcodeScanner,
    private firestorage: FirestoreService,
    private bd: AngularFirestore) {
  }

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

  async onCreateQR(){
    await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, 'holamundo!')
  }

  //SOLO VERIFICA QUE EL QR EXISTA EN LA BASE DE DATOS 
  onScanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.qr.forEach(element => {
        console.log(element.code)
        if (barcodeData.text == element.code) {//si el codigo que mando esta en la base todo joya
          this.check = true;
          this.qrData.emit(JSON.stringify(element))
        }
      });
    })
  }
}
