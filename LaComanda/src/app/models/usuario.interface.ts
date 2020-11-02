export interface UsuarioInterface {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    cuil: string;
    foto: string;
    perfil: number;
    email: string;
    pass: string;
    activated?: boolean;
}