import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth;
  constructor(public afAuth: AngularFireAuth) {
    this.auth = firebase.auth;
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res)
      }, err => reject(err))
    });
  }

  isAuthenticated(): boolean {
    return !!this.afAuth.currentUser;
  }

}
