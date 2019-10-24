import { Injectable } from '@angular/core';
import { BrewerInt } from './brewer.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrewerService {
  brewerCollectionRef: AngularFirestoreCollection<BrewerInt>;
  brewers$: Observable<BrewerInt[]>;
  brewerImagesCollectionRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { 
    this.brewerCollectionRef = this.db.collection<BrewerInt>('brewers', ref => ref.orderBy('name'));

    this.brewers$ = this.brewerCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }
 
  getBrewers(): Observable<BrewerInt[]> {
    return this.brewers$;
  }

  getCollection(): Observable<BrewerInt[]> {
    return this.brewerCollectionRef.valueChanges();
  }

  addBrewer(aBrewer: BrewerInt): void {
    this.brewerCollectionRef.add({ ...aBrewer });
  }

  deleteBrewer(aBrewer: BrewerInt): void {
    this.brewerCollectionRef.doc(aBrewer.id).delete();
  }

  updateBrewer(aBrewer: BrewerInt): void {
    this.brewerCollectionRef.doc(aBrewer.id).update({ name: aBrewer.name, city: aBrewer.city, logo: aBrewer.logo });
  }
}
