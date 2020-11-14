import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}
  canActivate() {
    return this.auth.stateUsuario().pipe(map(auth => {      
      if (auth && this.auth.esClienteActivado) { this.router.navigateByUrl('/home'); return false; } else{ return true; }
    }));
  }
}
