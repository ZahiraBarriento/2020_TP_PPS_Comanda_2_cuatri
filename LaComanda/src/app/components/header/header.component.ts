import { viewClassName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { url } from 'inspector';
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

    const audio = new Audio('../../../assets/audio/inicio-sesion.mp3');
    localStorage.removeItem('userCatch');
    
    this.loader.showLoader();
    setTimeout(() => {
      audio.play();
      this.auth.signOut();
    }, 1500);
  }

  verificar(){
    this.state.emit(false);
  }

  ngOnInit() {}

}
