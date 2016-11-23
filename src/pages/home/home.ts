// Angular
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Ionic
import { NavController, ActionSheetController, Events } from 'ionic-angular';
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
    public events: Events
  ) {
    events.subscribe('user:authenticated', (userEventData) => {
      this.test = true;
      // userEventData is an array of parameters, so grab our first and only arg
      console.log('Welcome', userEventData);
    });
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
