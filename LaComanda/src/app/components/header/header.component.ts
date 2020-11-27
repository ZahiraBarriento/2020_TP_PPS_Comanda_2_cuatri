import { viewClassName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  @Input() inshow: string;
  @Input() title: string;

  @Output() state: EventEmitter<boolean>;


  constructor(private auth: AuthService, private loader: LoaderService) {
    this.state = new EventEmitter();
  }

  logOut(){
    localStorage.removeItem('userCatch');
    this.loader.showLoader();
    setTimeout(() => {
      this.auth.signOut();
    }, 1500);
    clearInterval();
    
  }

  verificar(){
    this.state.emit(false);
  }

  ngOnInit() {}

}
