import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { User } from 'firebase';
import { Usuario } from 'src/app/classes/usuario.class';
import { UsuarioInterface } from '../../../models/usuario.interface';
import { perfil } from 'src/app/perfil';
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
  foto;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private camera: Camera,
              private db: FirestoreService) {

              this.foto = 'FOTO ficticia, se crea para desarrollo en pc, borrar instancia al finalizar proyecto';
              this.generarForm();
              this.userInput = new Usuario();
  }

  ngOnInit() {
  }



//#region Verificacion isValid y carga

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

  altaEmpleado(){
    
    this.obtenerDatos();


    this.auth.register(this.userInput.email, this.userInput.pass).then( res => {
      const json: UsuarioInterface = {
        id: res.user.uid,
        nombre: this.userInput.nombre ,
        apellido: this.userInput.apellido,
        dni: this.userInput.dni,
        cuil: this.userInput.cuil,
        foto: this.foto,
        activated: this.userInput.activated,
        perfil: Number(this.userInput.perfil),
        email: this.userInput.email,
        pass: this.userInput.pass,
      };

      this.db.addData('usuarios', json);
    });
  }


  cargarFoto(){
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 30
    };
    this.camera.getPicture(options)
    .then(imageData => {
        this.foto = `data:image/jpeg;base64,${imageData}`;
    });
  }


  //#region Get values Formulario
  obtenerDatos(){
    this.userInput.nombre = this.forma.get('nombre').value;
    this.userInput.apellido = this.forma.get('apellido').value;
    this.userInput.email = this.forma.get('correo').value;
    this.userInput.pass = this.forma.get('pass').value;
    this.userInput.dni = this.forma.get('dni').value;
    this.userInput.cuil = this.forma.get('cuil').value;
    this.userInput.perfil = this.forma.get('perfil').value;

  }
  //#endregion
}
