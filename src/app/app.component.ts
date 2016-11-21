import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class PhotoFind {
  authenticated: boolean = false;
  rootPage = TabsPage;

  constructor(platform: Platform, public menuCtrl: MenuController) {
    // Activate menu
    this.activateMenu();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  activateMenu() {
    this.menuCtrl.enable(this.authenticated, 'authenticated');
    this.menuCtrl.enable(!this.authenticated, 'login');
  }

  authenticate() {
    this.authenticated = true;
    this.menuCtrl.close('login');    
    this.activateMenu();
    console.log('click', 'authenticate');
  }
}
