import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/classes/usuario.class';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

  forma: FormGroup;
  userInput: Usuario = new Usuario();
  viewPic: string = "../../../../assets/image/default.jpg";

  // Aqui cargo los datos del qr
  inputSetQr =  {
    nombre : '',
    apellido : '',
    dni: '',
  };

  fotoCam;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private camera: Camera,
              private db: FirestoreService,
              private qr: BarcodeScanner,
              private toastCtrl: ToastController) {

              this.fotoCam = 'FOTO ficticia, se crea para desarrollo en pc, borrar instancia al finalizar proyecto';
              this.generarForm();
              this.userInput = new Usuario();
  }

  ngOnInit() {
  }



//#region Verifica los input isValid o si tienen datos

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre');
  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo');
  }

  get passNoValido(){
    return this.forma.get('pass').invalid && this.forma.get('pass');
  }

  get apellidoNoValido(){
    return this.forma.get('email').invalid && this.forma.get('email');
  }

  get dniNoValido(){
    return this.forma.get('dni').invalid && this.forma.get('dni');
  }

  get cuilNoValido(){
    return this.forma.get('cuil').invalid && this.forma.get('cuil');
  }

  get perfilNoValido(){
    return this.forma.get('perfil').invalid && this.forma.get('perfil');
  }

  //#endregion


//#region Generar Formulario y Validators
   generarForm(){
    this.forma = this.fb.group({
      nombre: ['',  Validators.required],
      correo: ['',  [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] ],
      pass: ['',  Validators.required],
      apellido: ['',  Validators.required],
      dni: ['',   Validators.required ],
      cuil: ['',    Validators.required],
      perfil: ['', Validators.required],
    });
  }

  //#endregion


//#region  Guardo el usuario en la base de datos

  altaEmpleado(){

    this.obtenerDatos();
    this.auth.register(this.userInput.correo, this.userInput.pass).then( res => {
      const json: UsuarioModel = {
        id: res.user.uid,
        nombre: this.userInput.nombre ,
        apellido: this.userInput.apellido,
        dni: this.userInput.dni,
        cuil: this.userInput.cuil,
        foto: this.fotoCam,
        activated: this.userInput.activated,
        perfil: this.userInput.perfil,
        correo: this.userInput.correo,
        pass: this.userInput.pass,
        listaEspera: false,
      };
      this.db.addData('usuarios', json);

      this.showMessage(`Alta de ${json.nombre} ${json.nombre} como ${json.perfil} `, true);
      this.forma.reset();
    })
     .catch( rej => {
       if ( rej.code.toString() === 'auth/email-already-in-use'){

        }
    });
  }

//#endregion


//#region --  Capturar Foto de la camara


  cargarFoto(){
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 30
    };
    this.camera.getPicture(options)
    .then(imageData => {
        this.fotoCam = `data:image/jpeg;base64,${imageData}`;
    });
  }

  //#endregion


//#region -- Obtener los valores del formulario
  obtenerDatos(){
    this.userInput.nombre = this.forma.get('nombre').value;
    this.userInput.apellido = this.forma.get('apellido').value;
    this.userInput.correo = this.forma.get('correo').value;
    this.userInput.pass = this.forma.get('pass').value;
    this.userInput.dni = this.forma.get('dni').value;
    this.userInput.cuil = this.forma.get('cuil').value;
    this.userInput.perfil = this.forma.get('perfil').value;

  }
  //#endregion


 //#region Escanea el Qr
  escanearQR(){

    const options = { prompt: 'Escaneá el DNI', formats: 'PDF_417' };

    this.qr.scan(options).then(barcodeData => {

    const dniDatos = barcodeData.text.split('@');

    this.inputSetQr.apellido = dniDatos[1];
    this.inputSetQr.nombre = dniDatos[2];
    this.inputSetQr.dni = dniDatos[4];
    }).catch(err => { });

  }


  async showMessage(text, estado) {

    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle',
     /* cssClass: estado ? 'toastSuccess' : 'toastWarning',   */
    });

    toast.present();
  }
}

//#endregion
