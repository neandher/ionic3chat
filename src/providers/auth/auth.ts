import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {usercreds} from "../../models/interfaces/usercreds";
import {AngularFireAuth} from "angularfire2/auth";

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class AuthProvider {

  constructor(public afireauth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials: usercreds) {
    return new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    });
  }
}
