import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model'
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/classes/usuario.class';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {
  usuario: UsuarioModel = new Usuario();
  image;
  perfil;
  constructor(private userService: UsuarioService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    /*  let datos =  JSON.parse(localStorage.getItem('userCatch')); */

    this.usuario = JSON.parse(localStorage.getItem("userCatch")) as UsuarioModel;
    this.perfil = this.usuario.perfil;
    if (this.perfil == 'duenio') {
      this.perfil = 'Dueño';
    }
  }
}
