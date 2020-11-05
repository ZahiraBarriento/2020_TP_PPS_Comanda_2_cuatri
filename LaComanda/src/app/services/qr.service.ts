import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from '../services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  qr: any = [];
  private options: BarcodeScannerOptions = {
    formats: "PDF_417,QR_CODE"
  };

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

  async onCreateQR(code : any) {
    await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, code).then(encodedData =>{
      code = encodedData;
    })
  }

  //SOLO VERIFICA QUE EL QR EXISTA EN LA BASE DE DATOS 
  onScanQR() {
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      console.log(barcodeData.text);
      /*this.qr.forEach(element => {
        console.log(element.code)
        if (barcodeData.text == element.code) {//si el codigo que mando esta en la base todo joya
          //ver que onda
        }
      });*/
    })
  }

  getDatosDniQr(){
    return new Promise((resolve)=>{
      this.barcodeScanner.scan(this.options).then(barcodeData => {
        var json = this.GetJsonFromBarcode(barcodeData)
        resolve(json);
        //Juanka cuando llames esta funcion usa this.qr.getDatosDniQr.then((json) => RellenarCampos(json))
        //y cuando leas esto borralo 

                        //          ***          
                        //        *******      
                        //      *********     
                        //    /\* ### ### */\  
                        //    |    @ / @    |  
                        //    \/\    ^    /\/  
                        //       \  ===  /     
                        //         \_____/      
                        //         _|_|_       
                        //      *$$$$$$$$$*     
      })
    })
  }

  GetJsonFromBarcode(data){
    var datos = data.split("@");
    var nombre = datos[2].charAt(0).toUpperCase() + datos[2].slice(1).toLowerCase();
    var apellido = datos[1].charAt(0).toUpperCase() + datos[1].slice(1).toLowerCase();
    var cuil1 = datos[8].substring(0,2);
    var cuil2 = datos[8].substring(3,1);
    var cuil = cuil1 + datos[4] + cuil2;

    return {"nombre":nombre, "apellido":apellido, "dni":datos[4], "cuil":cuil};
  }
  
}
