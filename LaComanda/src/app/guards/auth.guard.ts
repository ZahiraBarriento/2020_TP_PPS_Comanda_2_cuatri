import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user: any;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('userCatch'));
   }

  canActivate() {
    return this.auth.authState.pipe(map(auth => { 
/*       console.log(this.user);
 */      if(auth === null || auth === undefined || this.user === null){
        console.log('no log')
        this.router.navigate(['/login']); //SI NO ESTA PUES VA AL LOGIN
        return false;
      }else{
        return true;
      }
    }));
  }
}
