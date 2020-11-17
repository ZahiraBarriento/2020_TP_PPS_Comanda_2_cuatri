import { ProductoInterface } from './producto.interface';

export interface PedidoInterface{
    id?: string;
    cliente: string;
    para: string;
    productos?: ProductoInterface[];
    importe: number;
    preparado: boolean;
    entregado: boolean;
    mesa?: number;
    actived?: boolean;
}

 