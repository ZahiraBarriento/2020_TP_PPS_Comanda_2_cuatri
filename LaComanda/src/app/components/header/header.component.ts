import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  @Input() inshow: string;
  @Input() title: string;

  @Output() state: EventEmitter<boolean>;


  constructor(private auth: AuthService) {
    this.state = new EventEmitter();
  }

  logOut(){
    localStorage.removeItem('userCatch');
    this.auth.signOut();
  }

  verificar(){
    this.state.emit(false);
  }

  ngOnInit() {}

}
