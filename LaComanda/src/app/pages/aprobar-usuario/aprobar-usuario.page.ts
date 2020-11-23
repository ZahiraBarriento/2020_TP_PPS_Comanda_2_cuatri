import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.class';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-aprobar-usuario',
  templateUrl: './aprobar-usuario.page.html',
  styleUrls: ['./aprobar-usuario.page.scss'],
})
export class AprobarUsuarioPage implements OnInit {
  public usuariosPendientes = new Array<any>();
  public mostrarSinUsuarios = false;
  public mostrarGuardar = false;

  constructor(private router:Router,
    private db:FirestoreService,
    private loader:LoaderService) { }

  ngOnInit() {
    this.mostrarSinUsuarios = false;
    this.mostrarGuardar = false;
    this.CargarArray();
  }

  CargarArray(){
    this.db.getDataAll('usuarios').subscribe(data => {
      data.map(item => {
        const data = item.payload.doc.data();
        const id = item.payload.doc.id;
        var user:Usuario = new Usuario();
        user.nombre = data['nombre'];
        user.apellido = data['apellido'];
        user.dni = data['dni'];
        user.correo = data['correo'];
        user.perfil = data['perfil'];
        user.activated = data['activated'];
        user.id = id;

        if (user.perfil.toString() == "cliente" && user.activated == false)
          this.usuariosPendientes.push(user);
      });
    if (this.usuariosPendientes.length > 0){
      this.mostrarGuardar = true;
      this.mostrarSinUsuarios = false;
    }  
    else {
      this.mostrarGuardar = false;
      this.mostrarSinUsuarios = true;
    }
    });    
  }

  HabilitarUser(user:Usuario){
    user.activated = true;
    console.log(user.activated);
  }

  DeshabilitarUser(user:Usuario){
    user.activated = false;
    console.log(user.activated);
  }

  Guardar(){    
    for(var i=0;i<this.usuariosPendientes.length;i++){
      var userModificar:Usuario = this.usuariosPendientes[i];
      if (userModificar.activated)
        this.db.updateData('usuarios', userModificar.id, {'activated': true});
      else
        this.db.deleteDocument('usuarios', userModificar.id);      
    }
    this.VolverAtrasSpinner();
  }

  VolverAtrasSpinner(){  
    this.loader.showLoader();
    document.getElementById("VntPrincipal").style.opacity = "0.2";
    setTimeout(() =>{
      document.getElementById("VntPrincipal").style.opacity = "1";
      this.usuariosPendientes.splice(0, this.usuariosPendientes.length);
      this.mostrarSinUsuarios = false;
      this.mostrarGuardar = false;
      this.router.navigate(['/home']);
    }, 2000);
  }

}
