import { ProductoInterface } from '../models/producto.interface';

export class Producto implements ProductoInterface{
    public id: string;
    public nombre: string;
    public descripcion: string;
    public precio: number;
    public tipo: string;
    public timeElaboracion: number;
    public foto1: string;
    public foto2: string;
    public foto3: string;
    public activated = true;
    
    constructor(
    ){}
}
