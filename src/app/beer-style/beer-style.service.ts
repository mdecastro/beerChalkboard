import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BeerStyle } from './beer-style.interface';

@Injectable({
  providedIn: 'root'
})
export class BeerStyleService {
  styleCollectionRef: AngularFirestoreCollection<BeerStyle>;
  styles$: Observable<BeerStyle[]>;

  constructor(private db: AngularFirestore) {
    this.styleCollectionRef = this.db.collection<BeerStyle>('beerStyle', ref => ref.orderBy('name'));

    this.styles$ = this.styleCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  getStyles(): Observable<BeerStyle[]> {
    return this.styles$;
  }

  getCollection(): Observable<BeerStyle[]> {
    return this.styleCollectionRef.valueChanges()
  }

  updateStyle(aStyle: BeerStyle): void {
    this.styleCollectionRef.doc(aStyle.id).update({ name: aStyle.name })
  }

  addStyle(aStyle: BeerStyle): void {
    this.styleCollectionRef.add({ ...aStyle });
  }

  deleteStyle(aStyle: BeerStyle): void {
    this.styleCollectionRef.doc(aStyle.id).delete()
  }
}
