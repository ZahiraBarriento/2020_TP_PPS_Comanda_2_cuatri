import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder) {
    this.generarForm();
  }

  ngOnInit() {
  }

  

  generarForm(){
    this.forma = this.fb.group({
      nombre: ['',  [Validators.required, Validators.pattern('[a-zA-Z]{5-10}')] ],
      descripcion: ['',  [Validators.required, Validators.pattern('[a-zA-Z]{5-30}')] ],
      timeElaboracion: ['',  [Validators.required, Validators.pattern('[a-zA-Z]{5-10}')] ],
      precio: ['',  [Validators.required, Validators.pattern('[0-9]{1-10}')] ],
    });
  }

  altaProducto(){

  }

}
