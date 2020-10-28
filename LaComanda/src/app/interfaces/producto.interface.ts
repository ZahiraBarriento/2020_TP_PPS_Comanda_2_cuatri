export interface ProductoInterface {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    timeElaboracion: number;
    foto1: string;
    foto2: string;
    foto3: string;
    activated?: boolean;
}