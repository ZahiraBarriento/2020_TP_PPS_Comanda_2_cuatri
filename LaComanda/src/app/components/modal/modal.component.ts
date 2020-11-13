import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FuctionsService } from '../../services/fuctions.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  viewPic: string = "../../../../assets/image/default.jpg";
  image;

   //#region Get
  get name() {
    return this.clientForm.get("name");
  }
  //#endregion

  constructor(
    private modalController : FuctionsService, 
    public formBuilder: FormBuilder,
    public router : Router,
    public loading : LoaderService,
    private camera: Camera) { }

  ngOnInit() {
    
  }

  //#region Validators
  clientForm = this.formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z ]*$")
    ]]
  });
  //#endregion

  onSubmit(){
    var json = {name:this.name.value, foto:this.image, perfil: 'anonimo'};
    localStorage.setItem('userCatch', JSON.stringify(json));
    this.loading.showLoader();
    setTimeout(() =>{
      this.router.navigate(['/home']);
      this.modalController.dismissModal();
    }, 1000)
  }

  close(){
    this.modalController.dismissModal();
  }

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
      this.viewPic = this.image;
    }, (err) => {
      console.log(err)
    });
  }
}
