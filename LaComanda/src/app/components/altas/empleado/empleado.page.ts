import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase';
import { perfil } from 'src/app/perfil';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

  forma: FormGroup;
  user: User;
  
  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.generarForm();
  }

  ngOnInit() {
  }


  generarForm(){
    this.forma = this.fb.group({
      nombre: ['',  [Validators.required, Validators.pattern('[a-zA-Z]{5-10}')] ],
      apellido: ['',  [Validators.required, Validators.pattern('[a-zA-Z]{5-10}')] ],
      dni: ['',  [Validators.required, Validators.pattern('[a-zA-Z]{5-10}')] ],
      cuil: ['',  [Validators.required, Validators.pattern('[a-zA-Z]{5-10}')] ],
      perfil: ['', [Validators.required, Validators.pattern('[0-9]{1}')] ],
    });
  }

  altaEmpleado(){
    
  };


}
