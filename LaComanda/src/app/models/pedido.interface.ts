import { ProductosService } from '../services/coleccion/productos.service';
import { ProductoInterface } from './producto.interface';

export interface PedidoInterface{
    id: string;
    cliente: string;
    para: string;
    productos: ProductoInterface[];
    importe: number;
    estado: string;
}

 