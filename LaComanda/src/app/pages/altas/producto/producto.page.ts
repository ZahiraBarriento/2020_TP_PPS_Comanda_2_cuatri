import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage  {

  //#region Get Values Form
  get nombre(){
    return this.forma.get('nombre').value;
  }

  get descripcion(){
    return this.forma.get('descripcion').value;
  }

  get timeElaboracion(){
    return this.forma.get('timeElaboracion').value;
  }

  get precio(){
    return this.forma.get('precio').value;
  }
  //#endregion

  forma: FormGroup;
  imageEmpty = '../../../../assets/image/default.jpg';
  imageUpload: Array<string> = new Array(3);
  state = true;

  constructor(private fb: FormBuilder,
              private camera: Camera,
              private fr: FirestoreService ) {
    this.generarForm();

    /* //#region  BORRAR AL FINALIZAR PROYECTO
    this.imageUpload[0] = '../../../../assets/image/comida1.jpg';
    this.imageUpload[1] = '../../../../assets/image/comida2.jpg';
    this.imageUpload[2] = '../../../../assets/image/comida3.jpg';
    //#endregion */

    }
    

  generarForm(){
    this.forma = this.fb.group({
      nombre: ['',  [Validators.required, Validators.pattern('')] ], // Se asigna registro tareas
      descripcion: ['',  [Validators.required, Validators.pattern('')] ], // Se asigna registro tareas
      timeElaboracion: ['',  [Validators.required, Validators.pattern('[0-9]')] ],
      precio: ['',  [Validators.required, Validators.pattern('[0-9]')] ],
    });
  }

  altaProducto(){
 
      const jsonProducto: ProductoInterface = {
      id: new Date().valueOf().toString(),
      nombre: this.nombre,
      descripcion: this.descripcion,
      timeElaboracion: this.timeElaboracion,
      precio: this.precio,
      foto1: this.imageUpload[0],
      foto2: this.imageUpload[1],
      foto3: this.imageUpload[2]
    };

      this.fr.addData('productos', jsonProducto);
  }


  asignarImg(index){

     const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 90
    };

     this.camera.getPicture(options)
    .then(imageData => {
        this.imageUpload[index] = `data:image/jpeg;base64,${imageData}`;
    });

     this.verificarImageEmpty();
  }

  verificarImageEmpty(){
    let count = 0;

    this.imageUpload.forEach(element => {
      if (element) { count++; }
    });
    if(count === 3){ this.state = false;}
  }

}
