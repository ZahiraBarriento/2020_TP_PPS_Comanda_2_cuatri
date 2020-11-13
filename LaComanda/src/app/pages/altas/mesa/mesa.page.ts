import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FirestoreService } from '../../../services/firestore.service';
import { QrService } from '../../../services/qr.service';
import { LoaderService } from '../../../services/loader.service';
import { FuctionsService } from '../../../services/fuctions.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {

  image;
  viewPic: string = "../../../../assets/image/default.jpg";
  photo: boolean = false;
  table: any = [];

  //#region Get
  get number() {
    return this.tableForm.get("number");
  }

  get people() {
    return this.tableForm.get('people');
  }

  get type() {
    return this.tableForm.get("type");
  }
  //#endregion

  //#region Constructor
  constructor(
    public router: Router,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private camera: Camera,
    private firestroge: FirestoreService,
    private qr: QrService,
    private loading : LoaderService,
    private alert : FuctionsService) {
  }
  //#endregion

  //#region ngOnInit
  ngOnInit() {
    this.firestroge.getDataAll('mesa').subscribe(data => {
      data.map(item => {
        const data = item.payload.doc.data();
        this.table.push(data);
      })
    });
  }
  //#endregion

  //#region Validators
  tableForm = this.formBuilder.group({
    number: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]],
    people: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]],
    type: ['', [
      Validators.required
    ]],
  });
  //#endregion

  //#region Submit
  onSubmitTable() {
    //console.log('entro')
      var json = { //cargo los datos en un json para guardar en la BD
        number: this.number.value,
        type: this.type.value,
        capacity: this.people.value,
        photo: this.image,
        status: false,
        qr: 'mesa_' + this.number.value,
        client: '',
      }
      this.table.forEach((element: any) => {
        if (element.number != json.number) { //valido que la mesa no este cargada
          this.qr.onCreateQR('mesa_' + this.number.value); //creo el qr y guardo en celular
          this.firestroge.addData('mesa', json); //guardo los datos en la base
          this.router.navigate(['/home']);//mandamos al home
        } else {
          this.alert.presentToast("¡El número de la mesa ya existe!", "danger");
          //console.log(':(');
        }
      })
  }
  //#endregion

  onTakePicture() {
    const options: CameraOptions = {
      quality: 30,
      targetWidth: 300,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      //this.photo = true;
      this.viewPic = this.image;
    }, (err) => {
      console.log(err)
    });
  }

  onBack(){
    //ver que el qr se sigue abriendo
    this.loading.showLoader();
    setTimeout(() =>{
      this.router.navigate(['/home']);
    }, 1000)
  }
}
