import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: "app-supervisor",
  templateUrl: "./supervisor.page.html",
  styleUrls: ["./supervisor.page.scss"],
})
export class SupervisorPage implements OnInit {
  usuarios: UsuarioModel[] = [];

  constructor(private userService: UsuarioService) {
    this.traerUsuarios().then((res) => {
      console.log(this.usuarios);
    });
  }

  traerUsuarios() {
    return new Promise((resolve, reject) => {
      this.userService.traerUsuariosActivos().then((res: UsuarioModel[]) => {
        this.usuarios = [];
        this.usuarios = res;
        /* console.log(this.usuarios); */
        resolve(true);
      });
    });
  }

  encuesta() {}

  ngOnInit() {}
}
