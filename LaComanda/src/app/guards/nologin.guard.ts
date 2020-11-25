import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {

  user: any;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = localStorage.getItem('userCatch')
  }
  canActivate() {
    return this.auth.authState.pipe(map(auth => {
      if(auth === null || auth === undefined || this.user === null){
        return true 
      }else{
        console.log('log')
        this.router.navigate(['/home']); //SI ESTA PUES VA A HOME
        return false
      }
    }));
  }
}
