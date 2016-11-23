// Angular
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Ionic
import { NavController, ActionSheetController, ToastController, Events } from 'ionic-angular';
import { Camera } from 'ionic-native';

// Providers
import { AuthService } from '../../shared/services/include'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // public
  public base64Image: string;
  public test: boolean = false;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public sanitizer: DomSanitizer,
    private auth: AuthService,
    private toastCtrl: ToastController,
    public events: Events
  ) {
    events.subscribe('user:authenticated', (userEventData) => {
      this.test = true;
      // userEventData is an array of parameters, so grab our first and only arg
      console.log('Welcome', userEventData);
      this.presentToast();
    });
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Login was successful',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

  ionViewDidLoad() {
    console.log('authenticated', this.auth.authenticated());
    if(this.auth.authenticated()) {
      console.log('authenticated');
      this.test = true;
    }
  }

  addImage() {
    let options = this.actionSheetCtrl.create({
      title: 'Select an Image',
      buttons: [
        {
          text: 'Camera',
          handler: () => this.handleMedia(Camera.PictureSourceType.CAMERA)
        }, {
          text: 'Photo Library',
          handler: () => this.handleMedia(Camera.PictureSourceType.PHOTOLIBRARY)
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            options.dismiss();
          }
        }
      ]
    });

    options.present();
  }

  handleMedia(sourceType) {
    // getPicture options
    let options = {
      quality: 95,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      // Handle error
      console.log('err', err);
    });
  }
}
