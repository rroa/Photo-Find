// Angular
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Ionic
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

//
import { SimpleHttp } from '../../shared/services/include'
import { AboutPage } from '../about/about'

// 3rd Party

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people: any;
  public base64Image: string;
  constructor(
    public navCtrl: NavController,
    public sanitizer: DomSanitizer,
    public httpApi: SimpleHttp
  ) { }

  navigateToAbout() {
    this.navCtrl.push(AboutPage);
  }

  makeRequest() {
    this.httpApi.get().subscribe(
      data => {
        console.log('success');
        console.log('data', data.results);
        this.people = data.results;
      },
      err => {
        // Uh Oh
        console.log('err', err);
      },
      () => {
        console.log('complete');
      });
  }

  takePicture() {
    // getPicture options
    let options = {
      quality: 75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // this.base64Image = "data:image/jpeg;base64," + imageData;
      this.base64Image = imageData;
      console.log('imgData', imageData);
    }, (err) => {
      // Handle error
      console.log('err', err);
    });
  }
}
