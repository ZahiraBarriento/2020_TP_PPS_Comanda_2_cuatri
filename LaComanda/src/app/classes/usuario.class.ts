import { UsuarioModel } from '../models/usuario.model';


export class Usuario implements UsuarioModel{

    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    cuil: string;
    foto: string;
    perfil: Perfil;
    pass: string;
    correo: string;
    activated = true;

    constructor(){
    }

}

export enum Perfil {
    supervisor,
    mozo,
    cocinero,
    bartender,
    metre,
    anonimo,
    duenio,
    repartidor,
    cliente
}

