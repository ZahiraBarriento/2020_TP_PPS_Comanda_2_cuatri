import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from '../services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { storage } from 'firebase';
import { Router } from '@angular/router';
import { unwatchFile } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  pudoIngresarAlLocal = false;
  qrMesas: any = [];
  private options: BarcodeScannerOptions = {
    formats: "PDF_417,QR_CODE"
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private firestorage: FirestoreService,
    private router: Router) {
  }

  ngOnInit() {
    this.getQrAll();
  }

  //todos los codigos qr de mesa
  getQrAll() {
    this.firestorage.getDataAll('mesa').subscribe(data => {
      data.map(item => {
        const data = item.payload.doc.data();
        this.qrMesas.push(data);
      })
    });
  }

  async onCreateQR(code: any) {
    await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, code);
  }

  //
  onScanQR() {
    var client: any = localStorage.getItem('userCatch');
    var esQrMesa: boolean = false;
    client = JSON.parse(client);

    return new Promise((resolve, reject) => {

      this.barcodeScanner.scan(this.options).then(barcodeData => {
        this.qrMesas.forEach(element => {
          if (barcodeData.text == element.qr) { //verifico si es algun qr de la base de mesa
            esQrMesa = true;
          }
        });
  
        if (barcodeData.text == 'ingreso') { //es qr de lista de espera
          this.pudoIngresarAlLocal = true;   
          resolve();       
        } 
  
        else if (esQrMesa) { //es qr de mesa, tendria que verificar que le pertenece a este cliente
          resolve();
        }
  
        else{ //qr no existe
          reject("Error al escanear QR");
        }
      });

    });
  }

  getDatosDniQr() {
    return new Promise((resolve) => {
      this.barcodeScanner.scan(this.options).then(barcodeData => {
        var json = this.GetJsonFromBarcode(barcodeData)
        resolve(json);
        //Juanka cuando llames esta funcion usa this.qr.getDatosDniQr.then((json) => RellenarCampos(json))
        //y cuando leas esto borralo 

        //          ***          
        //        *******      
        //       *********     
        //    /\* ### ### */\  
        //    |    @ / @    |  
        //    \/\    ^    /\/  
        //       \  ===  /     
        //        \_____/      
        //         _|_|_       
        //      *$$$$$$$$$*     
      })
    })
  }

  GetJsonFromBarcode(data) {
    var datos = data.split("@");
    var nombre = datos[2].charAt(0).toUpperCase() + datos[2].slice(1).toLowerCase();
    var apellido = datos[1].charAt(0).toUpperCase() + datos[1].slice(1).toLowerCase();
    var cuil1 = datos[8].substring(0, 2);
    var cuil2 = datos[8].substring(3, 1);
    var cuil = cuil1 + datos[4] + cuil2;

    return { "nombre": nombre, "apellido": apellido, "dni": datos[4], "cuil": cuil };
  }

}
