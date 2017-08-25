import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ImghandlerProvider} from "../../providers/imghandler/imghandler";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the ProfilepicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/ionic3chat-fedd6.appspot.com/o/chatterplace.png?alt=media&token=1791f6e9-085c-4de2-9a5f-61594df327c3';
  moveon = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider,
              public zone: NgZone, public userservice: UserProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }

  chooseimage() {
    this.imgservice.uploadimage().then((uploadedurl: any) => {
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      });
    });
  }

  updateproceed() {
    this.userservice.updateimage(this.imgurl).then((res: any) => {
      if (res.success) {
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        alert(res);
      }
    });
  }

  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }

}
