import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.class';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-aprobar-usuario',
  templateUrl: './aprobar-usuario.page.html',
  styleUrls: ['./aprobar-usuario.page.scss'],
})
export class AprobarUsuarioPage implements OnInit {
  public usuariosPendientes = new Array<any>();
  public noHayUsuariosPendientes = false;

  constructor(private router:Router,
    private db:FirestoreService) { }

  ngOnInit() {
    this.db.getDataAllLucas('usuarios').subscribe(datos => {
      datos.forEach(usuario => {
          var user:Usuario = new Usuario();
          user.nombre = usuario['nombre'];
          user.apellido = usuario['apellido'];
          user.dni = usuario['dni'];
          user.cuil = usuario['cuil'];
          user.foto = usuario['foto'];
          user.perfil = usuario['perfil'];
          user.correo = usuario['correo'];
          user.activated = usuario['activated'];
  
          if (user.perfil.toString() == "cliente" && user.activated == false){
            this.usuariosPendientes.push(user);
          }

      });
      if (this.usuariosPendientes.length > 0){
        this.noHayUsuariosPendientes = false;
        //hacer algo mas?
      }
      else {
        this.noHayUsuariosPendientes = true;
      }
    });
  }

  HabilitarUser(user:Usuario){
    user.activated = true;
  }

  DehabilitarUser(user:Usuario){
    user.activated = true;
  }

}
