import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { UsuarioModel } from './usuario.model';

export const perfilJson = [
    {
        correo: 'duenio@gmail.com',
        clave: '123456',
        perfil: 'duenio',
    },
    {
        correo: 'anonimo@gmail.com',
        clave: '123456',
        perfil: 'anonimo',
    },
    {
        correo: 'cliente@gmail.com',
        clave: '123456',
        perfil: 'cliente',
    },
    {
        correo: 'metre@gmail.com',
        clave: '123456',
        perfil: 'metre',
    },
    {
        correo: 'bartender@gmail.com',
        clave: '123456',
        perfil: 'bartender',
    },
    {
        correo: 'cocinero@gmail.com',
        clave: '123456',
        perfil: 'cocinero',
    },
    {
        correo: 'mozo@gmail.com',
        clave: '123456',
        perfil: 'mozo',
    },
    {
        correo: 'supervisor@gmail.com',
        clave: '123456',
        perfil: 'supervisor',
    },
    {
        correo: 'repartidor@gmail.com',
        clave: '123456',
        perfil: 'repartidor',
    }
];

export interface Perfil {
    correo: string;
    clave: string;
    perfil: string;
}