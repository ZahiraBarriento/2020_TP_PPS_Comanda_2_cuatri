import { Injectable } from '@angular/core';
import { Producto } from 'src/app/classes/producto';
import { ProductoInterface } from 'src/app/models/producto.interface';
import { FirestoreService } from '../firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  producto: ProductoInterface;
  productos: ProductoInterface[] = [];

  constructor(private fb: FirestoreService) { }


  traerPlatos(){

    return new Promise( (resolve, reject) => {

      this.fb.getDataAll('productos').subscribe( doc => {
         
        doc.forEach( item => {
          this.producto = new Producto();

          this.producto.id = item.payload.doc.id;
          this.producto.nombre = item.payload.doc.data()['nombre'];
          this.producto.descripcion = item.payload.doc.data()['descripcion'];
          this.producto.precio = item.payload.doc.data()['precio'];
          this.producto.tipo = item.payload.doc.data()['tipo'];
          this.producto.timeElaboracion = item.payload.doc.data()['timeElaboracion'];
          this.producto.foto1 = item.payload.doc.data()['foto1'];
          this.producto.foto2 = item.payload.doc.data()['foto2'];
          this.producto.foto3 = item.payload.doc.data()['foto3'];
  
          this.productos.push(this.producto);
        });
 
        resolve(this.productos);
      });

      
    })
    
  }



}
