import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  opinion:string = "";
  protocoloCovid:boolean;
  constructor() { }

  ngOnInit() {
  }

  enviarEncuesta(){
    var rangoSatisfecho = (<HTMLIonRangeElement>document.getElementById("rango")).value;
    var protocoloCovid = (<HTMLIonRadioGroupElement>document.getElementById("grupo")).value == "true";
    console.log(protocoloCovid);
  }

}
