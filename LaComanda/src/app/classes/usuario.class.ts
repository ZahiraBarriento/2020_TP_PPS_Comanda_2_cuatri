import { UsuarioInterface } from '../interfaces/usuario.interface';

export class Usuario implements UsuarioInterface{

    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    cuil: string;
    foto: string;
    perfil: number;
    pass: string;
    email: string;
    activated: boolean;

    constructor(){
        this.activated = true;
    }
}
