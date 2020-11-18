import { ProductoInterface } from './producto.interface';

export interface PedidoInterface{
    id?: string;
    cliente: string;
    para: string;
    tipo: string;
    productos?: ProductoInterface[];
    importe: number;
    estado: string;
    mesa?: number;
    actived?: boolean;
}

 