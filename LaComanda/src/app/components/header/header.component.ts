import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  @Input() inshow: string;
  @Input() title: string;
  


  constructor(private auth: AuthService) {
 
  }

  logOut(){
    localStorage.removeItem('userCatch');
    this.auth.signOut();
  }

  ngOnInit() {}

}
