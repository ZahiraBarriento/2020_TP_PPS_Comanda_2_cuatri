import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router){}
  canActivate() {

    return this.auth.stateUsuario().pipe(map(auth => { 
      if (!auth) { this.router.navigateByUrl('/login'); return false; } else{ return true; }
    }));
  }
}
