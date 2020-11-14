import { Perfil } from '../classes/usuario.class';

export interface UsuarioModel {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    cuil: string;
    foto: string;
    perfil: Perfil;
    correo: string;
    pass?: string;
    activated?: boolean;
    listaEspera: boolean;
}