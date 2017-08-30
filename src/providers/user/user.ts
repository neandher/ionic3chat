import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import firebase from "firebase";

/*
 Generated class for the UserProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/users');

  constructor(public afireauth: AngularFireAuth) {
    //console.log('Hello UserProvider Provider');
  }

  adduser(newuser) {
    return new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/ionic3chat-fedd6.appspot.com/o/chatterplace.png?alt=media&token=1791f6e9-085c-4de2-9a5f-61594df327c3',
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/ionic3chat-fedd6.appspot.com/o/chatterplace.png?alt=media&token=1791f6e9-085c-4de2-9a5f-61594df327c3'
          }).then(() => {
            resolve({success: true});
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
  }

  /*
   For resetting the password of the user.
   Called from - passwordreset.ts
   Inputs - email of the user.
   Output - Promise.
   */

  passwordreset(email) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({success: true});
      }).catch((err) => {
        reject(err);
      })
    });
  }

  /*
   For updating the users collection and the firebase users list with
   the imageurl of the profile picture stored in firebase storage.
   Called from - profilepic.ts
   Inputs - Url of the image stored in firebase.
   OUtputs - Promise.
   */

  updateimage(imageurl) {
    return new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({success: true});
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    });
  }

  getuserdetails() {
    return new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    });
  }

  updatedisplayname(newname) {
    return new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afireauth.auth.currentUser.photoURL,
          uid: this.afireauth.auth.currentUser.uid
        }).then(() => {
          resolve({success: true});
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    });
  }
}
