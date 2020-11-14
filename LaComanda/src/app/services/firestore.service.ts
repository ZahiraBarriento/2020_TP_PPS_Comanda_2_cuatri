import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { message } from '../models/message';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db : AngularFirestore) { }

  public getDataAll(collection : string){ 
    return this.db.collection(collection).snapshotChanges();
  }

  public getDataAllLucas(collection:string){
    return this.db.collection(collection).valueChanges();
  }

  public addData(collection:string, json){
    this.db.collection(collection).add(json);
  }

  public updateData(collection:string, idFire, json){
    this.db.collection(collection).doc(idFire).update(json);
  }

  /*LO QUE ES CHAT ESTA POR ACA*/
  public sendMsgToDirebase(message : message, chat_id : string, id : string){
    this.db.collection(chat_id).doc(id).update({
      messages : firestore.FieldValue.arrayUnion(message)
    })
  }

  delateMsg(){
    //implementar esto para cuando se vaya en cliente
  }
}
