import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FirestoreService } from '../../../services/firestore.service';
  import { from } from 'rxjs';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {

  image: string;
  viewPic: string = "../../../../assets/image/default.jpg";
  test : string = "funciono";

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
    private firestroge : FirestoreService) { 

    }
  //#endregion

  //#region ngOnInit
  ngOnInit(): void {

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
    type:['',[
      Validators.required
    ]]
  });
  //#endregion

  //#region Submit
  onSubmitTable() {
    //console.log('entro');
  }
  //#endregion

  onTakePicture(){
    const options: CameraOptions = {
      quality: 30,
      targetWidth: 500,
      targetHeight: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     console.log(err)
    });
  }

  onScanQR(){
    
  }

  /*radioGroup(value) {
    console.log(value.detail.value);
  }*/
}
