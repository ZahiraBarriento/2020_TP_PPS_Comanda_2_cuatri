import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { url } from 'inspector';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

   //#region Get
  get name() {
    return this.clientForm.get("name");
  }

  get lastName() {
    return this.clientForm.get('lastName');
  }
  //#endregion

  constructor(
    private modalController : ModalController, 
    public formBuilder: FormBuilder,
    public router : Router,
    public loading : LoaderService) { }

  ngOnInit() {
    
  }

  //#region Validators
  clientForm = this.formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z ]*$")
    ]],
    lastName: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z ]*$")
    ]]
  });
  //#endregion

  onSubmit(){
    var json = {name:this.name.value, lastName:this.lastName.value, perfil: 'anonimo'};
    localStorage.setItem('userAnonimo', JSON.stringify(json));
    this.loading.showLoader();
    setTimeout(() =>{
      this.router.navigate(['/home']);
      this.modalController.dismiss();
    }, 1000)
  }

  dismissModal(){
    this.modalController.dismiss();
  }


}
