import { Injectable, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { FuctionsService } from '../services/fuctions.service';


@Injectable({
  providedIn: 'root'
})
export class QrService implements OnInit {
  pudoIngresarAlLocal = false;
  qrMesas: any = [];
  private options: BarcodeScannerOptions = {
    formats: 'PDF_417,QR_CODE'
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private firestorage: FirestoreService,
    private toast: FuctionsService) {
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
    this.ngOnInit(); //no se orque no lo llama cuando inicia asi que llamo aca
    var client: any = localStorage.getItem('userCatch');
    var esQrMesa: boolean = false;
    var mesa;
    client = JSON.parse(client);

    return new Promise((resolve, reject) => {

      this.barcodeScanner.scan(this.options).then(barcodeData => {
        this.qrMesas.forEach(element => {
          if (barcodeData.text == element.qr) { //verifico si es algun qr de la base de mesa
            esQrMesa = true;
            mesa = element;
          }
        });
  
        if (barcodeData.text == 'ingreso') { //es qr de lista de espera
          this.pudoIngresarAlLocal = true;   
          resolve();       
        } 
  
        else if (esQrMesa) { //es qr de mesa, tendria que verificar que le pertenece a este cliente
          if(mesa.client == client.id){
            localStorage.setItem('tableCurrent', JSON.stringify(mesa));
            resolve();
          }else if(mesa.client != client.id){
            reject('a'); //Mesa incorrecta
          }else if(!this.pudoIngresarAlLocal){
            reject('b'); //Sin registar
          }
        }
  
        else{ //qr no existe
          reject('El código QR escaneado es incorrecto.');
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
    var datos = data.split('@');
    var nombre = datos[2].charAt(0).toUpperCase() + datos[2].slice(1).toLowerCase();
    var apellido = datos[1].charAt(0).toUpperCase() + datos[1].slice(1).toLowerCase();
    var cuil1 = datos[8].substring(0, 2);
    var cuil2 = datos[8].substring(3, 1);
    var cuil = cuil1 + datos[4] + cuil2;

    return { 'nombre': nombre, 'apellido': apellido, 'dni': datos[4], 'cuil': cuil };
  }


  qrPropina(){

    return new Promise( (resolve, reject) => {

      this.barcodeScanner.scan(this.options)
        .then(barcodeData => {
          const result = barcodeData.text as string;
          const canceled = barcodeData.cancelled;

          
          let jsonTips = {
            tipo : 'Sin propina',
            desc: 0,
          };
      
          if(result.length > 0){


          switch (result) {
              case 'Excelente':
                jsonTips.desc = 20;
                jsonTips.tipo = 'Excelente';
                break;
              case 'Muy bien':
                jsonTips.desc = 15;
                jsonTips.tipo = 'Muy bien';
                break;
              case 'Bien':
                jsonTips.desc = 10;
                jsonTips.tipo = 'Bien';
                break;
              case 'Regular':
                jsonTips.desc = 5;
                jsonTips.tipo = 'Regular';
                break;
              case 'Malo':
                jsonTips.desc = 0;
                jsonTips.tipo = 'Malo';
                break;
              default:
                break;   
          }

          resolve(jsonTips);
        }
        })
        .catch( err => {
          reject(err);
        });
    });
  }



}
