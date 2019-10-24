import { Injectable } from '@angular/core';
import { Beer } from './beer.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  beersCollectionRef: AngularFirestoreCollection<Beer>;
  beers$: Observable<Beer[]>;

  constructor(private db: AngularFirestore) {
    this.beersCollectionRef = this.db.collection<Beer>('beers', ref => ref.orderBy('name'));

    this.beers$ = this.beersCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  getBeers(): Observable<Beer[]> {
    return this.beers$;
  }

  updateBeer(aBeer: Beer): void {
    this.beersCollectionRef.doc(aBeer.id).update(aBeer);
  }

  addBeer(aBeer: Beer): void {
    this.beersCollectionRef.add({ ...aBeer });
  }

  deleteBeer(aBeer: Beer): void {
    this.beersCollectionRef.doc(aBeer.id).delete();
  }
}
