import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { message } from '../models/message';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db : AngularFirestore) { }

  public getDataAll(collection : string){ 
    return this.db.collection(collection).snapshotChanges();
  }

  public addData(collection:string, json){
    this.db.collection(collection).add(json);
  }

  public updateData(collection:string, idFire, json){
    this.db.collection(collection).doc(idFire).update(json);
  }

  /*LO QUE ES CONSULTA/LISTA ESPERA ESTA POR ACA*/
  getDataQuery(collection : string){
    return this.db.collection(collection).snapshotChanges().pipe(map(rooms => {
      return rooms.map(item =>{
        const data : any = item.payload.doc.data();
        data.id = item.payload.doc.id;
        return data;
      })
    }))
  }

  public getDataChat(chat_id:string){
    return this.db.collection('chat').doc(chat_id).valueChanges();
  }

  public sendMsgToDirebase(message : message, chat_id : string, id : string){
    this.db.collection(chat_id).doc(id).update({
      messages : firestore.FieldValue.arrayUnion(message)
    })
  }

  delateMsg(){
    //implementar esto para cuando se vaya en cliente
  }
}
