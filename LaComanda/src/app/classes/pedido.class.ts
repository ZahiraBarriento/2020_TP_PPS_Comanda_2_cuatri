import { PedidoInterface } from '../models/pedido.interface';
import { ProductoInterface } from '../models/producto.interface';
 

export class Pedido implements PedidoInterface{
    public id: string;
    public cliente: string;
    public para: string;
    public productos: ProductoInterface[] = [];
    public importe: number;
    public preparado: boolean;
    public entregado: boolean;
    public actived = true;

    constructor(
        id = '',
        cliente = '',
        para = '',
        importe = '',
        preparado = '',
        entregad = '',
    ){}
}
 