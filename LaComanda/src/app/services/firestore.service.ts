import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface Qr
{
  code : string
  status : string
}

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
}
