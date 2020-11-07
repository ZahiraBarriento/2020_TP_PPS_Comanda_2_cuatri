import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { ProductoInterface } from 'src/app/models/producto.interface';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

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
  title;
  tipo;
  imagen1;
  imagen2;
  imagen3;
  userPerfil;

  constructor(private fb: FormBuilder,
              private camera: Camera,
              private fr: FirestoreService ) {
    
    
    this.generarForm();
    this.userPerfil = JSON.parse(localStorage.getItem('userCatch'))['perfil'];
    this.tipo = this.userPerfil == 'cocinero' ? 'plato' : this.userPerfil == 'bartender' ? 'bebida' : 'no permitida';
    this.title = 'Alta ' + this.tipo;
 
    
    //#region  BORRAR AL FINALIZAR PROYECTO
    /* this.imagen1 = '../../../../assets/image/anonymous.png';
    this.imagen2 = '../../../../assets/image/anonymous.png';
    this.imagen3 = '../../../../assets/image/anonymous.png';  */ 
    //#endregion

    }

    ngOnInit(){
      console.log(this.userPerfil);  
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
      tipo: this.tipo,
      precio: this.precio,
      foto1: this.imagen1,
      foto2: this.imagen2,
      foto3: this.imagen3,
      activated: true,
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
        /* this.imageUpload[index] = `data:image/jpeg;base64,${imageData}`; */

        if(index === 1){
          this.imagen1 = `data:image/jpeg;base64,${imageData}`;
        }
        if(index === 2){
          this.imagen2 = `data:image/jpeg;base64,${imageData}`;
        }
        if(index === 3){
          this.imagen3 = `data:image/jpeg;base64,${imageData}`;
        }
    });
  }

  

}
