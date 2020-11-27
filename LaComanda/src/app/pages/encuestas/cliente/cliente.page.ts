import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  opinion="";
  constructor() { }

  ngOnInit() {
  }

  enviarEncuesta(){
    var rangoSatisfecho = (<HTMLIonRangeElement>document.getElementById("rango")).value;
    console.log(this.opinion);
  }

}
