import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model'
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/classes/usuario.class';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario:UsuarioModel = new Usuario();
  image;
  perfilStr;
  constructor(
    private userService: UsuarioService,
  ) { }

  ngOnInit() {
    var datos = localStorage.getItem('userCatch');
    datos = JSON.parse(datos);

    this.usuario.apellido = datos["apellido"].charAt(0).toUpperCase() + datos["apellido"].slice(1).toLowerCase();
    this.usuario.nombre = datos["nombre"].charAt(0).toUpperCase() + datos["nombre"].slice(1).toLowerCase();
    this.usuario.correo = datos["correo"];
    this.usuario.dni = datos["dni"];
    this.usuario.cuil = datos["cuil"];
    this.usuario.foto = datos["foto"];
    this.usuario.listaEspera = false;

    this.image = this.usuario.foto;
    this.usuario.perfil = datos["perfil"];
    var perfilStr = this.usuario.perfil.toString();
    this.perfilStr = perfilStr.charAt(0).toUpperCase() + perfilStr.slice(1).toLowerCase();
    
    if (this.perfilStr == "Duenio")
      this.perfilStr = "Dueño";
  }

}
